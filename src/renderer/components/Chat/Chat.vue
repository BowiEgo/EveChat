<template>
  <div id="chat">
    <div id="dialogue" ref="dialogue">
      <dialogue-vue
        v-for="(item, index) in dialogList"
        v-if="!!item"
        :key="index"
        :static="true"
        :type="item.user._id === user._id ? 'right' : 'left'"
        :text="item.text"
        :user="item.user">
      </dialogue-vue>
    </div>
    <div id="textArea">
      <textarea v-model="text" v-on:keyup.13="submit(text)"/>
      <!-- <div class="emoji"> -->
        <!-- <div class="icon"></div> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { createChatSocket } from '@/util/socket'
import { mapState, mapGetters, mapActions } from 'vuex'
import * as api from '@/api'
import { merge } from '@/util'

import DialogueVue from '@/components/Dialogue/Dialogue.vue'
// import * as io from 'socket.io-client'

export default {
  name: 'Chat',
  data () {
    return {
      chats: [],
      text: '',
      dialogList: []
    }
  },
  components: { DialogueVue },
  computed: {
    ...mapState(['user']),
    ...mapGetters({
      chatRooms: 'GET_CHAT_ROOMS',
      chatRoomActived: 'GET_ACTIVED_CHAT_ROOM'
    }),
    activedChat () {
      for (let i = 0, len = this.chats.length; i < len; i++) {
        console.log(i, this.chats[i]._id, this.chatRoomActived._id)
        if (this.chats[i]._id === this.chatRoomActived._id) {
          return this.chats[i]
        }
      }
      // return this.chats.find(el => {
      //   console.log('el', el)
      //   return el._id === this.chatRoomActived._id
      // })
    }
  },
  watch: {
    chatRoomActived: {
      handler: function (val) {
        this.dialogList = val.dialog_list
      },
      deep: true
    }
  },
  destroyed () {
    this.$socket.emit('disconnect')
  },
  async created () {
    console.log('user', this.user)
    await this.fetchChats()
    await this.linkChats()
    this.initSocketListener()
    // initSocket(this.user._id, this.user.chatId) // vm.$socket
    // this.initSocketListener()
  },
  mounted () {
    setTimeout(() => {
      this.scrollBottom()
    }, 300)
  },
  methods: {
    ...mapActions(['SET_CHAT_ROOMS']),
    fetchChats () {
      return new Promise((resolve, reject) => {
        api.u.chatList({
          userId: this.user._id
        }).then(res => {
          const chatRooms = res.data.data
          console.log('chatRooms', chatRooms)
          this.SET_CHAT_ROOMS(chatRooms)
          resolve(chatRooms)
        })
      })
    },
    linkChats () {
      this.chats = []
      this.chats = this.chatRooms.map(item => {
        console.log(item._id)
        let chat = createChatSocket(this.user._id, item._id)
        chat._id = item._id
        return chat
      })
      console.log('chats', this.chats)
    },
    initSocketListener () {
      console.log('initSocketListener')
      this.chats.map(socket => {
        // 接收消息
        socket.on('fetch message', res => {
          console.log('fetch message res: ', res)
          this.text = ''
          res.socketId !== socket.id && this.$dialog({
            user: res.user,
            text: res.text,
            type: 'left',
            duration: 1000
          })
          this.scrollBottom()
        })
      })
      // this.$socket.on('fetch chatrooms', res => {
      //   console.log('fetch chatrooms res: ', res)
      //   this.initChatRooms(res)
      // })
      // 接收消息
      // this.$socket.on('fetch message', res => {
      //   console.log('fetch message res: ', res)
      //   this.text = ''
      //   res.socketId !== this.$socket.id && this.$dialog({
      //     user: res.user,
      //     text: res.text,
      //     type: 'left',
      //     duration: 1000
      //   })
      //   this.scrollBottom()
      // })
    },
    submit (text) {
      let user = {
        head_img: '',
        name: '',
        nick_name: '',
        _id: ''
      }

      user = merge(user, this.user)

      this.$dialog({
        user: user,
        text: text,
        type: 'right',
        duration: 1000
      })
      let obj = {
        user: user,
        text: this.text,
        socketId: this.activedChat.id,
        chatId: this.chatRoomActived._id
      }
      console.log('obj', obj)
      console.log('activedChat', this.activedChat)
      this.activedChat.emit('submit message', obj)

      this.scrollBottom()
    },
    scrollBottom () {
      console.log('scrollBottom')
      this.$nextTick(() => {
        let dialogueDOM = document.getElementById('dialogue')
        let bubbleDOMList = document.querySelectorAll('.bubble')
        dialogueDOM.scrollTop = bubbleDOMList.length * dialogueDOM.offsetHeight + 120
      })
    }
  }
}
</script>

<style scoped>
#chat {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  /* background-color: #fbfaf7; */
}

#dialogue {
  width: 90%;
  margin: 30px auto;
  overflow-y: scroll;
  /* min-width: 70vw; */
  height: 100vh;
  /* background-color: #fff; */
  /* background-color: #d8e0ea; */
  padding: 10px;
}

#textArea {
  width: 90%;
  margin: 0 auto 20px;
  height: 60px;
  bottom: 0;
  display: flex;
  background-color: #fff;
  box-shadow: 3px 3px 9px 1px rgba(234, 234, 234, 0.4);
}

.button-list {
  width: 100%;
  height: 20%;
}

textarea {
  width: 100%;
  height: 100%;
  padding: 20px;
  border: none;
  outline: none;
  resize: none;
  font-size: 14px;
  color: #929292;
  /* box-shadow: -3px 3px 4px rgba(234, 234, 234, 0.4); */
}

.emoji {
  width: 80px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* box-shadow: -3px 3px 4px rgba(234, 234, 234, 0.4); */
}
/* 
.emoji .icon{
  width: 40px;
  height: 40px;
  background: url('../../assets/images/emoji.png');
  background-size: contain;
  background-repeat: no-repeat;
} */
</style>
