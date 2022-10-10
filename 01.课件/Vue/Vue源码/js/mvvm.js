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

  this.$compile = new Compile(options.el || document.body, this);

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
