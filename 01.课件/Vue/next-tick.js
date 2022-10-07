const callbacks = []
let pending = false
let timerFunc;

function flushCallbacks () {
  pending = false

  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

if (typeof Promise !== 'undefined') {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
  }
}


export function nextTick (cb,vm) {
  callbacks.push(() => {
    if (cb) {
        cb.call(vm)
    }
  })

  // 多次调用nextTick只会进入该判断一次
  if (!pending) {
    pending = true
    timerFunc()
  }
}

/*
  nextTick源码重点:
    1.nextTick中会创建一个callbacks数组,
      该数组会收集当前项目传递给nextTick函数的所有的回调函数
    2.多次调用nextTick只会开启一个.then
    3.当.then微任务被执行的时候,nextTick会使用for循环遍历callbacks数组,
      调用内部存储的所有的cb函数


  响应式属性更新之后流程:
    1.响应式属性更新之后,会触发当前响应式属性的set方法
    2.set方法中会触发dep.notify方法
    3.dep.notify方法中会触发watcher.update方法
    4.watcher.update方法中会触发queueWatcher方法
    5.queueWatcher中会调用nextTick方法,并将更新DOM的函数传入nextTick中
      这就是Vue更新DOM是异步更新的原因
*/
