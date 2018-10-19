<template>
  <div id="SNbar">
    <div @click="close">X</div>
    <div class="head-img">
      <img :src="user.head_img" />
    </div>
    <div class="name">{{ user.name }}</div>
    <div class="button" @click="sendMsg">发消息</div>
    <div class="button" @click="follow">关注TA</div>
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
      user: 'GET_SN_BAR_USER_INFO'
    })
  },
  methods: {
    ...mapActions(['TOGGLE_SN_BAR']),
    close () {
      this.TOGGLE_SN_BAR(false)
    },
    sendMsg () {
      console.log('sendMsg')
    },
    follow () {
      console.log('follow')
    }
  }
}
</script>

<style lang="scss" scoped>

.head-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin: 10px auto;
  img {
    width: 100%;
    height: 100%;
  }
}

.name {
  width: 100%;
  text-align: center;
  margin: 10px auto;
}

.button {
  margin: 20px auto;
  width: 100px;
  height: 30px;
  border-radius: 30px;
  background-color: #5abdea;
  color: #fff;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 3px;
}

</style>
