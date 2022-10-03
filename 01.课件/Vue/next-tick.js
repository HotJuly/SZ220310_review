const callbacks = []
let pending = false
let timerFunc;

function flushCallbacks () {
  // 当微任务执行之后,将开关关闭,之后调用的nextTick函数就可以开启新的.then微任务了
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

/*
*/

export function nextTick (cb,vm) {
  callbacks.push(() => {
    if (cb) {
        cb.call(vm)
    }
  })
  if (!pending) {
    pending = true
    // 由于此处具有开关操作,所以无论调用多少次nextTick函数,都只会触发一次timerFunc函数
    timerFunc()
  }
}

/*
  nextTick重点:
    1.nextTick中具有一个callbacks数组,用于收集传入的所有的回调函数
    2.当nextTick被调用的时候,传入的回调函数会被统一收集到callbacks数组中
      第一调用nextTick的时候,会开启一个.then微任务
        后续再次调用nextTick,不会在开启一个新的微任务,他们会共享第一个微任务
    3.当nextTick专用的微任务执行的时候,会遍历callbacks数组,调用内部所有的回调函数
      所以才会出现后续调用的nextTick,会跟第一次调用的nextTick一起执行的效果


  响应式更新视图的流程:
    1.当用户修改了某个响应式数据之后,会触发dep.notify方法
    2.dep.notify方法中会触发queueWatcher方法
    3.在queueWatcher方法中,Vue会将更新视图的函数传递给nextTick进行管理
      所以Vue的DOM更新效果是异步效果
*/