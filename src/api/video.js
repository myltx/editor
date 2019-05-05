import axios from 'axios'

export function getVideoUpload({pageNo, pageSize}) {
  const url = '/Panasign-cloud/editor/getVideoUpload.do'

  const data = Object.assign({}, {
    pageNo,
    pageSize
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log('发生错误：getVideoUpload1：' + err)
  })
}

export function uploadVideo(data, progress) {
  const url = '/Panasign-cloud/editor/uploadVideo.do'

  return axios.post(url, data, {
    onUploadProgress: progress
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log('发生错误：uploadPicture1：' + err)
  })
}

export function deleteVideo(videoList) {
  const url = '/Panasign-cloud/editor/deleteVideo.do'
  const data = new URLSearchParams()
  videoList.forEach((item) => {
    data.append('id', item.id)
  })
  return axios.post(url, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log('发生错误：deleteVideo1：' + err)
  })
}