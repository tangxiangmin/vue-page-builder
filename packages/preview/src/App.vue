<template>
  <div class="demo">
    <button @click="clickMe">click me123123</button>
  </div>
</template>

<script>
export default {
  name: "test",
  methods:{
    clickMe(){
        alert(123)
    }
  }
};
</script>

<style scoped>
.demo {
  color: red;
}
</style>