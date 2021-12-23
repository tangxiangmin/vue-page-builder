<template>
  <div v-if="page" class=" page">
    <div class="page_hd">
      <el-button type="primary" @click="savePage">
        保存页面
      </el-button>
      <el-popover
        placement="top-start"
        trigger="hover"
        title="快捷方式"
        class="shortcut-tip"
      >
        <i slot="reference" class="el-icon-warning-outline" />
        <div class="shortcut">
          <div v-for="item in shortcutList" :key="item.key" class="shortcut_item">
            <strong>{{ item.key }} </strong> : {{ item.desc }}
          </div>
          <div class="shortcut_item">
            <strong>鼠标右键选中</strong>： 复制和删除
          </div>
        </div>
        <div />
      </el-popover>
    </div>
    <div class="page_bd">
      <div class="page_sd side">
        <el-tabs type="card" value="1">
          <el-tab-pane label="组件列表" name="1">
            <div v-for="group in componentList" :key="group.title" class="cell-group">
              <div class="cell-group_tt">
                {{ group.title }}
              </div>
              <div class="cell-group_bd">
                <draggable
                  :list="group.list"
                  ghost-class="ghost"
                  :clone="cloneWidget"
                  :options="{group:{name: 'page',pull:'clone',put:false},sort: false}"
                  @start="startAdd"
                  @end="endAdd"
                >
                  <div v-for="item in group.list" :key="item.label" class="cell">
                    {{ item.label }}
                  </div>
                </draggable>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="结构树" name="2">
            <widgetTree v-if="page" :list="page.children" />
          </el-tab-pane>
        </el-tabs>
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
          <previewIframe :page-data="page" />
          <!--          <rootContainer :list="page.children" :root="true" :disabled="false" />-->
        </div>
      </div>
      <div class="page_config config">
        <el-tabs type="card" value="1">
          <el-tab-pane label="控件配置项" name="1">
            <div v-if="currentComponent" :key="currentComponent.id">
              <el-form label-width="100px">
                <el-alert title="控件配置" style="margin-bottom: 10px" :closable="false" />
                <component :is="currentComponent.configType" :config="currentComponent.config" />

                <commonConfig :config="currentComponent.config" />
              </el-form>
            </div>
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
import hotkeys from 'hotkeys-js'

import './core/registerComponent'

import abstractContainer from './components/abstractContainer'
import commonConfig from './common/commonConfig'
import pageConfig from './common/pageConfig'
import previewIframe from './previewIframe'

import { componentList, Page } from './core/widget'

import rootContainer from './common/rootContainer'
import widgetTree from './common/widgetTree'
import eventBus, { ACTION_RECORD } from './core/eventBus'

export default {
  name: 'Editor',
  components: { previewIframe, widgetTree, rootContainer, VJsoneditor, draggable, abstractContainer, commonConfig, pageConfig },
  data() {
    return {
      page: null,
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
    componentList() {
      const list = [...componentList]
      list.push({
        title: '用户UI组件',
        list: this.$store.state.widget.widgetList
      })

      return list
    },
    normalChildren() {
      return this.page.children.filter(item => item.config && item.config.style.position !== 'fixed')
    },
    fixedChildren() {
      return this.page.children.filter(item => item.config && item.config.style.position === 'fixed')
    },
    shortcutList() {
      return [
        {
          key: 'command+z',

          desc: '撤销',
          handler: (e) => {
            this.undo()
            e.preventDefault()
          }
        },
        {
          key: 'command+shift+z',
          desc: '重做',
          handler: (e) => {
            this.redo()
            e.preventDefault()
          }
        },
        {
          key: 'command+s',
          desc: '保存',
          handler: (e) => {
            this.savePage()
            e.preventDefault()
          }
        }
      ]
    }
  },
  beforeDestroy() {
    this.unbindHotkeys()
    this.offEventBus()
  },
  created() {
    this.initPage()
    this.initShortcut()
    this.initEventBus()
    this.$store.dispatch('widget/getWidgetList')
  },
  methods: {
    initEventBus() {
      eventBus.$on(ACTION_RECORD, this.recordAction)

      this.offEventBus = () => {
        eventBus.$off(ACTION_RECORD, this.recordAction)
      }
    },
    initPage() {
      this.$store.dispatch('editor/getPageDetail', { id: this.$route.query.id }).then(() => {
        const page = new Page()

        if (this.pageDetail) {
          page.initFromJSON(this.pageDetail.content)
        }

        this.page = page
        this.recordAction()
      })
    },
    initShortcut() {
      this.shortcutList.forEach(({ key, handler }) => {
        hotkeys(key, handler)
      })

      this.unbindHotkeys = () => {
        this.shortcutList.forEach(({ key, handler }) => {
          hotkeys.unbind(key, handler)
        })
      }
    },

    // 历史操作
    recordAction() {
      this.$store.dispatch('editor/recordAction', this.page)
    },
    undo() {
      this.$store.dispatch('editor/undo').then(data => {
        if (data) {
          this.page = data
        }
      })
    },
    redo() {
      this.$store.dispatch('editor/redo').then(data => {
        if (data) {
          this.page = data
        }
      })
    },

    // 页面交互
    startAdd() {
      this.$store.commit('editor/setAddStatus', true)
    },
    endAdd() {
      this.$store.commit('editor/setAddStatus', false)
    },
    cloneWidget(Widget) {
      if (Widget.custom) {
        return Widget.create()
      }
      return new Widget()
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
  min-height: 667px;
  margin: 0 auto;
  border: 1px solid #000;
  box-sizing: content-box;
  background: url('../../assets/transparent.png') repeat;

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

.page {
  height: 100vh;
  box-sizing: border-box;
  $header-height: 61px;
  &_hd {
    height: $header-height;
    box-sizing: border-box;
    padding: 10px 20px;
    border-bottom: 1px solid #dedede;
  }

  &_bd {
    display: flex;
    align-items: flex-start;
    height: calc(100vh - #{$header-height});
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

</style>
