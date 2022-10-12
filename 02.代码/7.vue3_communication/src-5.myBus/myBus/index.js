import mitt from 'mitt';

// ES6模块化的特点,无论多少个组件引入当前模块的代码,内部代码都只会执行一次
// mitt()会返回一个全局事件总线对象
export default mitt();