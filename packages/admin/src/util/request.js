import axios from 'axios'
// import { authModel } from './storage'
import router from '../router'

function setHeaderAuthorization(config, force = false) {
  // const accessToken = authModel.get()
  // if ((accessToken && !config.headers.Authorization) || force) {
  //   config.headers.Authorization = `Bearer ${accessToken}`
  // }
  return config
}

const errorHandler = {
  401(service, error) {
    router.push({
      name: 'login'
    })
    return Promise.reject(error)
  }
}

function createService(options, autoShowError = true) {
  // 错误提示
  let errorTimer

  function showError(msg) {
    clearTimeout(errorTimer)
    errorTimer = setTimeout(() => {
      if (autoShowError && msg) {
        console.log('request error:', msg)
        // messageBox.toast({msg: msg})
      }
    }, 100)
  }

  const service = axios.create({
    timeout: 10000,
    ...options
  })
  service.cacheRequests = []
  service.interceptors.request.use(config => {
    setHeaderAuthorization(config)
    return config
  })

  service.interceptors.response.use(
    response => {
      const res = response.data
      const isInValidCode = res.code && res.code !== 0
      if (isInValidCode) {
        showError(`${res.msg}`)
        return Promise.reject(res)
      }
      return response.data
    },
    // 响应失败消息提示框抛出异常
    error => {
      if (!error) return Promise.reject(error)
      const { response } = error || {}
      const { status } = response || {}
      const handler = errorHandler[status]

      if (handler) {
        return handler(service, error)
      }
      showError(`${error.message}`)
      return Promise.reject(error)
    }
  )
  return service
}

const service = createService({
  baseURL: `http://127.0.0.1:7001/`
})

export const silenceService = createService({
  baseURL: `http://127.0.0.1:7001/`
}, false)

export default service
