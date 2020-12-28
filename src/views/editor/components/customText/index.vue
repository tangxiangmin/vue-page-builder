<template>
  <div>{{ config.content }}</div>
</template>

<script>
export default {
  name: 'CustomText',
  props: {
    config: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>

</style>
