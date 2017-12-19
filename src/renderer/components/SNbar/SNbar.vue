<template>
  <div id="SNbar">
    <div @click="close">X</div>
    <div class="head-img">
      <img :src="user.head_img" />
    </div>
    <div class="name">{{ user.name }}</div>
    <div @click="sendMsg">发消息</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SNbar',
  data () {
    return {
      searchValue: ''
    }
  },
  computed: {
    ...mapGetters({
      isShow: 'GET_SN_BAR_STATE',
      user: 'GET_USER'
    })
  },
  methods: {
    ...mapActions(['TOGGLE_SN_BAR']),
    close () {
      this.TOGGLE_SN_BAR(false)
    },
    sendMsg () {
      console.log('sendMsg')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
