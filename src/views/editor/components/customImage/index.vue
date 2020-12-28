<template>
  <img :src="config.src" class="image" alt="">
</template>

<script>
export default {
  name: 'CustomImage',
  props: {
    config: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
.image {
  display: block;
  max-width: 100%;
}
</style>
