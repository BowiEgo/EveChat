<template>
  <div id="SNbar">
    <div class="close" @click="close">X</div>
    <div class="head-img">
      <img :src="toUser.head_img" />
    </div>
    <div class="name">{{ toUser.name }}</div>
    <div class="button" @click="sendMsg">发消息</div>
    <div class="button" @click="handleRecept">接受申请</div>
    <div class="button" @click="follow">关注TA</div>
    <div class="button" @click="removeFriend">删除好友</div>
  </div>
</template>

<script>
import * as api from '@/api'
// import { createChatSocket } from '@/util/socket'
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
      toUser: 'GET_SN_BAR_USER_INFO'
    })
  },
  methods: {
    ...mapActions(['TOGGLE_SN_BAR', 'TOGGLE_INFO_BAR', 'ADD_CHAT_ROOM', 'FETCH_CHAT_ROOMS', 'FETCH_FRIEND_LIST']),
    close () {
      this.TOGGLE_SN_BAR(false)
      this.TOGGLE_INFO_BAR(true)
    },
    sendMsg () {
      // let chat = {
      //   active: true,
      //   dialog_list: [],
      //   user_list: [this.user._id, this.toUser._id],
      //   _id: ''
      // }
      // this.ADD_CHAT_ROOM(chat)
      // createChatSocket(this.user._id, this.toUser._id)
      if (this.checkChatExist()) { // 检查与该联系人的聊天是否已开启
        this.switchChat() // 切换当前聊天
      } else if (this.checkIsFriend()) { // 检查是否已是好友关系
      } else {
        this.requestChat() // 发送聊天请求到服务器
      }
      this.close()
    },
    follow () {
      console.log('follow')
    },
    removeFriend () {
      console.log('removeFriend')
      api.u.removeFriend({
        userId: this.user._id,
        friendId: this.toUser._id
      }).then(res => {
        console.log('removeFriend', res)
        if (res.data.success) {
          this.FETCH_CHAT_ROOMS(this.user._id)
          this.FETCH_FRIEND_LIST(this.user._id)
        }
      })
    },
    requestChat () {
      console.log('sendRequest', this.$socketIO.serverIO)
      this.$socketIO.sendRequest(this.user._id, this.toUser._id)
    },
    handleRecept () {
    },
    switchChat () {
      console.log('switchChat')
    },
    checkChatExist () {
      console.log('checkChatExist', false)
      return false
    },
    checkIsFriend () {
      console.log('checkIsFriend', false)
      return false
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
  margin: 40px auto 10px;
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
.close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #969696;
  color: #fff;
  line-height: 30px;
  text-align: center;
}
</style>
