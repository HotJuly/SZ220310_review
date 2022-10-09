export default {
  data(){
    return {
      pageX:null,
      pageY:null
    }
  },
  mounted(){
    /*
      需求:当用户的鼠标在页面上移动时,页面上显示用户鼠标坐标
      拆解:
        1.当用户的鼠标在页面上移动时
          绑定事件监听
          事件源:document
          事件名:mousemove

        2.页面上显示用户鼠标坐标
          继续拆解:
            1.使用状态数据在页面上显示坐标
            2.如何获取到用户鼠标坐标
              通过event中的clientX和clientY可以获取
    
    */
  //  console.log('APP自己的mounted',this.$options.name)
    document.addEventListener('mousemove',this.mouseMoveHandler)
  },
  methods:{
    mouseMoveHandler(event){
      // console.log('mousemove',event)
      const {clientX,clientY} = event;
      this.pageX = clientX;
      this.pageY = clientY;
    },
    testAPI(){
        console.log('局部混入')
    }
  }
}