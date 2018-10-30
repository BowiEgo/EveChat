<template>
  <div id="settingBar">
    <button @click="handleLogout">退出</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SettingBar',
  computed: {
    ...mapGetters({
      chatRooms: 'GET_CHAT_ROOMS'
    })
  },
  methods: {
    handleLogout () {
      console.log('handleLogout')
      this.$socketIO.close().then(res => {
        this.$router.push({
          name: 'login'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#settingBar {
  padding: 16px;
  overflow-y: scroll;
  height: 100vh;
}
</style>
