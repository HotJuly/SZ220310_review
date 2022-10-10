function Observer(data) {
    // new Observer(data对象);
    // this->ob对象
    this.data = data;
    this.walk(data);//走起
}

Observer.prototype = {
    walk: function(data) {
        // this->ob对象
        // this.walk(data);//走起
        var me = this; 

        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });
        
        // ["msg","person"].forEach(function(key) {
        //     ob.convert("msg", "hello mvvm");
        // });
        
    },
    convert: function(key, val) { 
        // ob.convert("msg", "hello mvvm");
        this.defineReactive(this.data, key, val); 

        // 此处就要开始数据劫持
        // ob.defineReactive(data对象, "msg", "hello mvvm"); 
    },

    defineReactive: function(data, key, val) { 
        // ob.defineReactive(data对象, "msg", "hello mvvm"); 

        // 从最直观的代码来看,data对象中每具有一个直系属性,就会创建出一个全新的dep对象
        // 由于下面会进行深度递归劫持,所以其实是每个属性都会产生一个dep对象
        var dep = new Dep();  

        // 此处在实现隐式递归
        // 此处在对属性值进行递归操作
        // 也就是说,如果某个属性的属性值是对象数据类型,就会继续对内部的属性进行深度劫持
        var childObj = observe(val);
        // var childObj = observe("hello mvvm");

        
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define

            get: function() {
              
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;

                childObj = observe(newVal);
                
                dep.notify();
            }
        });

        // data对象身上原本就有msg属性,那么此处就是重写对应的属性
        // 由于data对象中的msg属性已经被重写成get/set方法了,那么他原先的value值就会丢失
        // 注意点:虽然msg属性没有value值了,但是Vue通过闭包的形式将原本的val缓存下来使用
        // Object.defineProperty(data, "msg", {
        //     enumerable: true, // 可枚举
        //     configurable: false, // 不能再define

        //     get: function() {
              
        //         if (Dep.target) {
        //             dep.depend();
        //         }
        //         return val;
        //     },
        //     set: function(newVal) {
        //          如果新值等于旧值,那就直接结束代码执行
        //          也就是说,如果多次更新的属性值相同,页面只会发生一次更新
        //         if (newVal === val) {
        //             return;
        //         }

        //         val = newVal;

        /*
            响应式属性的创建时机:
                1.当组件初始化的时候,data函数返回的对象内部所有的属性都会变成响应式属性
                2.当更新某个响应式属性的值时,如果传入的是个对象,那么该对象中所有的属性也会变成响应式属性
        
        */
        //          将传入的对象进行深度数据劫持,所有属性都会变成响应式属性   
        //         childObj = observe(newVal);

        //          通知对应的DOM节点进行更新
        //         dep.notify();
        //     }
        // });

    }
    
};


function observe(value, vm) {
    // observe(this._data, vm);

    // 此处在判断value值是否有值,有值的话是否是个对象
    if (!value || typeof value !== 'object') {
        return;
    }

    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        //   dep.addSub(watcher);

        this.subs.push(sub);
        // 此处当前dep对象收集到了用到过自己的watcher对象
        // 目的:当前响应式属性知道了,哪几个插值语法用到了自己
        // dep.subs.push(watcher);
    },

    depend: function() {
        Dep.target.addDep(this);
        // watcher.addDep(dep);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
        
        // this.subs.forEach(function(sub) {
        //     watcher.update();
        // });
    }
};

Dep.target = null;