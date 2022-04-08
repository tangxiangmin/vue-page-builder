<script lang="tsx">

// todo curd template

export default {
  name: 'CurdTemplate',
  props: {
    api: {
      type: Object,
      required: true,
    },
  },
  setup(props: any, contxt: any) {
    const slots = contxt.slots
    const {api} = props
    console.log(api.add)
    return function () {
      return (
          <>
            <el-form inline>
              {
                api.add ? <el-form-item>
                  <el-button v-on:click={api.add}>新建</el-button>
                </el-form-item> : null
              }

            </el-form>
            <el-table border>
              {slots.table()}
            </el-table>
          </>)
    }
  }
}


</script>

<style scoped>

</style>
