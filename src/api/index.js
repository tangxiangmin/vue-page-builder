import request from '@/util/request'

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

  // return Promise.resolve({
  //   code: 200,
  //   data: {
  //     id: 1,
  //     content: JSON.stringify({
  //       'type': 'pure',
  //       'config': {},
  //       'children': [
  //         // {
  //         //   name: '容器',
  //         //   type: 'div',
  //         //   configType: 'CustomContainerConfig',
  //         //   id: '',
  //         //   config: {
  //         //     'click': {
  //         //       'type': '',
  //         //       'args': '',
  //         //       'logType': '',
  //         //       'logParams': ''
  //         //     },
  //         //     style: {
  //         //       height: '200px',
  //         //       background: 'red'
  //         //     }
  //         //   },
  //         //   children: [
  //         //     {
  //         //       name: '文字',
  //         //       type: 'CustomText',
  //         //       configType: 'CustomTextConfig',
  //         //       config: {
  //         //         id: '',
  //         //         content: 'hello'
  //         //         // absolute: true,
  //         //         // style: { position: 'absolute', zIndex: 99 }
  //         //       }
  //         //     },
  //         //     {
  //         //       name: '容器',
  //         //       type: 'div',
  //         //       configType: 'CustomContainerConfig',
  //         //       config: {
  //         //         'id': '',
  //         //         'click': {
  //         //           'type': '',
  //         //           'args': '',
  //         //           'logType': '',
  //         //           'logParams': ''
  //         //         },
  //         //         children: [
  //         //
  //         //         ],
  //         //         style: {
  //         //           height: '50px',
  //         //           background: 'blue'
  //         //         }
  //         //       }
  //         //     }
  //         //   ]
  //         // },
  //         // {
  //         //   name: '容器1',
  //         //   type: 'div',
  //         //   configType: 'CustomContainerConfig',
  //         //   config: {
  //         //     'id': '',
  //         //     'click': {
  //         //       'type': '',
  //         //       'args': '',
  //         //       'logType': '',
  //         //       'logParams': ''
  //         //     },
  //         //     style: {
  //         //       height: '100px',
  //         //       background: '#dedede'
  //         //     }
  //         //   },
  //         //   children: []
  //         // }
  //
  //         // {
  //         //   'name': '图片',
  //         //   'type': 'CustomImage',
  //         //   'configType': 'CustomImageConfig',
  //         //   'config': {
  //         //     'id': '',
  //         //     'click': {
  //         //       'type': '',
  //         //       'args': '',
  //         //       'logType': '',
  //         //       'logParams': ''
  //         //     },
  //         //     'src': '/img/logo.82b9c7a5.png',
  //         //     'style': {}
  //         //   }
  //         // }
  //       ]
  //     })
  //   }
  // })
}

// 上传图片
export function uploadImage() {

}
