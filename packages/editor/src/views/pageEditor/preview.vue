<template>
  <abstractContainer :config="comp" v-for="comp in config.children" :key="comp.id" />
</template>

<script setup>
import {defineProps} from "vue";
import abstractContainer from "./components/abstractContainer.vue";

defineProps({
  config: {
    type: Object,
    require: true
  }
})

</script>

<style scoped>

</style>
