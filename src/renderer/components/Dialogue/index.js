import Vue from 'vue'
import DialogueVue from './Dialogue'

const DialogueConstructor = Vue.extend(DialogueVue)

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
    containerEl.appendChild(instance.$el)
    instance.init()
    setTimeout(() => {
      resolve()
    }, duration)
    return instance
  })
}

const install = function (Vue, opts = {}) {
  Vue.prototype.$dialog = Dialogue
}

export default {install, Dialogue, DialogueVue}
