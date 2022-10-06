/*
    setTimeout是超时定时器
        我们可以控制回调函数超过多少毫秒之后执行
        延迟时间的取值范围是1->无限大
            即便我们写0ms,结果也相当于是1ms

    出现的现象:定时器和setImmediate顺序时长互换位置
    原因:因为定时器最少延迟时间是1ms,然后由于主线程代码太少,很有可能不需要1ms就执行结束了
            而主线程代码执行结束,开始事件轮询机制时,定时器还没有满足要求,所以不会执行


    总结:node中一共有6个宏任务队列,2个微任务队列
*/

//--------------------
// node的宏任务
// const fs = require('fs');

// setImmediate(()=>{
//     console.log('1')
// })

// // 读取文件,需要开启通道读取,开启通道需要至少话费100ms以上
// fs.readFile("./1.原型相关.html",()=>{
//     console.log('2')

//     setTimeout(()=>{
//         console.log('3')
//     },0)

//     setImmediate(()=>{
//         console.log('4')
//     })
// })

// setTimeout(()=>{
//     console.log('5')
// },0)


// 写for循环的目的,是为了保证主线程代码执行时间超过1ms
// for (let index = 0; index < 100000; index++) {
    
// }


//----------------------
// node中的微任务
// 微任务相当于是异步任务中VIP,而nextTick是SVIP
// node中具有两个微任务队列
// 只要进入了微任务队列,就必须清空当前微任务队列才会切换到下一个队列去

// Promise.resolve().then(()=>{
//     console.log('1')

//     Promise.resolve().then(()=>{
//         console.log('2')
//     })
    
//     process.nextTick(()=>{
//         console.log('3')
//     })
    
//     Promise.resolve().then(()=>{
//         console.log('4')
//     })
// })

// process.nextTick(()=>{
//     console.log('5')
// })

// Promise.resolve().then(()=>{
//     console.log('1')
// })

process.nextTick(()=>{
    console.log('1')

    Promise.resolve().then(()=>{
        console.log('2')
    })
    
    process.nextTick(()=>{
        console.log('3')
    })
    
    Promise.resolve().then(()=>{
        console.log('4')
    })
})