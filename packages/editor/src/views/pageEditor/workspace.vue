<template>
  <div v-if="page" class="page">
    <div class="mb-20px">
      <el-button type="primary" @click="savePage">
        保存页面
      </el-button>
      <el-button @click="undo">撤销</el-button>
      <el-button @click="redo">重做</el-button>
    </div>
    <div class="flex">
      <div class="w-360px">
        <el-tabs type="card" modelValue="1">
          <el-tab-pane label="控件列表" name="1">
            <div v-for="group in widgetList" :key="group.title" class="cell-group">
              <div class="cell-group_tt">
                {{ group.title }}
              </div>
              <div class="cell-group_bd">

                <div v-for="item in group.list" :key="item.label" class="cell" @click="createWidget(item)">
                  {{ item.label }}
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="结构树" name="2">
            <widgetTree v-if="page" :list="page.content.children" :recordAction="recordAction"/>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="flex-1 flex justify-center">
        <div class="mobile">
          <previewMobile :config="page.content" :onWidgetClick="chooseWidget"/>
        </div>
      </div>
      <div class="w-500px">
        <el-tabs type="card" modelValue="1">
          <el-tab-pane label="控件配置项" name="1">
            <div v-if="currentWidget" :key="currentWidget.id">
              <el-form label-width="100px">
                <el-alert title="控件配置" style="margin-bottom: 10px" :closable="false"/>
                <RemoteWidgetConfig :config="currentWidget.config"></RemoteWidgetConfig>
              </el-form>
            </div>
            <template v-else>
              <div>请选择一个控件</div>
            </template>
          </el-tab-pane>
          <el-tab-pane label="页面配置项" name="2">
            todo 页面配置
          </el-tab-pane>
          <el-tab-pane label="JSON" name="3">
            <pre class="text-12px">
{{page}}
            </pre>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from 'vue-router'

import {usePageEditorStore} from "../../store/pageEditor";

import {createWidgetFromRemote, widgetList as localWidgetList} from "./core/widget";

import previewMobile from './preview.vue'
import widgetTree from './components/widgetTree.vue'

import RemoteWidgetConfig from './components/remoteWidgetConfig.vue'

import BaseWidget from "./core/baseWidget";
import {addPage, editPage} from "../../api/pageEditor";
import {ElMessage} from "element-plus";

const pageEditorStore = usePageEditorStore()
const route = useRoute()
const router = useRouter()

const id = route.query.id as string

const page = ref({
  name: '',
  type: 'pure',
  content: {
    children: []
  }
})

const widgetList = ref<{ title: string, list: any[] }[]>([...localWidgetList])

const currentWidget = computed(() => {
  return pageEditorStore.currentWidget
})

async function getPageDetail() {
  page.value = await pageEditorStore.getPageDetail(id)
  recordAction()
}

async function getRemoteWidgetList() {
  const {list} = await pageEditorStore.getWidgetList()
  const ans = list.filter(row => row.postfix === 'vue').map(row => {
    return createWidgetFromRemote(row)
  })
  widgetList.value.push({title: '远程控件', list: ans})
}


function recordAction() {
  pageEditorStore.recordAction(page.value)
}

async function redo() {
  const data = await pageEditorStore.redo()
  if (data) {
    page.value = data
  }
}

async function undo() {
  const data = await pageEditorStore.undo()
  if (data) {
    page.value = data
  }
}

function createWidget(Widget: typeof BaseWidget) {
  const widget = new Widget()
  // @ts-ignore
  page.value.content.children.push(widget)
  pageEditorStore.setCurrentWidget(widget)
  recordAction()
}

function chooseWidget(widget: BaseWidget) {
  pageEditorStore.setCurrentWidget(widget)
}

async function savePage() {
  const params = {
    ...page.value,
    content: JSON.stringify(page.value.content),
  }
  console.log(params)

  await editPage(params)

  ElMessage.success('操作成功')
}

onMounted(() => {
  if (id) {
    getPageDetail()
  }

  getRemoteWidgetList()
})

</script>

<style scoped lang="scss">
.mobile {
  width: 375px;
  height: 667px;
  border: 1px solid #000;
  transform: translateX(0);
}

.cell-group {
  margin-bottom: 20px;

  &_tt {
    font-size: 16px;
    margin-bottom: 10px;
  }

  &_bd {
    overflow: hidden;
  }
}

.cell {
  float: left;
  width: 150px;

  margin-right: 30px;
  margin-bottom: 20px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  border: 1px dashed #333;
  color: #333;
  text-align: center;
  cursor: pointer;
}


</style>
