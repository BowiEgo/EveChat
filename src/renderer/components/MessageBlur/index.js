import Vue from 'vue'
import MessageBlurVue from './MessageBlur'

const MessageBlurConstructor = Vue.extend(MessageBlurVue)

const getAnInstance = () => {
  return new MessageBlurConstructor({
    el: document.createElement('div')
  })
}

const MessageBlur = (options = {}) => {
  return new Promise((resolve, reject) => {
    const rootEl = document.getElementById('app').parentNode
    const containerEl = document.getElementById('app')
    let duration = options.duration || 3000
    let instance = getAnInstance()

    containerEl.style.transition = 'filter ease 0.3s'
    setTimeout(() => {
      containerEl.style.filter = 'blur(4px)'
      rootEl.appendChild(instance.$el)
    }, 300)

    setTimeout(() => {
      resolve()
      rootEl.removeChild(instance.$el)
      containerEl.style.filter = 'initial'
      containerEl.style.transition = 'none'
    }, duration)
  })
}

const install = function (Vue, opts = {}) {
  Vue.prototype.$messageBlur = MessageBlur
}

export default {
  install,
  MessageBlur,
  MessageBlurVue
}
