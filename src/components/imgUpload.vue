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
      <i v-else class="el-icon-film avatar-uploader-icon" />
    </template>
    <i v-else class="el-icon-plus avatar-uploader-icon" />
    <div class="upload_action" @click.stop>
      <i class="el-icon-edit" title="编辑文件地址" @click.stop="editImage" />
      <i v-if="value && isImage" class="el-icon-zoom-in" title="预览图片" @click.stop="previewImage" />
      <i v-if="value" class="el-icon-delete" title="删除文件" @click.stop="clearImage" />
    </div>
  </el-upload>
</template>

<script>
import SparkMD5 from 'spark-md5'
import { uploadImage } from '@/api'
// import { ignoreProtocol } from '@/utils'

// 获取文件的md5
// 相关wiki https://www.npmjs.com/package/spark-md5
function fileMd5(file, cb) {
  const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
  const chunkSize = 2097152 // Read in chunks of 2MB
  const chunks = Math.ceil(file.size / chunkSize)
  let currentChunk = 0
  const spark = new SparkMD5.ArrayBuffer()
  const fileReader = new FileReader()

  fileReader.onload = function(e) {
    spark.append(e.target.result) // Append array buffer
    currentChunk++

    if (currentChunk < chunks) {
      loadNext()
    } else {
      cb(spark.end())
    }
  }

  fileReader.onerror = function() {
    console.warn('oops, something went wrong.')
  }

  function loadNext() {
    const start = currentChunk * chunkSize
    const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize

    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
  }

  loadNext()
}

export default {
  name: 'ImgUpload',
  props: {
    // v-model
    value: {
      type: String,
      default: ''
    },
    // 上传类型，默认为图片
    type: {
      type: String,
      default: 'img' // img、video、zip
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    isImage() {
      return this.type === 'img'
    }
  },
  methods: {
    handleSuccess(res) {
      // 获取接口响应
      const { code, data } = res.data
      if (code === 0) {
        this.$message.success('文件上传成功')

        const { url } = data
        // const src = this.isImage ? ignoreProtocol(url) : url
        this.$emit('input', url)
      }
    },
    handleError(e) {
      console.log(e)
      this.$message.error('文件上传失败')
    },
    uploadImage(file) {
      const $msg = this.$message.info('文件上传中')
      fileMd5(file, (md5) => {
        const randomNum = Math.ceil(Math.random() * 100000)
        const remotePath = `/${this.type}/${Date.now()}_${randomNum}/${file.name}` // 拼接一个访问url

        // 图片上传
        const fd = new FormData()
        fd.append('file', file)
        fd.append('remotePath', remotePath)
        fd.append('fileMd5', md5)

        this.isLoading = true
        uploadImage(fd).then((res) => {
          this.handleSuccess(res, file)
        }).catch(this.handleError).finally(() => {
          this.isLoading = false
          $msg.close()
        })
      })
      // 禁止默认上传
      return false
    },
    // 删除上传的图片
    clearImage(e) {
      this.$confirm('确认删除文件?').then(() => {
        this.$emit('input', '')
      }).catch(() => {
      })
      e.preventDefault()
    },
    // 直接输入文件地址
    editImage() {
      this.$prompt('请输入文件地址', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: this.value
      }).then(({ value }) => {
        this.$emit('input', value)
      }).catch(() => {
      })
    },
    // 预览图片
    previewImage() {
      if (!this.isImage) {
        this.$message.error(`当前类型:${this.type}暂不支持预览哦`)
        return
      }
      this.$alert(`<img src="${this.value}"  style="width:100%;"/>`, '图片预览', {
        dangerouslyUseHTMLString: true,
        customClass: 'img-preview-dialog' // 控制宽度
      })
    }
  }
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

