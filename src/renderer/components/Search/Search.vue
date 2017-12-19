<template>
  <div class="search">
    <input type="text/plain" v-model="searchValue" @keyup.enter="submit">
    <div class="placeholder">
      <span></span>
      <span class="text">search</span>
    </div>
    <!-- <button class="submit-btn" @click="search">search</button> -->
  </div>
</template>

<script>
// import * as api from '@/api'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Search',
  data () {
    return {
      searchValue: ''
    }
  },
  computed: {
    ...mapState(['user', 'chatRoom']),
    ...mapGetters({
      chatRoomList: 'GET_CHAT_ROOM',
      chatRoomActived: 'GET_ACTIVED_CHAT_ROOM'
    })
  },
  methods: {
    ...mapActions(['TOGGLE_SN_BAR']),
    submit () {
      this.TOGGLE_SN_BAR(true)
      // api.u.search({username: this.searchValue}).then(res => {
      //   console.log(res)
      // })
    }
  }
}
</script>

<style lang="scss" scoped>

.search {
  position: relative;
  margin: 10px auto;
  border-radius: 3px;
  background-color: #fff;
}

input {
  width: 100%;
  height: 30px;
  border: none;
  padding: 4px 10px;
  z-index: 1;
  background-color: transparent;
}

.placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  pointer-events: none;
  .text {
    color: #e0e2e4;
    font-size: 12px;
    z-index: 0;
  }
}

// .submit-btn {
//   width: 30px;
//   height: 30px;
//   border: none;
//   border-radius: 3px;
//   background-color: #5abdea;
//   color: #fff;
// }

</style>
