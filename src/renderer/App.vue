<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'test',
  mounted () {
    this.test()
  },
  methods: {
    test () {
      console.log('test')
      // this.$socketIO.createChatIO('5a2f901c4d6e97242e65b650', '5bc99621dbd6c82bc45d86e3')
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
  margin: 0;
}

li {
  list-style: none;
}

input {
  outline: none;
}
</style>
