<template>
  <el-upload
      v-loading="isLoading"
      :show-file-list="false"
      :before-upload="uploadImage"
      class="upload"
      action="/api/uploadImage"
  >
    <template v-if="value">
      <img v-if="isImage" :src="value" alt="">
    </template>
    <el-icon size="50" v-else>
      <Plus/>
    </el-icon>
    <div class="upload_action" @click.stop>
      <el-icon @click.stop="editImage">
        <Edit/>
      </el-icon>
      <el-icon v-if="value && isImage" @click.stop="previewImage">
        <ZoomIn/>
      </el-icon>
      <el-icon v-if="value" @click.stop="clearImage">
        <Delete/>
      </el-icon>
    </div>
  </el-upload>
</template>

<script setup lang="ts">
import {uploadFile} from '../api/util'
import {computed, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {Edit, Delete, ZoomIn, Plus} from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  // 上传类型，默认为图片
  type: {
    type: String,
    default: 'img' // img、video、zip
  }
})

const emit = defineEmits(['update:modelValue'])
const isLoading = ref(false)
const value = ref(props.modelValue)

const isImage = computed(() => {
  return props.type === 'img'
})

function handleSuccess(res: { data: { code: number, data: { url: string } } }) {
  // 获取接口响应
  const {code, data} = res.data
  if (code === 0) {
    ElMessage.success('文件上传成功')
    const {url} = data
    emit('update:modelValue', url)
  }
}

function handleError() {
  ElMessage.error('文件上传失败')
}

function uploadImage(file: File) {
  const $msg = ElMessage.info('文件上传中')
  const randomNum = Math.ceil(Math.random() * 100000)
  const remotePath = `/${props.type}/${Date.now()}_${randomNum}/${file.name}` // 拼接一个访问url

  // 图片上传
  const fd = new FormData()
  fd.append('file', file)
  fd.append('remotePath', remotePath)

  isLoading.value = true
  uploadFile(fd).then((res) => {
    handleSuccess(res)
  }).catch(handleError).finally(() => {
    isLoading.value = false
    $msg.close()
  })
  // 禁止默认上传
  return false
}

function clearImage(e: Event) {
  ElMessageBox.confirm('确认删除文件?').then(() => {
    emit('update:modelValue', '')
  }).catch(() => {
  })
  e.preventDefault()
}

function editImage() {
  ElMessageBox.prompt('请输入文件地址', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: value.value
  }).then(({value}) => {
    emit('update:modelValue', value)
  }).catch(() => {
  })
}

function previewImage() {
  if (!isImage.value) {
    ElMessage.error(`当前类型:${props.type}暂不支持预览哦`)
    return
  }
  ElMessageBox.alert(`<img src="${value.value}"  style="width:100%;"/>`, '图片预览', {
    dangerouslyUseHTMLString: true,
    customClass: 'img-preview-dialog' // 控制宽度
  })
}
</script>

<style scoped lang="scss">
.upload {
  position: relative;
  $s: 150px;
  display: flex;
  align-items: center;
  justify-content: center;

  width: $s;
  height: $s;
  border: 1px dashed #d9d9d9;

  &_action {
    display: flex;
    justify-content: space-around;
    align-items: center;

    height: 30px;

    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .el-icon-plus {
    display: block;
    width: $s;
    height: $s;
    line-height: $s;
  }

  img {
    display: block;
    max-width: $s;
    max-height: $s;
    /*object-fit: cover;*/
  }
}

.avatar-uploader-icon {
  font-size: 20px;
}
</style>
<style lang="scss">
.img-preview-dialog {
  width: 1000px;
}
</style>

