import request from '@/util/request'

// 页面
export function addPage(data) {
  return request.post('/api/page', data)
}

export function editPage(data) {
  return request.put(`/api/page/${data.id}`, data)
}

export function getPageList(params) {
  return request.get(`/api/page`, { params })
}

export function removePage(id) {
  return request.delete(`/api/page/${id}`)
}

export function getPageDetail(id) {
  return request.get(`/api/page/${id}`)
}

// 组件
export function addWidget(data) {
  return request.post('/api/widget', data)
}

export function getWidgetList(params) {
  return request.get(`/api/widget`, { params })
}

// 上传图片
export function uploadImage() {

}
