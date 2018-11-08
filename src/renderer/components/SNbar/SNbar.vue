<template>
  <div id="SNbar">
    <div class="brief">
      <div class="close" @click="close">
        <icon class="close-icon" name="close" scale="1.4"></icon>
      </div>
      <div class="head-img">
        <img :src="toUser.head_img" />
      </div>
      <div class="name">{{ toUser.name }}</div>
      <div class="btn-group">
        <div class="chat-btn btn-item">
          <icon class="chat-icon" name="chat_round" scale="2.4"></icon>
        </div>
        <div class="follow-btn btn-item">
          <icon class="follow-icon" name="follow" scale="2"></icon>
        </div>
        <div class="other-btn btn-item">
          <icon class="task-icon" name="ellipse" scale="2"></icon>
        </div>
      </div>
      <div class="setting-list">
        <div class="setting-item notification">
          <div class="setting-icon noti-icon">
            <icon name="notification" scale="1.6"></icon>
          </div>
          <div class="setting-title">显示通知</div>
          <u-switch></u-switch>
        </div>
        <div class="setting-item notification">
          <div class="setting-icon noti-icon green-color">
            <icon class="task-icon" name="notification" scale="1.6"></icon>
          </div>
          <div class="setting-title">显示通知</div>
          <icon class="right-icon" name="right" scale="1.6"></icon>
        </div>
        <div class="setting-item notification">
          <div class="setting-icon noti-icon minor-color">
            <icon class="task-icon" name="notification" scale="1.6"></icon>
          </div>
          <div class="setting-title">显示通知</div>
          <icon class="right-icon" name="right" scale="1.6"></icon>
        </div>
      </div>
      <!-- <div class="button" @click="sendMsg">发消息</div> -->
      <!-- <div class="button" @click="handleRecept">接受申请</div> -->
      <!-- <div class="button" @click="follow">关注TA</div> -->
      <!-- <div class="button" @click="removeFriend">删除好友</div> -->
      <!-- <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda non veniam suscipit laboriosam cumque quam cum officia alias sapiente ullam, voluptatibus in rerum delectus dolore maiores necessitatibus incidunt soluta pariatur.</p> -->
    </div>
    <drawer-card>
      <div class="album">
        <div class="album-top">
          <div>动态</div>
          <div class="view-all">全部</div>
        </div>
        <div class="album-list">
          <div
            class="album-item"
            v-for="(item, index) in album"
            :key="index">
            <div>
              <img :src="item" alt="">
            </div>
          </div>
        </div>
      </div>
    </drawer-card>
  </div>
</template>

<script>
import * as api from '@/api'
import { mapState, mapGetters, mapActions } from 'vuex'
import USwitch from '../Switch'
import DrawerCard from './DrawerCard'

export default {
  name: 'SNbar',
  components: {
    USwitch,
    DrawerCard
  },
  data () {
    return {
      searchValue: '',
      album: [
        'https://tse4-mm.cn.bing.net/th?id=OIP.sggRWI3dfIWrGPgNpc1D2gHaE6&w=300&h=199&c=7&o=5&dpr=2&pid=1.7',
        'https://tse1-mm.cn.bing.net/th?id=OIP.6tnm8LFqod5QBjHwq436wwHaFo&w=235&h=178&c=7&o=5&dpr=2&pid=1.7',
        'https://tse2-mm.cn.bing.net/th?id=OIP.zZ0mQhQagjtiuwkBoh7ohAHaE8&w=299&h=193&c=7&o=5&dpr=2&pid=1.7'
      ]
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
#SNbar {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.brief {
  flex: 1;
  overflow: hidden;
}

.head-img {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  overflow: hidden;
  margin: 40px auto 10px;
  box-shadow: 0px 6px 18px 5px rgba(0, 0, 0, 0.2);
  img {
    width: 100%;
    height: 100%;
  }
}

.name {
  width: 100%;
  text-align: center;
  margin: 18px auto;
}

.button {
  margin: 20px auto;
  width: 100px;
  height: 30px;
  border-radius: 30px;
  background-color: $themeColor;
  color: #fff;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 3px;
  box-shadow: 0px 6px 18px 5px rgba(69, 83, 204, 0.2);
}

.btn-group {
  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  .btn-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    color: #fff;
  }
}
.chat-btn {
  background-color: $greenColor;
}
.follow-btn {
  background-color: $minorColor;
}
.other-btn {
  background-color: #a5a5a5;
}

.setting-list {
  margin-top: 20px;
  width: 100%;
  padding: 0 30px;
}
.setting-item {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.setting-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.setting-title {
  flex: .8;
  font-size: 12px;
  line-height: 24px;
  text-align: left;
  color: grey;
}
.noti-icon {
  background-color: $themeColor;
}
.right-icon {
  color: #dedede;
}

.close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: #c0c0c0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.album-top, .album-list {
  width: 80%;
  margin: 0 auto;
}
.album-top {
  height: 66px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  .view-all {
    color: $minorColor;
  }
}
.album-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.album-item {
  position: relative;
  flex: .29;
  border-radius: 8px;
  overflow: hidden;
  div {
    height: 0;
    padding-top: 100%;
  }
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}

.green-color {
  background-color: $greenColor;
}
.minor-color {
  background-color: $minorColor;
}
</style>
