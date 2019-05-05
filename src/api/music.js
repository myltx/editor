import axios from 'axios'

export function getMusicProd({pageNo, pageSize}) {
  const url = '/Panasign-cloud/editor/getMusicProd.do'

  const data = Object.assign({}, {
    pageSize: pageSize,
    pageNo: pageNo
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log('发生错误：getMusicProd1：' + err)
  })
}

export function getMusicUpload({pageNo, pageSize}) {
  const url = '/Panasign-cloud/editor/getMusicUpload.do'

  const data = Object.assign({}, {
    pageSize: pageSize,
    pageNo: pageNo
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log('发生错误：getMusicUpload1：' + err)
  })
}

export function uploadMusic(data, progress) {
  const url = '/Panasign-cloud/editor/uploadMusic.do'

  return axios.post(url, data, {
    onUploadProgress: progress
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log('发生错误：uploadMusic1：' + err)
  })
}

export function deleteMusic(music) {
  const url = '/Panasign-cloud/editor/deleteMusic.do'

  const data = new URLSearchParams()
  data.append('id', music.id)

  return axios.post(url, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log('发生错误：deleteMusic1：' + err)
  })
}