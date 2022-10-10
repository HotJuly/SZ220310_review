function Compile(el, vm) {
    // new Compile("#app", vm); this->com对象
    this.$vm = vm;

    // 会将得到的真实dom存入$el中
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {

        // 为什么要把节点转移到文档碎片中
        // 目的是为了提高页面渲染性能,减少不必要的渲染
        // 存在于文档碎片中的节点,对其进行任何操作,都不会影响到页面渲染
        this.$fragment = this.node2Fragment(this.$el);

        this.init();

        // debugger

        // 此处就是将解析完的所有节点,插入到页面上,进行渲染展示
        // 此处就是在实现组件挂载
        this.$el.appendChild(this.$fragment);

    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        // el->app元素,this->com对象
        var fragment = document.createDocumentFragment(),
            child;


        // 以下代码其实就是将app元素中所有的节点,全部转移到文档碎片中,对app元素进行抄家行动
        while (child = el.firstChild) {
            // 如果一个节点插入到文档碎片中,那么他就会从页面上消失
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        // this.compileElement(this.$fragment);
        // 第二次进入,el->p元素节点
        // 此处的childNodes是个伪数组,结果:[文本节点,p元素节点,文本节点]
        // 第二次进来结果:[文本节点]
        var childNodes = el.childNodes,
            me = this;

        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;

            if (me.isElementNode(node)) {
                me.compile(node);

            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }

            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });

        // [].slice.call(childNodes)    目的就是将childNodes伪数组转为真数组
        // [文本节点,p元素节点,文本节点].forEach(function(node) {
        // node=>p元素节点
        // node=>文本节点

        // 第二次进入

        // text=>"{{msg}}"
        //     var text = node.textContent;

        // 正则表达式中,()的意思是进行分组,后续可以快速得到分组中的内容
        //     var reg = /\{\{(.*)\}\}/;

        //     if (com.isElementNode(p节点)) {
        //         com.compile(p节点);

        //     } else if (me.isTextNode(node) && reg.test(text)) {
        //         com.compileText(文本节点, RegExp.$1);
        //         com.compileText(文本节点, "msg");
        //     }

        //     if (node.childNodes && node.childNodes.length) {
        //         me.compileElement(node);
        //     }
        // });

    },

    compile: function(node) {
        // 此处是在解析Vue指令
        //com.compile(p节点);

        // 用于找到由多个标签属性节点组成的伪数组
        // {0:class对象}
        // var nodeAttrs = node.attributes,
        //     me = this;

        // [].slice.call(nodeAttrs).forEach(function(attr) {
        //     var attrName = attr.name;
        //     if (me.isDirective(attrName)) {
        //         var exp = attr.value;
        //         var dir = attrName.substring(2);

        //         if (me.isEventDirective(dir)) {
        //             compileUtil.eventHandler(node, me.$vm, exp, dir);
        //         } else {
        //             compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        //         }

        //         node.removeAttribute(attrName);
        //     }
        // });

    },

    compileText: function(node, exp) {
        // com.compileText(文本节点, "msg");
        compileUtil.text(node, this.$vm, exp);
        
        // compileUtil.text(文本节点, vm, "msg");
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        // compileUtil.text(文本节点, vm, "msg");
        this.bind(node, vm, exp, 'text');

        // this.bind(文本节点, vm, "msg", 'text');
    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        // this.bind(文本节点, vm, "msg", 'text');

        // 获取到文本更新器函数,通过该函数可以更新页面上指定的文本节点的文本内容
        var updaterFn = updater[dir + 'Updater'];
        // var updaterFn = updater['textUpdater'];

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        // updaterFn && updaterFn(文本节点, this._getVMVal(vm, "msg"));
        // updaterFn && updaterFn(文本节点, "hello MVVM");

        // 以下代码对于首次渲染中,没有任何影响
        // 小总结:
        //      每次调用bind方法都会生成一个对应的watcher对象
        //      每个插值语法都会生成一个对应的watcher对象

        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });

        // new Watcher(vm, "msg", function(value, oldValue) {
            // 通过闭包的形式,缓存了当前对应的更新器函数
        //     textUpdater && textUpdater(文本节点, value, oldValue);
        // });

    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        var val = vm._data;

        // exp=>"msg"
        // exp=> ["msg"]
        // .切割的目的,就是为了防止person.age这种情况的出现
        exp = exp.split('.');

        exp.forEach(function(k) {
            val = val[k];
        });
        // ["msg"].forEach(function(k) {
            // 此处会触发数据劫持get,不会触发数据代理get
        //     val = val["msg"];
        // });

        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
        // 文本节点.textContent = typeof value == 'undefined' ? '' : "hello MVVM";
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};