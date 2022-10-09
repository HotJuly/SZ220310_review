<template>
    <div class="big">
        <el-image 
            ref="image1"
            v-show="false"
            style="width: 100px; height: 100px"
            :src="url" 
            :preview-src-list="srcList">
        </el-image>
        <!-- <button @click="showBig">查看大图</button> -->
        <slot :click="showBig"></slot>
    </div>
</template>
  
<script>
export default {
    name: 'BigImage',
    data() {
      return {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ]
      }
    },
    methods:{
      showBig(){
          // console.log(this.$refs.image1)
          this.$refs.image1.clickHandler()
      }
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
  