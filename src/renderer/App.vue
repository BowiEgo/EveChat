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
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar{
  width: 2px;
  /* display: none; */
}
::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background: rgba(201, 201, 201, 0.3);
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
