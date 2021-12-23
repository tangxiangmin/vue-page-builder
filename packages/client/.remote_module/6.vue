<template>
<div>hello world {{msg}}</div>
</template>

<script>
export default {
  name: "index.vue",
props:{
msg:{type:String,defualt:''}
}

}
</script>

<style scoped>

</style>
