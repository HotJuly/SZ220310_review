function MVVM(options) {
  /*
    options->{
        el: "#app",
        data: {
          msg: "hello mvvm",
          person:{
            name:"xiaoming",
            msg:"123"
          }
        }
      }

    this->vm实例对象(其实就是Vue组件实例)
  
  */

  this.$options = options;

  // 其实Vue1中的this._data就是Vue2中的this.$data
  // 将$options.data对象的地址值,又复制了两份,分别给到data变量和this._data
  var data = this._data = this.$options.data;

  var me = this;

  Object.keys(data).forEach(function (key) {
    me._proxy(key);
  });

  /*
    MVVM源码第一部分:数据代理
    代理:我们找代理商买商品,代理商找厂家拿货,代理商再将拿到的货交给我们
        从这个过程中,可以看出,代理商只是一个搬运者,他没有东西

    目的:
      方便开发,在读取具体的某个属性值的时候,可以少写_data或者$data
      他并不是响应式原理中不可或缺的一部分

    次数:2次(次数与data对象的直系属性名个数有关);

    流程:
      1.Vue会使用Object.keys方法获取到当前data对象中所有的直系属性名,并进行遍历操作
      2.在遍历的过程中,会对每个直系属性名进行数据代码操作
      3.Vue是通过Object.defineProperty方法,对vm对象身上添加同名属性,
        并将该属性设置为get/set方法
          如果用户读取该属性的值,get方法中就会自动找到_data对象,从中读取出对应的属性值
          如果用户设置该属性的值,set方法中就会自动修改_data对象中对应的属性值
    
  */

  // Object.keys只能获取到当前对象的直系属性名组成的数组
  // ["msg","person"].forEach(function (key) {
  //   vm._proxy("msg");
  // });

  /*
    需求:当某个属性值被修改时,页面会自动更新最新的结果
    拆解:
      1.当某个属性值被修改时
        通过Object.defineProperty可以将一个属性变为get/set方法
          如果有人修改或者读取该属性的值时,会自动触发对应的方法代码

      2.页面会自动更新最新的结果
        找到对应的DOM节点,并将他的文本内容进行替换

    准备工作:  
      dep和watcher之间映射关系的收集
      目的:
        让每个响应式属性知道自己被哪些插值语法使用
        让每个插值语法都能知道自己用了哪几个响应式属性

      流程:
        1.在bind方法中会new Watcher,创建watcher的实例对象
        2.watcher对象会给自己身上添加一个value属性,属性值是get方法的返回值
        3.get方法中,会将Dep.target修改为当前的watcher对象
        4.使用getVMVal方法,读取当前插值表达式对应的结果
          在读取结果的过程中,会触发数据劫持的get方法
        5.get方法中会调用dep.depend方法,开展dep和watcher的映射关系收集
        6.调用watcher.addDep(dep),在addDep方法中,
          watcher对象会使用depIds对象收集与自己相关的dep对象,同时调用dep.addSub(this)
        7.在addSub方法中,dep对象会使用subs数组收集与自己相关的插值表达式

  响应式更新流程:
    1.执行vm.msg="hello world",会触发数据代理msg的set方法
    2.数据代理的set方法中,会修改_data中的对应属性值,会触发数据劫持的set方法
    3.如果新值不等于旧值,那么就会执行dep.notify方法
    4.notify方法中,会将当前dep对象的subs数组进行遍历,通知每个watcher对象进行update更新
    5.update方法中,会调用之前使用闭包缓存下来的指定更新器函数,更新对应的节点
 
  */
  /*
    MVVM源码第二部分:数据劫持
    劫持:限制某些人的人身自由,并强迫他做一些他不想做的事
    目的:
      用于实现监视某个属性值的变化,并通知DOM进行更新
        将data中所有的属性都进行重写,全部变成get/set方法,用于监视属性值的变化

    次数:4次(劫持的次数与data对象中一共有多少个属性有关)

    流程:
      1.调用observe函数开启数据劫持,在observe中会判断传入的数据是否为空或者是不是个对象
      2.如果传入的是个对象,就会创建对应的ob对象,同时调用walk方法
      3.walk方法中,会使用Object.keys获取到data对象所有的直系属性名,并调用defineReactive方法开始数据劫持
      4.在defineReactive中,
        -创建一个全新的dep对象
          总结:每个响应式属性都会生成一个对应的dep对象

        -判断属性值是否是对象,如果是就进行深度数据劫持,回到流程1
        -使用Object.defineProperty方法将data对象上所有的属性都进行重写
          将原先的value值属性改为get/set属性
          如果使用者读取当前属性值,就会触发他的get方法,获取到由闭包缓存下来的value值
          如果使用者修改当前属性值,就会触发他的set方法
            -判断新旧值是否相同,如果不相同才继续执行后续代码
            -将新值放入闭包中,留作下次使用
            -对新值进行深度数据劫持,将内部所有的属性都变成响应式属性
            -调用dep.notify方法通知DOM更新
  
  
  */

  observe(data, this);
  // observe(this._data, vm);

  /*
    MVVM源码第三部分:模版解析
    目的:
      1.将页面上指定元素的内容作为模版解析,将内部出现的插值语法变成对应的状态数据
  
    流程:
      1.将options.el属性传入Compile方法,创建compile对象
        如果传入的数据不是真实DOM,他会自动找到页面上的真实DOM
      2.将真实DOM节点中所有的子节点全部转移到fragment中
      3.调用init方法开始解析文档碎片中的所有节点,取出每个子节点进行对应操作
        -如果当前节点是元素节点,就会获取所有的标签属性,解析Vue的指令
        -如果当前节点是文本节点,而且满足插值语法的正则表达式
          调用bind方法

        如果当前节点具有子节点,那么就继续递归编译元素

      4.在bind方法中
        -找到对应的文本更新器函数(textUpdater方法)
        -使用_getVMVal方法,获取到对应属性的属性值
        -调用文本更新器函数,通过原生DOM操作,更新对应的节点的文本内容

        注意:在bind方法中会创建watcher对象,每个插值语法都会生成一个对应的watcher对象
      5.最终当所有节点都解析结束之后,会将文档碎片对象用appendChild方法插入到页面上
  
  */

  this.$compile = new Compile(options.el || document.body, this);
  // this.$compile = new Compile("#app", vm);

  /*
    问题1:请问Vue1中更新DOM是同步更新还是异步更新?
    答案:同步更新

    问题2:请问Vue2中更新DOM是同步更新还是异步更新?
    答案:异步更新
          此处的异步更新是微任务更新
          Vue2会将更新DOM的函数交给nextTick,由他负责执行,而nextTick核心其实就是.then

    问题3:请问Vue1中更新的范围是多大?(整个APP,某个组件,某个节点)
    答案:使用到响应式属性的插值语法节点(非常精准)

    问题4:请问Vue2中更新的范围是多大?(整个APP,某个组件,某个节点)
    答案:使用到响应式属性的组件(范围更新)
      感觉上去Vue1的更新方案性能会更好,Vue2更新方案很有可能出现误杀的情况
        其实,Vue2具有虚拟DOM配合diff算法,会将需要更新的节点再过一遍,
          检查哪些节点不需要更新,防止误杀的出现(提高性能)

    问题5:请问Vue1中使用数组的下标更新数据,有没有响应式效果?
    答案:Vue1中数组的下标具有响应式效果
        因为Vue1中从来没有对数组进行任何的特殊对待
        从该案例中可以证明,数组的下标是可以进行数据劫持的

    问题6:请问Vue2中使用数组的下标更新数据,有没有响应式效果?
    答案:Vue2中数组的下标不具有响应式效果

      问题:为什么数组的下标可以做数据劫持,但是不做?
      答案:这是尤大大故意的
        在实际开发中,我们很少直接修改数组中某个下标的属性值,而且项目中数组的体积一般较大,
        如果对每个下标都进行响应式处理,会生成非常多的dep对象,占用更多的内容,
        结果花费了更多的资源,但是平常基本用不到

      问题:Vue2源码中,如何做到不劫持数组的下标的?
      答案:在做数据劫持之间,Vue2会对当前得到的数据进行类型判断
            如果是数组,那么就使用for循环,越过对下标的数据劫持,
              直接将内部的属性值进行数据劫持
            如果是对象,那么就调用walk方法,对内部所有的属性进行数据劫持(与Vue1相同)

      问题:Vue2中,如何才能更新数组还能具有响应式效果?
      答案:在Vue2中,尤大大对数组的七种方法进行了重写,
          只要使用这七种方法操作数据,就会具有更新DOM功能
            push,pop,shift,unshift,splice,sort,reverse

      问题:Vue2中,是如何做到使用以上七种方法操作data中的数组就能更新DOM,
                  对非data中的数组,就没有更新DOM的功能的?
      答案:
          1.对data中所有的数组的__proto__进行了修改
          2.将__proto__全部修改成了一个全新的对象
              这个全新的对象他的__proto__指向了Array.prototype
              而这个对象身上,被添加上了上述的7种方法
          3.如果data中某个数组使用了上述的7中方法,就会触发该对象上对应的方法
            而对应方法中,会先调用数组原生的方法对数据进行操作,再执行dep.notify通知DOM进行更新

  
  
  */

}

