import { onMounted, ref } from "vue";

export function useCurd<T>(api: Function, { immediate = true }: { immediate?: boolean } = {}) {
  const pageSize = ref(10);
  const page = ref(1);


  function _fetch(params: Partial<T> = {} as T) {
    api({ ...params, page: page.value, pageSize: pageSize.value });
  }

  function changeCurrent(val: number) {
    page.value = val;
    _fetch()
  }

  function changeSize(val: number) {
    pageSize.value = val;
    _fetch()
  }


  if (immediate) {
    onMounted(() => {
      _fetch();
    });
  }

  return {
    pageSize,
    page,

    changeCurrent,
    changeSize,
    getList: _fetch
  }
}
