<template>
  <el-popover
      placement="bottom-start"
      width="200"
      trigger="click"
  >
    <div>
      <qrCode :text="url"/>
      <div class="mt-10px">
        <el-button size="small" @click="copyLink">
          复制链接
        </el-button>
        <el-button size="small" @click="openLink">
          直接访问
        </el-button>
      </div>
    </div>
    <template v-slot:reference>
      <span class="cursor-pointer">
        <slot name="default"/>
      </span>
    </template>
  </el-popover>
</template>

<script setup>
import qrCode from './qrCode.vue'
import ClipboardJS from 'clipboard'
import {onMounted} from "vue";
import {ElMessage} from "element-plus";

import {useClipboard} from '../utils/clipboard'

const props = defineProps({
  url: {
    type: String,
    default: ''
  }
})

const {copy: copyLink} = useClipboard(props.url)

function openLink() {
  window.open(props.url, '_blank')
}

onMounted(() => {

})

</script>

<style scoped lang="scss">
</style>
