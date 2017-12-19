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
import io from 'socket.io-client'
import { mapState, mapGetters } from 'vuex'

import DialogueVue from '@/components/Dialogue/Dialogue.vue'
// import * as io from 'socket.io-client'

export default {
  name: 'Chat',
  data () {
    return {
      socket: null,
      text: '',
      dialogList: []
    }
  },
  components: { DialogueVue },
  computed: {
    ...mapState(['user']),
    ...mapGetters({
      chatRoom: 'GET_CHAT_ROOM',
      chatRoomActived: 'GET_ACTIVED_CHAT_ROOM'
    })
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
    this.socket.emit('disconnect')
  },
  mounted () {
    console.log(this.user)
    this.socket = io.connect(`http://localhost:3000/chat?userId=${this.user._id}`)
    this.socket.on('fetch chatrooms', res => {
      console.log('res', res)
      this.initChatRooms(res)
    })
    this.socket.on('fetch message', res => {
      console.log('fetch message', res)
      this.text = ''
      res.socketId !== this.socket.id && this.$dialog({user: res.user, text: res.text, type: 'left', duration: 1000})
      this.scrollBottom()
    })

    setTimeout(() => {
      this.scrollBottom()
    }, 300)
  },
  methods: {
    initChatRooms (data) {
      this.$store.dispatch('SET_CHAT_ROOM', data)
    },
    submit (text) {
      this.$dialog({user: this.user, text: text, type: 'right', duration: 1000})
      let obj = {
        user: this.user,
        text: this.text,
        socketId: this.socket.id,
        chatId: this.chatRoomActived._id
      }
      console.log('obj', obj)
      this.socket.emit('submit message', obj)

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
