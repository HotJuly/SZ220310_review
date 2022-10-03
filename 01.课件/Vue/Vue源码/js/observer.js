function Observer(data) {
    // data->options.data,this->ob对象
    this.data = data;
    this.walk(data);//走起
}

Observer.prototype = {
    walk: function(data) {
        // data->options.data,this->ob对象
        var me = this; //保存Observer实例化对象，因为下面要用

        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });

        // ["msg","person"].forEach(function(key) {
        //     ob.convert("msg", options.data["msg"]);
        //     ob.convert("msg", "hello mvvm");
        // });
        
    },
    convert: function(key, val) { 
        // "msg", "hello mvvm"
        this.defineReactive(this.data, key, val); 
        // this.defineReactive(options.data,"msg", "hello mvvm"); 
    },

    defineReactive: function(data, key, val) { 
        // this.defineReactive(options.data,"msg", "hello mvvm"); 

        // 每次调用defineReactive都会创建一个全新的dep对象
        // data中每具有一个属性名,就会创建出一个dep对象(因为Vue有对属性值进行深度递归)
        var dep = new Dep();  

        // 以下代码是隐式递归
        // Vue会对data对象中所有的属性进行数据劫持,将其变为响应式属性
        // var childObj = observe("hello mvvm");
        var childObj = observe(val);

        
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

        // 此处与数据代理不同,data对象上本来就有msg属性,但是此处在重写该属性
        // 设计的巧妙之处,本来msg属性被重写成了get/set方法,会丢失自己的value值
        //              但是Vue中使用闭包的形式,将value值缓存起来了
        // Object.defineProperty(options.data, "msg", {
        //     enumerable: true, // 可枚举
        //     configurable: false, // 不能再define

        //     get: function() {
              
        //         if (Dep.target) {
        //             dep.depend();
        //         }
        //         return val;
        //     },
        //     set: function(newVal) {
            // 如果本次的值和旧值相同,那么DOM就不会更新
        //         if (newVal === val) {
        //             return;
        //         }

        //         val = newVal;

        //          响应式属性创建的两个时机:1.组件初始化的时候 2.修改响应式属性的值时
        //         childObj = observe(newVal);
                
        //          此处时开始通知进行DOM更新
        //         dep.notify();
        //     }
        // });

    }
};


function observe(value, vm) {
//   observe(options.data, vm);

    //此处在判断value是否为空,以及value是不是个对象
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
        // dep.addSub(watcher);
        // 此行代码的作用,就是dep对象收集到了与自身相关的watcher对象
        // 当前响应式属性,已经知道了他与页面上的哪些插值语法有联系
        this.subs.push(sub);
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
        // subs数组中存放的是使用了当前响应式属性的所有watcher对象
        this.subs.forEach(function(sub) {
            sub.update();

            // 相当于通知对应的插值表达式进行DOM更新,展示最新数据
            // watcher.update();
        });
    }
};

Dep.target = null;