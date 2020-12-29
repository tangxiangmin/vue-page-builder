<template>
  <div>
    <div class=" page">
      <div class="page_hd">
        <el-button type="primary" @click="savePage">
          保存页面
        </el-button>
      </div>
      <div class="page_bd">
        <div class="page_sd side">
          <div v-for="group in componentList" :key="group.title" class="cell-group">
            <div class="cell-group_tt">
              {{ group.title }}
            </div>
            <div class="cell-group_bd">
              <draggable
                :list="group.list"
                ghost-class="ghost"
                :options="{group:{name: 'page',pull:'clone',put:false},sort: false}"
              >
                <div v-for="item in group.list" :key="item.name" class="cell">
                  {{ item.name }}
                </div>
              </draggable>
            </div>
          </div>
        </div>
        <div class="page_mn main">
          <div class="device-config">
            <el-button @click="isDraggable =!isDraggable">
              {{ isDraggable ? '禁止拖放' : '开启拖放' }}
            </el-button>
            <el-button @click="isFixedMode =!isFixedMode">
              {{ isFixedMode ? '固定模式' : '滚动模式' }}
            </el-button>
          </div>
          <div class="mobile" :class="{'mobile-fixed': isFixedMode}" :style="page.style">
            <div class="mobile_content">
              <draggable
                :options="{group:{name: 'page', pull: 'clone'}, disabled: !isDraggable}"
                :list=" page.children"
                :move="checkMove"
                class="widget-list"
                ghost-class="ghost"
                @add="handleWidgetAdd"
                @change="changeOrder"
              >
                <abstractContainer
                  v-for="(item, index) in normalChildren"
                  :key="index"
                  class="widget"
                  :class="{'widget-selected': currentComponent === item}"
                  :is-active=" currentComponent === item"
                  :widget="item"
                  @click.native="chooseComponent(item)"
                />
              </draggable>
            </div>
            <!--模拟fixed-->
            <abstractContainer
              v-for="(item, index) in fixedChildren"
              :key="index"
              :widget="item"
              :class="{'widget-selected': currentComponent === item}"
              :is-active=" currentComponent === item"
              @click.native="chooseComponent(item)"
            />
          </div>
        </div>
        <div class="page_config config">
          <el-tabs type="card" value="1">
            <el-tab-pane label="控件配置项" name="1">
              <template v-if="currentComponent">
                <el-form label-width="80px">
                  <el-alert title="控件配置" style="margin-bottom: 10px" :closable="false" />
                  <component :is="currentComponent.configType" :config="currentComponent.config" />

                  <commonConfig :config="currentComponent.config" />
                  <el-form-item label="操作">
                    <el-button type="danger" @click="removeWidget">
                      删除控件
                    </el-button>
                  </el-form-item>
                </el-form>
              </template>
              <template v-else>
                <div>请选择一个控件</div>
              </template>
            </el-tab-pane>
            <el-tab-pane label="页面配置项" name="2">
              <pageConfig :page="page" />
            </el-tab-pane>
            <el-tab-pane label="JSON" name="3">
              <v-jsoneditor :key="Math.random()" :value="page" :plus="false" height="60vh" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogSaveVisible" title="保存课程">
      <v-jsoneditor v-model="pageJSON" :plus="false" height="60vh" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSaveVisible = false">
          取 消
        </el-button>
        <el-button type="primary" @click="confirmSavePage">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VJsoneditor from 'v-jsoneditor/src/index'
import draggable from 'vuedraggable'

import { componentList, createTemplate } from './core/config'
import './core/registerComponent'

import abstractContainer from './components/abstractContainer'
import commonConfig from '@/views/editor/components/commonConfig'
import pageConfig from '@/views/editor/components/pageConfig'

