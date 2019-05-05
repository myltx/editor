function $(el) {
  return Array.prototype.slice.call(document.querySelectorAll(el))
}

function animationTime(animation) {
  return (animation.duration + animation.delay) * 1000 * animation.count
}

function clearAnimation(el) {
  el.style.animation = ''
}
export function previewAnimation(id, animation) {
  let el = $(`.${id} .element-content`)[0]
  if (!el) {
    return
  }
  if (el.style.animation) {
    clearAnimation(el)
  }
  setTimeout(() => {
    el.style.animation = `${animation.name} ${animation.duration}s ${animation.timing} ${animation.delay}s ${animation.count}`
    if (el.timer) {
      clearTimeout(el.timer)
    }
    // 在元素上绑定计时器，那么就不会影响到其他元素清除动画
    el.__timer__ = setTimeout(() => {
      clearAnimation(el)
    }, animationTime(animation))
  }, 20)
}

export function previewAnimations(id, animations) {
  let el = $(`.${id} .element-content`)[0]
  if (!el) {
    return
  }
  let executionTime = 0
  animations.forEach((animation) => {
    setTimeout(() => {
      previewAnimation(id, animation)
    }, executionTime)
    executionTime = animationTime(animation) + executionTime
  })
  setTimeout(() => {
    clearAnimation(el)
  }, executionTime)
}

function playAnimation(id, animation) {
  let elements = $(`.${id} .element-content`)
  if (elements.length === 0) {
    return
  }
  elements.forEach((element) => {
    if (element.style.animation) {
      clearAnimation(element)
    }
    setTimeout(() => {
      element.style.animation = `${animation.name} ${animation.duration}s ${animation.timing} ${animation.delay}s ${animation.count}`
    }, 20)
  })
}

export function playAnimations(id, animations) {
  let executionTime = 0
  animations.forEach((animation) => {
    setTimeout(() => {
      playAnimation(id, animation)
    }, executionTime)
    executionTime = animationTime(animation) + executionTime
  })
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function removeClass(el, className) {
  let newClass = el.className.split(' ')
  let index = newClass.findIndex((cl) => {
    return cl === className
  })
  if (index < 0) {
    return
  }
  newClass.splice(index, 1)
  el.className = newClass.join(' ')
}