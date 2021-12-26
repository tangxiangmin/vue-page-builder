<template>
  <vue-qr
    :correct-level="0"
    :text="text"
    :size="400"
    :dot-scale="1"
    :margin="10"
    :logo-margin="5"
    :logo-corner-radius="0"
    class="qr_code"
  />
</template>

<script>
import vueQr from 'vue-qr'

export default {
  components: {
    vueQr
  },
  props: {
    text: {
      type: String,
      default: ''
    },

  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>

</style>
