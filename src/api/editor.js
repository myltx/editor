import axios from 'axios'

export function save(allPage) {
  const url = '/Panasign-cloud/editor/save.do'
  const data = JSON.stringify(allPage)
  return axios({
    method: 'post',
    url,
    params: {
      content: data
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}