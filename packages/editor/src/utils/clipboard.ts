import ClipboardJS from "clipboard";
import {ElMessage} from "element-plus";

export function useClipboard(url: string) {
  const fakerBtn = document.createElement('button')

  const clipboard = new ClipboardJS(fakerBtn, {
    text: () => url,
  })

  clipboard.on('success', function () {
    ElMessage.success(`复制成功 ${url}`)
  })

  clipboard.on('error', function () {
    ElMessage.error(`复制失败，请手动复制`)
  })

  return {
    clipboard,
    copy() {
      fakerBtn.click()
    }
  }
}