MVVM.prototype = {
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },

  _proxy: function (key) {
    //   vm._proxy("msg");
    // this=>vm对象,key=>"msg"
    var me = this;

    Object.defineProperty(me, key, {
      configurable: false, //不能重复定义
      enumerable: true, //可以遍历
      get: function proxyGetter() {
        return me._data[key];
      },
      set: function proxySetter(newVal) {
        me._data[key] = newVal;
      },
    });

    // Object.defineProperty它可以用于给某个对象新增或者修改属性
    // 但是他比普通obj.name=1写法更加强大
    /* js中属性有两种情况
        1.具有value值的属性(比较常见)
        2.具有get/set方法的属性
          如果开发者读取当前属性的值时,会触发get函数,并将函数的返回值作为结果返回出去使用
          如果开发者设置当前属性的值时,会触发set函数,执行函数内部的代码

        注意:一个属性如果具有get/set方法,就无法拥有value值
    */


    // 由于vm对象上并没有msg属性,所以此处是在新增属性msg
    // Object.defineProperty(vm, "msg", {
    //   configurable: false, //不能重复定义
    //   enumerable: true, //可以遍历
    //   get: function proxyGetter() {
    //     return vm._data["msg"];
    //   },
    //   set: function proxySetter(newVal) {
    //     vm._data["msg"] = newVal;
    //   },
    // });
  },
};