export default {
  name: 'Editor',
  components: { VJsoneditor, draggable, abstractContainer, commonConfig, pageConfig },
  data() {
    return {
      componentList,
      page: createTemplate(),
      isFixedMode: true,
      isDraggable: true,
      dialogSaveVisible: false,
      pageJSON: ''
    }
  },
  computed: {
    pageDetail() {
      return this.$store.state.editor.pageDetail
    },
    currentComponent() {
      return this.$store.state.editor.currentComponent
    },
    normalChildren() {
      return this.page.children.filter(item => item.config && item.config.style.position !== 'fixed')
    },
    fixedChildren() {
      return this.page.children.filter(item => item.config && item.config.style.position === 'fixed')
    }
  },
  created() {
    this.initPage()
  },
  methods: {
    initPage() {
      this.$store.dispatch('editor/getPageDetail', { id: this.$route.query.id }).then(() => {
        let page = createTemplate()
        if (!this.pageDetail) return page
        try {
          page = JSON.parse(this.pageDetail.content)
        } catch (e) {
          console.log(e)
        }
        this.page = page
      })
    },
    checkMove() {

    },
    changeOrder(e) {
      console.log(e)
      // if (e.moved) {
      //   const { element, oldIndex, newIndex } = e.moved
      //   console.log(this.page.children)
      // }
    },
    chooseComponent(item) {
      this.$store.commit('editor/setCurrentComponent', item)
    },
    // 增加页面widget
    handleWidgetAdd(e) {
      const { newIndex, originalEvent } = e

      const item = this.page.children[newIndex]
      const widget = { ...item, config: item.getTemplate() }
      if (widget.type === 'text') {
        // widget.type = 'span'
        widget.config.style.top = originalEvent.offsetY
      }
      this.page.children.splice(newIndex, 1, widget)
    },
    removeWidget() {
      const { currentComponent } = this
      const index = this.page.children.indexOf(currentComponent)
      this.$confirm('是否确认移除当前组件').then(() => {
        this.page.children.splice(index, 1)
      }).catch(() => {
      })
    },
    savePage() {
      this.dialogSaveVisible = true
      this.pageJSON = { ...this.page }
    },
    confirmSavePage() {
      const payload = {
        ...this.pageDetail,
        content: JSON.stringify(this.pageJSON)
      }

      this.dialogSaveVisible = false
      this.$store.dispatch('editor/editPage', payload).then(() => {
        this.$message.success('保存成功')
      })
    }
  }
}
</script>

<style scoped lang="scss">

.mobile {
  transform: translateX(0); // 处理容器中的fixed样式
  width: 375px;
  margin: 0 auto;
  border: 1px solid #000;
  box-sizing: content-box;

  &-fixed {
    height: 667px;
  }

  &_content {
    transform: translateX(0); // 处理容器中的fixed样式

    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    /*滚动条的轨道*/
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, .3);
      background-color: #ccc;
    }

    /*滚动条的滑块按钮*/
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #bbb;
      box-shadow: inset 0 0 5px #000;
    }

    /*滚动条的上下两端的按钮*/
    &::-webkit-scrollbar-button {
      height: 10px;
      background-color: #333;
    }

    &::-webkit-scrollbar {
      width: 2px;
      height: 15px;
      background-color: #ccc;
    }

  }
}

.ghost {
  background-color: #ccc;
  height: 100px;
  text-align: center;
  line-height: 100px;
}

.page {
  &_hd {
    padding: 10px 20px;
    border-bottom: 1px solid #dedede;
  }

  &_bd {
    display: flex;
    align-items: flex-start;
    height: calc(100vh);
  }

  &_sd {
    width: 400px;
    padding: 20px;
    height: 100%;

  }

  &_config {
    padding: 20px;

    width: 40%;
    height: 100%;
    overflow: auto;
  }

  &_mn {
    min-width: 400px;
    box-sizing: border-box;
    padding: 20px 0;

    border-right: 1px solid #dedede;
    border-left: 1px solid #dedede;
    flex: 1;
    height: 100%;
    overflow: auto;
  }
}

.side {
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

}

.device-config {
  margin-bottom: 20px;
  text-align: center;
}

.widget {
  &-selected {
    //transform: scale(0.98);
    //transition: transform linear .3s;
    outline: 1px solid #ff0000;
  }
}
</style>
