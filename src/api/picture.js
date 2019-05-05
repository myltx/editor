import axios from 'axios'

export function getPictureProd({pageNo, pageSize}) {
  const url = '/Panasign-cloud/editor/getPictureProd.do'

  const data = Object.assign({}, {
    pageSize: pageSize,
    pageNo: pageNo
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log('发生错误：getPictureProd1：' + err)
  })
}

export function getPictureUpload({pageNo, pageSize}) {
  const url = '/Panasign-cloud/editor/getPictureUpload.do'

  const data = Object.assign({}, {
    pageSize: pageSize,
    pageNo: pageNo
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log('发生错误：getPictureUpload1：' + err)
  })
}

export function uploadPicture(data) {
  const url = '/Panasign-cloud/editor/uploadPicture.do'

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log('发生错误：uploadPicture1：' + err)
  })
}

export function deletePicture(pictureList) {
  const url = '/Panasign-cloud/editor/deletePicture.do'
  const data = new URLSearchParams()
  pictureList.forEach((item) => {
    data.append('id', item.id)
  })
  return axios.post(url, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log('发生错误：deletePicture1：' + err)
  })
}