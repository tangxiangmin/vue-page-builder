import {uploadService as request, BaseResponse} from '../utils/request'


export function uploadFile(params:any){
  return request.post(params)
}
