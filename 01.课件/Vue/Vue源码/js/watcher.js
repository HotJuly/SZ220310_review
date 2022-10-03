function Watcher(vm, exp, cb) {
    // vm, "msg", function(value, oldValue) {
        //     textUpdater && textUpdater(text节点, value, oldValue);
        // }

    // this->watcher对象

    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    
    //depIds中存放的是空对象
    this.depIds = {};

    this.value = this.get();
}

Watcher.prototype = {
    update: function() {
        this.run();
    },
    run: function() {
        // get方法可以获取到最新的表达式结果
        var value = this.get();

        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;

            //使用call方法调用cb回调函数,并传入表达式最新的结果
            // cb回调函数中会传入之前new Watcher时候,使用闭包缓存的textUpdater
            // 最终通过textUpdater更新器,更新指定的文本节点,显示最新结果
            this.cb.call(this.vm, value, oldVal);
        }
    },
    addDep: function(dep) {
        // dep对象

        // A.hasOwnProperty(B),可以检测A对象身上是否具有B属性
        // 此处在检查depIds对象中是否存有当前这个dep对象
        if (!this.depIds.hasOwnProperty(dep.id)) {
            
            // 此处相当于是watcher对象使用depIds收集了与自己相关的所有dep对象
            // 也就是说,当前插值语法已经收集到了与他相关的响应式属性了
            // 例如:插值语法"person.name" -> 与他相关的就是person和name两个响应式属性
            this.depIds[dep.id] = dep;
            // this.depIds[1] = dep对象

            dep.addSub(this);
            // dep.addSub(watcher);
        }
    },
    get: function() {
        Dep.target = this;
        // Dep.target = 当前watcher对象;

        var value = this.getVMVal();

        Dep.target = null;
        return value;
    },

    getVMVal: function() {
        // 假设:exp=> ["person","name"]
        var exp = this.exp.split('.');

        var val = this.vm._data;

        exp.forEach(function(k) {
            val = val[k];
            //第一次: val = _data["person"];
            //第二次: val = person["name"];
        });
        return val;
    }
};