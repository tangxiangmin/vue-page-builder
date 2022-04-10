import axios, {AxiosRequestConfig} from 'axios'

export interface BaseResponse<T> {
  code: number,
  data: T,
  msg: string
}

function createService(config: AxiosRequestConfig) {
  const service = axios.create(config)

  function setHeaderAuthorization(config: AxiosRequestConfig<any>) {
    const accessToken = 'xxx' // todo 替换token
    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`
    }
  }

  service.interceptors.request.use((config) => {
    setHeaderAuthorization(config)
    return config
  })

  service.interceptors.response.use((response) => {
    const {data} = response
    const isInValidCode = data.code && data.code !== 200
    if (!isInValidCode) return data

    // todo show Error
    return Promise.reject(new Error(data.msg || 'error'))
  })

  return service
}



export const editorService = createService({baseURL: 'http://localhost:7001'})
export const uploadService = createService({baseURL: 'http://localhost:7001'})

