<template>
  <div id="SNbar">
    <div @click="close">X</div>
    <div class="head-img">
      <img :src="targetUser.head_img" />
    </div>
    <div class="name">{{ targetUser.name }}</div>
    <div class="button" @click="sendMsg">发消息</div>
    <div class="button" @click="follow">关注TA</div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'SNbar',
  data () {
    return {
      searchValue: ''
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters({
      isShow: 'GET_SN_BAR_STATE',
      targetUser: 'GET_SN_BAR_USER_INFO'
    })
  },
  methods: {
    ...mapActions(['TOGGLE_SN_BAR', 'ADD_CHAT_ROOM']),
    close () {
      this.TOGGLE_SN_BAR(false)
    },
    sendMsg () {
      console.log('sendMsg')
      // let chat = {
      //   active: true,
      //   dialog_list: [],
      //   user_list: [this.user._id, this.targetUser._id],
      //   _id: ''
      // }
      // this.ADD_CHAT_ROOM(chat)
      this.close()
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
