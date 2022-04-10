<template>
  <canvas id="canvas" class="qr" ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
// @ts-ignore
import QRCode from 'qrcode'
import {onMounted, ref} from "vue";

const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})

const canvasRef = ref(null)

onMounted(() => {
  QRCode.toCanvas(canvasRef.value, props.text)
})

</script>

<style scoped lang="scss">
.qr {
  width: 100% !important;
  height: 100% !important;
}
</style>
