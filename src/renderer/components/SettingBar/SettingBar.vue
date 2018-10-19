<template>
  <div id="settingBar">
    <button @click="handleLogout">退出</button>
  </div>
</template>

<script>
export default {
  name: 'SettingBar',

  methods: {
    handleLogout () {
      console.log('handleLogout')
      // disconnectSocket()
      this.$router.push({
        name: 'login'
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
