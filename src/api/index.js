// todo api 接入
export function addPage() {

}

export function editPage() {

}

export function getPageList() {
  return Promise.resolve({
    code: 200, data: {
      list: [
        { id: 1, name: 'test' }
      ]
    }
  })
}

export function removePage() {

}

export function getPageDetail() {
  return Promise.resolve({
    code: 200,
    data: {
      id: 1,
      content: JSON.stringify({
        'type': 'pure',
        'config': {},
        'children': [
          {
            'name': '图片',
            'type': 'CustomImage',
            'configType': 'CustomImageConfig',
            'config': {
              'id': '',
              'click': {
                'type': '',
                'args': '',
                'logType': '',
                'logParams': ''
              },
              'src': '/img/logo.82b9c7a5.png',
              'style': {}
            }
          }
        ]
      })
    }
  })
}

// 上传图片
export function uploadImage() {

}
