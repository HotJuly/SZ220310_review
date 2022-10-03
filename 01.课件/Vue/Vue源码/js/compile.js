function Compile(el, vm) {
    //"#app" || document.body, vm
    // this->com对象

    this.$vm = vm;

    // 从页面上查找到id为app的元素
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {

        this.$fragment = this.node2Fragment(this.$el);

        // init中会将文档碎片中所有的插值语法和指令都解析结束
        this.init();

        this.$el.appendChild(this.$fragment);

    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        // 该函数的用处,就是将el元素中所有的直系子节点全部移到文档碎片中
        // el->#app元素
        // 节点放入到文档碎片中后,会从页面上消失,即便修改该节点的内容,页面也不会重新渲染
        var fragment = document.createDocumentFragment(),
            child;

        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        // 第一次进入:el->文档碎片对象
        // 第二次进入:el->p元素

        // childNodes->是文档碎片中所有直系子节点组成的伪数组
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

        // [p标签].forEach(function(node) {
            // 获取p元素中的文本内容->"{{msg}}"
        //     var text = node.textContent;
        //     var reg = /\{\{(.*)\}\}/;

        //     if (com.isElementNode(node)) {
            //      此处就是在解析当前元素身上的vue指令
        //         com.compile(p节点);

        //     } else if (com.isTextNode(node) && reg.test(text)) {
        //         com.compileText(text节点, "msg");
        //     }

        //     if (p元素.childNodes && node.childNodes.length) {
        //         com.compileElement(p元素);
        //     }
        // });

    },

    compile: function(node) {
        // node->p元素
        // nodeAttrs->获取p元素节点上所有标签属性对象组成的伪数组
        var nodeAttrs = node.attributes,
            me = this;
        // console.log('nodeAttrs',nodeAttrs);

        [].slice.call(nodeAttrs).forEach(function(attr) {
            var attrName = attr.name;
            if (me.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);

                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });

        // [{name:"class"}].forEach(function(attr) {
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
        // text节点, "msg"
        compileUtil.text(node, this.$vm, exp);
        // compileUtil.text(text节点, vm, "msg");
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
        // text节点, vm, "msg"
        // this->compileUtil对象

        this.bind(node, vm, exp, 'text');
        // this.bind(text节点, vm, "msg", 'text');
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
        // text节点, vm, "msg", 'text'

        // 获取专门用于更新文本的更新器函数
        var updaterFn = updater[dir + 'Updater'];
        // var updaterFn = updater['textUpdater'];

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        // textUpdater && textUpdater(text节点, this._getVMVal(vm, "msg"));
        // textUpdater && textUpdater(text节点, "hello mvvm");

        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });

        // new Watcher(vm, "msg", function(value, oldValue) {
        //     textUpdater && textUpdater(text节点, value, oldValue);
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
        // this._getVMVal(vm, "msg")
        // 该函数的用处,就是读取data上对应的属性值

        var val = vm._data;

        // 将表达式以.切割,变成数组
        // ["msg"]
        // 假设现在的表达式是person.name->["person","name"]
        exp = exp.split('.');

        exp.forEach(function(k) {
            val = val[k];
        });

        // ["person","name"].forEach(function(k) {
        //     val = val[k];
        //     第一次执行回调函数:val = vm._data["person"];
        //     第二次执行回调函数:val = person["name"];
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
        // text节点, "hello mvvm"
        node.textContent = typeof value == 'undefined' ? '' : value;
        // text节点.textContent =  value;
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