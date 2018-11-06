<template>
  <div id="settingBar">
    <div class="quit" @click="handleLogout">退出</div>
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
.quit {
  width: 100%;
  height: 40px;
  background-color: #969696;
  color: #fff;
  line-height: 40px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #5abdea;
  }
}
</style>
