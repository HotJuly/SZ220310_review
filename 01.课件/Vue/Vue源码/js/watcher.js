function Watcher(vm, exp, cb) {
  // new Watcher(vm, "msg", function(value, oldValue) {
  // 通过闭包的形式,缓存了当前对应的更新器函数
  //     textUpdater && textUpdater(node, value, oldValue);
  // });

//   this->watcher对象

  this.cb = cb;
  this.vm = vm;
  this.exp = exp;

  this.depIds = {};

  this.value = this.get();

}

Watcher.prototype = {
  update: function () {
    this.run();
  },
  run: function () {
    // 通过get方法可以获取到当前watcher表达式的最新结果
    var value = this.get();

    // 将旧值放入oldVal变量中
    var oldVal = this.value;

    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  },
  addDep: function (dep) {
    // watcher.addDep(dep);

    // A.hasOwnProperty(B)=>用于检查A对象身上是否具有B属性
    // 如果depIds身上没有当前dep的id同名的属性名,就会进入该判断
    // depIds对象的用处,就是用来收集与当前watcher相关的dep对象
    // 每个watcher都会收集到与自己相关的所有的dep对象
    // 每个插值语法都会收集到与自己相关的所有的响应式属性
    // 目的:就是为了收集当前插值语法一共用到了哪些响应式属性
    if (!this.depIds.hasOwnProperty(dep.id)) {

      this.depIds[dep.id] = dep;
    //   this.depIds[0] = dep;

      dep.addSub(this);
    //   dep.addSub(watcher);
    }
  },
  get: function () {
    Dep.target = this;
    // Dep.target = watcher;

    var value = this.getVMVal();

    Dep.target = null;
    return value;
  },

  getVMVal: function () {
    // 假设this.exp=>"person.name"
    // exp=>["person","name"]
    var exp = this.exp.split(".");

    // 将data对象作为val的初始值
    var val = this.vm._data;

    exp.forEach(function (k) {
      val = val[k];
    });
    // ["person","name"].forEach(function (k) {
    // 第一次执行:  val = data["person"];
    // 第二次执行:  val = person["name"];
    // });
    return val;
  },
};
