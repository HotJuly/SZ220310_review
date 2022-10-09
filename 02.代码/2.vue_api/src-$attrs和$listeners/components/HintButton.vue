<template>
    <el-tooltip class="item" effect="dark" :content="content" placement="top-start">
        <!-- <el-button :type="type" :size="size">添加</el-button> -->
        <!-- <el-button v-bind="$attrs" @click="clickHandler">添加</el-button> -->
        <el-button v-bind="$attrs" v-on="$listeners">添加</el-button>
    </el-tooltip>
</template>
  
<script>
export default {
    name: 'HintButton',
    props: {
        content:String,
        // size:String,
        // type:String
    },
    mounted(){
        // console.log('$listeners',this.$listeners)
    },
    methods:{
        clickHandler(){
            this.$emit('click');
        }
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  