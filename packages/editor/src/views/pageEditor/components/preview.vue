<template>
  <AbstractContainer :class="{'current-widget':currentWidget===comp}"
                     @click.native="onWidgetClick(comp)"
                     :widget="comp"
                     v-for="comp in widgetList" :key="comp.id"/>
</template>

<script setup>
import {computed, defineProps} from "vue";
import {AbstractContainer} from "@vue-page-builder/preview";
import {usePageEditorStore} from "../../../store/pageEditor";

const props = defineProps({
  config: {
    type: Object,
    require: true
  },
  onWidgetClick: {
    type: Function,
    default: () => {
      return () => {
      }
    }
  }
})

const widgetList = computed(() => {
  const {children} = props.config
  return children
})

const pageEditorStore = usePageEditorStore()
const currentWidget = computed(() => {
  return pageEditorStore.currentWidget
})
</script>

<style scoped>

.current-widget {
  outline: 1px solid red;
}

</style>
