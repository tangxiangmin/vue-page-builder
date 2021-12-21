<template>
  <span contenteditable="true" @input="onTextChange">{{ config.content }}</span>
</template>

<script>
export default {
  name: 'CustomText',
  props: {
    config: {
      type: Object,
      default: null
    }
  },
  methods: {
    onTextChange(e) {
      this.config.content = e.target.innerText
    }
  }
}
</script>

<style scoped>

</style>
