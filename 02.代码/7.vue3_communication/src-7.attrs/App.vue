<template>
  <HelloWorld a="1" b="2" c="3" @abc="()=>{}"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import HelloWorld from '@/components/HelloWorld'

</script>

<style>
</style>
