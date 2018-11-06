import Vue from 'vue'
import DialogueVue from './Dialogue'

const DialogueConstructor = Vue.extend(DialogueVue)

let uid = 0

function getElementsByAttr (elArr, attr, value) {
  var aEle = []
  for (var i = 0, len = elArr.length; i < len; i++) {
    if (elArr[i].getAttribute(attr) === String(value)) {
      aEle.push(elArr[i])
    }
  }
  return aEle
}

const getAnInstance = () => {
  return new DialogueConstructor({
    el: document.createElement('div')
  })
}

const Dialogue = (options = {}) => {
  return new Promise((resolve, reject) => {
    const containerEl = document.getElementById('dialogue')
    let duration = options.duration || 0
    let instance = getAnInstance()
    instance.text = options.text
    instance.type = options.type
    instance.user = options.user
    instance.$el.setAttribute('uid', ++uid)
    containerEl.appendChild(instance.$el)
    instance.init()
    setTimeout(() => {
      resolve(uid)
    }, duration)
    return instance
  })
}

const Destroy = (uid) => {
  let containerEl = document.getElementById('dialogue')
  let elArr = getElementsByAttr(containerEl.getElementsByClassName('dialogue-bubble'), 'uid', uid)
  elArr.forEach(item => {
    containerEl.removeChild(item)
  })
}

const install = function (Vue, opts = {}) {
  Vue.prototype.$dialog = Dialogue
  Vue.prototype.$destroyDialog = Destroy
}

export default {
  install,
  Dialogue,
  DialogueVue
}
