function MVVM(options) {
  /*
        options={
            el: "#app",
            data: {
                msg: "hello mvvm",
                person:{
                    name:"xiaoming",
                    msg:"123"
                },
            }
        }
        this->mvvm的实例对象,后续简称vm对象
    */

  this.$options = options;

  var data = (this._data = this.$options.data);
  // var data = (this._data = this.$options.data);
  // var data = this.$options.data;

  var me = this;

  /*
        MVVM源码的第一部分:数据代理

        代理:当我们找某个代理购买东西,代理会找厂家获取东西,再将东西转交给我们
            从我们的视角来看,感觉代理是有货的,但其实他并没有存储货物,
            只是做了个转交的工作

        目的:方便用户读取_data中的相关状态数据,可以简化用户的操作,
            读取属性时可以少写._data操作

        次数:2次(与data直系属性个数有关)

        流程:
            1.使用Object.keys方法,获取到data对象上所有的直系属性名组成的数组
            2.遍历得到的属性名数组,执行_proxy方法
            3.根据每个直系属性的名称,在组件实例对象上,添加同名的属性名
                并将该属性变为get/set方法
                当用户读取该属性的值时,会自动调用get方法,找this._data对象读取数据并进行返回
                当用户设置该属性的值时,会自动调用set方法,对this._data对象上同名的属性进行修改
    
    */
  Object.keys(data).forEach(function (key) {
    me._proxy(key);
  });

  // Object.keys的用处,就是返回一个由当前对象所有直系属性名组成的数组
  // Object.keys(options.data).forEach(function(key) {
  // ["msg","person"].forEach(function(key) {
  //     vm._proxy("msg");
  // });

  /*
        问题:什么是响应式?
        回答:当某个属性的值发生变化时,页面会渲染出最新的结果

        需求:当某个属性的值发生变化时,页面会渲染出最新的结果
        拆解:
            1.当某个属性的值发生变化时
                可以给该属性添加get/set方法,用来监视用户的读取和修改操作

            2.页面渲染最新的结果
                将得到的最新数据,通过原生DOM的CRUD方法更新到页面上展示

        准备工作:
            1.在深度数据劫持data对象的时候,会给每个响应式属性都生成一个对应的dep对象
            2.在模版解析的时候,会给每个插值语法解析生成一个对应的watcher对象
            3.在生成watcher对象的时候,会调用watcher.get方法获取当前插值语法的结果
            4.在get函数中,会将Dep.target修改为当前的watcher对象
            5.watcher对象在调用watcher.getVMVal方法的时候,会去收集相关的dep
            6.watcher读取对应的响应式属性值的时候,会触发该属性数据劫持的get方法
            7.在数据劫持的get方法中,由于Dep.target已经有值,就会执行dep.depend方法
            8.在dep.depend方法中,会调用watcher的addDep方法
            9.在addDep方法中,watcher会使用depIds对象收集与自身相关的dep对象
            10.dep对象也会使用addSub方法,收集与自身相关的所有watcher对象

            小总结:
                也就是说,经过这套准备工作之后
                    实现了插值语法收集到了自己使用过的响应式属性
                        响应式属性也收集到了使用自己的插值语法
    
        响应式更新页面的流程:
            1.当开发者使用this.msg=123时,会触发数据代理的set方法
            2.msg数据代理会将传递的123,再次传给this._data.msg进行赋值,
                会触发数据劫持的set方法
            3.数据劫持的set方法中,会执行dep.notify方法
            4.dep.notify方法会遍历自己的subs数组,得到内部存储的所有watcher对象
            5.调用这些watcher对象的update方法,通知对应的节点进行DOM更新
            6.在update方法中,Vue会比较表达式的新旧两个值,
                如果两值不相同,就调用watcher.cb函数
            7.在watcher的cb函数中,会调用对应的更新器函数,用于更新指定的节点
            8.最终当DOM节点更新结束之后,GUI线程会将最新的结果绘制到页面上
    */
  /*
    MVVM源码第二部分:数据劫持

    劫持:控制某个对象,强迫他做自己不想做的事情

    目的:为了监视用户修改某个响应式属性的操作,如果值发生了变化,就通知DOM进行更新

    次数:4次(与当前data对象所有的属性个数有关,会深度劫持)

    流程:
        1.将data对象交给observe函数
        2.observe函数内部会判断当前data是不是空值或者是不是对象
            如果是空值或者不是对象,就结束数据劫持
        3.如果是对象,那么就创建一个Observer对象
        4.Observer构造函数中,会自动调用walk方法
        5.walk方法中,会使用Object.keys方法获取到data的所有直系属性名
        6.每具有一个直系属性名,就会调用一次defineReactive方法进行数据劫持
        7.defineReactive函数中会做以下几个事情:
            1.创建一个对应的dep对象
            2.检查当前数据劫持的属性值,将属性值交给observe函数
                如果是对象那么,递归回到流程2
            3.将data中的所有属性进行重写,将其从value值格式变为get/set方法格式
                通过get方法监视用户读取属性操作
                    如果用户读取该属性的值,就会返回闭包中保存的属性值

                通过set方法监视用户修改属性操作
                    1.判断新值与旧值是否相同,如果相同就return,什么都不做
                    2.对属性值进行深度劫持
                    3.通过调用dep.notify方法通知DOM进行更新

        注意点:
            每个响应式属性会创建一个dep对象

        
   */

  observe(data, this);
  //   observe(options.data, vm);

  /*
    MVVM源码第三部分:模版解析
    
    目的:获取到当前项目的模版代码,将内部的插值语法等内容替换成对应的数据进行展示

    流程:
        1.将options的el属性传给Compile函数,进行构造调用
        2.检查el是字符串,还是真实DOM,如果是字符串就查找页面上对应的真实DOM
        3.将el元素中所有的直系子节点,全部转移到文档碎片fragment中
        4.调用init方法,开始解析fragment中所有的直系子节点
        5.调用compileElement函数
            如果子节点是元素节点,就去获取他所有的标签属性
                查看标签属性中,是否具有vue指令,有就解析得到对应效果

            如果子节点是文本节点,而且通过了插值语法的正则匹配
                就执行流程6

        6.开始调用bind方法,准备解析该文本内容
        7.首先获取到用于更新文本的文本更新器textUpdater函数
        8.将当前文本节点,以及当前插值语法表达式的结果读取出来作为实参传递给textUpdater函数
        9.textUpdater函数根据表达式的结果,更新文本节点的文本内容
        10.最后,将fragment节点插入到页面的el元素中,进行页面渲染

    注意:
        1.在bind方法中,会new Watcher函数,创建watcher对象
            当页面上每存在一个插值语法的时候,就会调用一次bind方法
                也就是说每个插值语法会生成一个对应的watcher对象
*/
//   this.$compile = new Compile("#app" || document.body, vm);
  this.$compile = new Compile(options.el || document.body, this);

  /*
    问题1:请问Vue2中DOM更新是同步还是异步?
    回答:
        Vue视图更新的流程:
            1.Vue触发响应式操作
            2.修改现有的DOM对象内容
            3.GUI线程会在微任务队列清空之后,宏任务执行之前,
                根据最新的DOM结构渲染页面

        Vue2中DOM更新是微任务,Vue2中会将DOM更新的方法放入nextTick

    问题2:请问Vue1中DOM更新是同步还是异步?
    回答:Vue1中DOM更新是同步的

    问题3:请问Vue1中DOM更新的最小单位是什么?(整个页面,整个Vue组件,单个节点)
    回答:Vue1中DOM更新的最小单位是单个节点
        因为Vue1中,每个插值表达式都会生成一个watcher对象,所以能够实现精准更新


    问题4:请问Vue2中DOM更新的最小单位是什么?(整个页面,整个Vue组件,单个节点)
    回答:Vue2中DOM更新的最小单位是整个Vue组件
        因为在Vue2中,new Watcher的时候会传入一个updateComponent函数,
            updateComponent函数中,会调用vm._update方法,让整个组件进行更新

        因为Vue2中,每个组件会生成一个watcher对象,所以能够实现整个组件更新

        其实Vue2的性能并没有想象中的那么低,在更新一个组件的时候,DIFF算法会排上用场
            他会检测内部那些节点发生了变化,只更新这几个节点

    问题5:请问Vue1中使用数组的下标操作内容是否有响应式效果?
    回答:有响应式效果,
        Vue1中有对数组的下标进行数据劫持操作
        数组本身就是对象,对象就可以被数据劫持,所以数组可以被数据劫持
            数组是特殊的对象,特殊在属性名是下标数字格式

    问题6:请问Vue2中使用数组的下标操作内容是否有响应式效果?
    回答:没有响应式效果的,数组的下标不是响应式属性
        其实是因为Vue2没有对数组的下标进行数据劫持

        问题:如何做到针对数组的下标不做数据劫持的?
        回答:Vue2中针对收到的数据,会进行类型判断,
            如果是对象,那做的事情与Vue1相同
            如果是数组,那么他就会调用observeArray的方法,
                遍历数组中的内容进行深度劫持,跳过对下标的数据劫持

        问题:为什么不对数组的下标做数据劫持?
        回答:
            这是尤大大故意的
            因为数组的数据量一般都比较大,但是开发者又很少对数组的下标进行操作
                所以为了较少dep对象的生成,提高代码的性能,
                所以故意不对数组的下标进行数据劫持

        问题:如果真的想要修改数组中某个下标的内容,开发者应该怎么做?
        回答:
            可以使用数组的方法进行修改
            其实Vue2对数组的7种方法进行了重写,例如:push,pop,shift,unshift,splice,sort,reverse
                只要使用这七种方法,就可以操作数组数据的同时,让页面渲染处最新结果

            只有存在于data中数组,使用以上7种方法才会导致DOM更新
            如果不是data中的数组,即便使用以上7种方法也不会导致DOM更新

        问题:Vue2是如何做到这7种方法的重写的?
        回答:
            在数据劫持的时候,如果发现了data中有数组的存在
                会将这些数组的__proto__修改成一个全新的对象
                    这个全新的对象身上有7种方法(就是上面提到的七种)
                        如果data中的数组调用方法,会找这个对象借用,
                        如果这个对象没有需要的方法,才会找到Array的原型对象
  
  */
}

MVVM.prototype = {
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },

  _proxy: function (key) {
    // key=>"msg",this->vm对象
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

    // Object.defineProperty方法可以给一个对象添加或者修改某个属性
    // vm对象身上不存在msg属性,所以此处是在新增msg属性,方法后续使用this.msg语法
    // 属性分为两种,一种是有value值的属性,另一种是有get/set方法的属性
    // value值和get/set方法不能共存,
    // 具有get/set方法的属性,一般称为访问描述符
    // 当用户读取该属性的值时,会自动调用get方法,并将get方法的返回值进行返回给用户
    // 当用户设置该属性的值时,会自动调用set方法,执行内部的代码

    // Object.defineProperty(vm, "msg", {
    //     configurable: false, //不能重复定义
    //     enumerable: true, //可以遍历
    //     get: function proxyGetter() {
    //         return vm._data["msg"];
    //     },
    //     set: function proxySetter(newVal) {
    //         vm._data["msg"] = newVal;
    //         vm._data["msg"] = "hello atguigu";
    //     }
    // });
  },
};
