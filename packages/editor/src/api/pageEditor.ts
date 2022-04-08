import {editorService as request, BaseResponse} from '../utils/request'

import {IWidget, IPage} from "../typings";


type ISearchParams = { pageNum: number, pageSize: number }

// 页面
export function addPage(data: IPage) {
  return request.post('/api/page', data)
}

export function editPage(data: IPage) {
  return request.put(`/api/page/${data.id}`, data)
}

export function getPageList(params: ISearchParams) {
  return request.get<any, BaseResponse<{ list: IPage[], total: number }>>(`/api/page`, {params})
}

export function removePage(id: string) {
  return request.delete(`/api/page/${id}`)
}

export function getPageDetail(id: string) {
  return request.get(`/api/page/${id}`)
}

// 组件
export function addWidget(data: IWidget) {
  return request.post<any, BaseResponse<IWidget>>('/api/widget', data)
}

export function removeWidget(id: string) {
  return request.delete(`/api/widget/${id}`)
}

export function editWidget(data: IWidget) {
  return request.put<any, BaseResponse<IWidget>>(`/api/widget/${data.id}`, data)
}

export function getWidgetList(params: ISearchParams) {
  return request.get<any, BaseResponse<{ list: IWidget[], total: number }>>(`/api/widget`, {params})
}

export function getWidgetDetail(id: string) {
  return request.get(`/api/widget/${id}`)
}

// 上传图片
export function uploadImage() {

}
