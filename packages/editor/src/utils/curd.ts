import {onMounted, ref, UnwrapRef} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";

type CurdApi<T> = {
  getList?: (params: { page: number, pageSize: number, [prop: string]: any }) => Promise<{ total: number, list: T[] }>,
  add?: Function,
  edit?: Function,
  remove?: Function
}

type CurdOptions<T> = {
  immediate?: boolean,
  api: CurdApi<T>,
  createTemplateRow: () => T,
  isTemplateRow: (row: T) => boolean,
}


export function useCurd<T>(options: CurdOptions<T>) {
  const {api, immediate = true, createTemplateRow, isTemplateRow} = options

  const pageSize = ref<number>(10);
  const page = ref<number>(1);

  const list = ref<T[]>([])
  const total = ref<number>(0)

  const formDialogVisible = ref<boolean>(false)
  const currentRow = ref<T>(createTemplateRow())

  async function getList(params: Partial<T> = {} as T) {
    if (!api.getList) return
    const {total: totalNum, list: data} = await api.getList({...params, page: page.value, pageSize: pageSize.value});
    list.value = data as UnwrapRef<T[]>
    total.value = totalNum
  }

  async function changeCurrent(val: number) {
    page.value = val;
    await getList()
  }

  async function changeSize(val: number) {
    pageSize.value = val;
    await getList()
  }

  function onAddClick() {
    showEditDialog(createTemplateRow())
  }

  function onEditClick(row: T) {
    showEditDialog(row)
  }

  async function onRemoveClick(row: T) {
    if (!api.remove) return
    await ElMessageBox.confirm('确认删除')
    await api.remove(row)
    await getList()
  }

  function showEditDialog(row: T) {
    formDialogVisible.value = true
    currentRow.value = row as UnwrapRef<T>
  }

  async function onDialogSaveClick() {
    let handler = isTemplateRow(currentRow.value as T) ? api.edit : api.add
    if (handler) {
      await handler(currentRow.value)
      await getList()
      ElMessage.success('操作成功')
    }

    formDialogVisible.value = false
  }


  if (immediate) {
    onMounted(() => {
      getList();
    });
  }

  return {
    pageSize, page, list, total,

    changeCurrent, changeSize,
    getList,
    currentRow, formDialogVisible,
    onAddClick, onEditClick, onRemoveClick, onDialogSaveClick
  }
}
