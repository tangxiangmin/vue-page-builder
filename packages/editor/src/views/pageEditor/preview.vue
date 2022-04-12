<template>
  <AbstractContainer :class="{'current-widget':currentWidget===comp}"
                     @click.native="onWidgetClick(comp)"
                     :config="comp"
                     v-for="comp in config.children" :key="comp.id"/>
</template>

<script setup>
import {computed, defineProps} from "vue";
import {AbstractContainer} from "@vue-page-builder/preview";
import {usePageEditorStore} from "../../store/pageEditor";

defineProps({
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
