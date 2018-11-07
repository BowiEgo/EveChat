<template>
  <div class="dialogue-group">
    <dialogue-vue
      v-for="(item, index) in data"
      v-if="!!item"
      :key="index"
      :static="true"
      :show-time-tip="showTimeTipCpu(index)"
      :create-time="item.create_at"
      :type="item.user._id === user._id ? 'right' : 'left'"
      :text="item.text"
      :user="item.user">
    </dialogue-vue>
  </div>
</template>

<script>
import DialogueVue from '../Dialogue/Dialogue.vue'

export default {
  name: 'DialogueGroup',
  data () {
    return {
    }
  },
  components: {
    DialogueVue
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      }
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
  },
  methods: {
    showTimeTipCpu (index) {
      if (index === 0) {
        return true
      } else {
        const lastD = this.data[index - 1]
        if (!lastD.create_at) {
          return true
        }
        const curD = this.data[index]
        return (curD.create_at - lastD.create_at) > 60 * 1000
      }
    }
  }
}
</script>

<style scoped>

</style>
