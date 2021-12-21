<template>
  <abstractContainer :config="config"/>
</template>
<script>
import {h} from 'vue'

import abstractContainer from './abstractContainer.vue'

const Hello = {
  name: 'Hello',
  render() {
    return h('div', {}, 'click sd12312me')
  }
}

export default {
  name: "test.vue",
  components: {abstractContainer},
  setup() {

    const data = {
      type: 'div',
      props: {},
      children: [
        {type: Hello},
        {
          type: 'span',
          props: {
            style: {
              color: 'red'
            },
            onClick: () => {
              console.log(12123)
            }
          }, children: ['11123']
        },
      ]
    }

    return {
      config: data
    }
  }
}
</script>

<style scoped>

</style>
