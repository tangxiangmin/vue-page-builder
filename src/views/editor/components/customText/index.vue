<template>
  <span>{{ config.content }}</span>
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
