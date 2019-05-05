export function createOnlyId({list, perfix, len}) {
  let index
  let id
  do {
    let random = getRandomInt(len)
    id = perfix ? perfix + random : random
    index = list.findIndex((item) => {
      return item.id === id
    })
  }
  while (index >= 0)
  return id
}

function getRandomInt(len) {
  const max = Math.pow(10, len + 1) - 1
  const min = Math.pow(10, len)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function debounce(func, delay) {
  let timer

  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}