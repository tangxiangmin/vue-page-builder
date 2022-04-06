<template>
  <div v-if="page" class="page">
    <div class="mb-20px">
      <el-button type="primary" @click="savePage">
        保存页面
      </el-button>
    </div>
    <div class="flex">
      <div class="w-300px">
        <el-tabs type="card" value="1">
          <el-tab-pane label="组件列表" name="1">
            <div v-for="group in componentList" :key="group.title" class="cell-group">
              <div class="cell-group_tt">
                {{ group.title }}
              </div>
              <div class="cell-group_bd">

                <div v-for="item in group.list" :key="item.label" class="cell">
                  {{ item.label }}
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="结构树" name="2">
            <widgetTree v-if="page" :list="page.content.children"/>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="flex-1 flex justify-center">
        <div class="mobile">
          <previewMobile :config="page.content"/>
        </div>
      </div>
      <div class="page_config config">
        <el-tabs type="card" value="1">
          <el-tab-pane label="控件配置项" name="1">
            <!--            <div v-if="currentComponent" :key="currentComponent.id">-->
            <!--              <el-form label-width="100px">-->
            <!--                <el-alert title="控件配置" style="margin-bottom: 10px" :closable="false"/>-->
            <!--                <component :is="currentComponent.configType" :config="currentComponent.config"/>-->

            <!--                <commonConfig :config="currentComponent.config"/>-->
            <!--              </el-form>-->
            <!--            </div>-->
            <!--            <template v-else>-->
            <!--              <div>请选择一个控件</div>-->
            <!--            </template>-->
          </el-tab-pane>
          <el-tab-pane label="页面配置项" name="2">
            <!--            <pageConfig :page="page" />-->
          </el-tab-pane>
          <el-tab-pane label="JSON" name="3">
            <!--            <v-jsoneditor :key="Math.random()" :value="page" :plus="false" height="60vh" />-->
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from 'vue-router'
import {usePageEditorStore} from "../../store/pageEditor";

import previewMobile from './preview.vue'
import widgetTree from './components/widgetTree.vue'

const pageStore = usePageEditorStore()
const route = useRoute()

const id = route.query.id as string

const page = ref(null)
const currentComponent = ref(null)
const componentList = ref([])

async function getPageDetail() {
  page.value = await pageStore.getPageDetail(id)
  console.log(page.value)
}

onMounted(() => {
  getPageDetail()

})

function savePage() {

}

function confirmSavePage() {

}
</script>

<style scoped lang="scss">
.mobile {
  width: 375px;
  height: 667px;
  border: 1px solid #000;
}

</style>
