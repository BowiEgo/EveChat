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
import { mapState, mapGetters, mapActions } from 'vuex'
import * as api from '@/api'
import { merge } from '@/util'
import DialogueVue from '@/components/Dialogue/Dialogue.vue'

export default {
  name: 'Chat',
  data () {
    return {
      chats: [],
      text: ''
    }
  },
  components: { DialogueVue },
  computed: {
    ...mapState(['user']),
    ...mapGetters({
      chatRooms: 'GET_CHAT_ROOMS',
      chatRoomActived: 'GET_ACTIVED_CHAT_ROOM',
      chatRoomActivedId: 'GET_ACTIVED_CHAT_ROOM_ID'
    }),
    dialogList () {
      return this.chatRoomActived.dialog_list
    }
  },
  watch: {
    chatRoomActivedId: {
      handler: function (val) {
        api.u.clearUnread({
          userId: this.user._id,
          chatId: val
        }).then(res => {
          this.SET_USER(res.data.data)
        })
        this.scrollBottom()
      },
      deep: true
    }
  },
  async created () {
    console.log('user', this.user)
    await this.fetchChats()
    this.initSocketListener()
  },
  mounted () {
    setTimeout(() => {
      this.scrollBottom()
    }, 300)
  },
  methods: {
    ...mapActions([
      'SET_USER',
      'FETCH_CHAT_ROOMS',
      'SET_CHAT_ROOMS',
      'ADD_DIALOGUE'
    ]),
    fetchChats () {
      return this.FETCH_CHAT_ROOMS(this.user._id)
    },
    initSocketListener () {
      this.$socketIO.on('RECEIVE_MSG', res => {
        this.text = ''
        const checkUserId = res.user._id !== this.user._id
        const checkChatId = res.chatId === this.chatRoomActivedId
        if (checkChatId) {
          if (checkUserId) {
            this.$dialog({
              user: res.user,
              text: res.text,
              type: 'left',
              duration: 1000
            }).then(id => {
              setTimeout(() => {
                this.$destroyDialog(id)
                this.ADD_DIALOGUE({
                  id: this.chatRoomActived._id,
                  dialogue: {
                    user: res.user,
                    text: res.text
                  }
                })
              }, 30)
            })
            this.scrollBottom()
          } else {
            console.log('submit message success', res)
          }
        } else {
          this.ADD_DIALOGUE({
            id: res.chatId,
            dialogue: {
              user: res.user,
              text: res.text
            }
          })
          api.u.addUnread({
            userId: this.user._id,
            chatId: res.chatId
          }).then(res => {
            this.SET_USER(res.data.data)
          })
        }
      })
    },
    submit (text) {
      let user = merge({
        head_img: '',
        name: '',
        nick_name: '',
        _id: ''
      }, this.user)
      this.$dialog({
        user: user,
        text: text,
        type: 'right',
        duration: 1000
      }).then(id => {
        setTimeout(() => {
          this.$destroyDialog(id)
          this.ADD_DIALOGUE({
            id: this.chatRoomActived._id,
            dialogue: {
              user: user,
              text: text
            }
          })
        }, 30)
      })
      this.$socketIO.sendMsg(this.chatRoomActived._id, {
        user: user,
        text: text
      })
      this.scrollBottom()
    },
    scrollBottom () {
      this.$nextTick(() => {
        let dialogueDOM = document.getElementById('dialogue')
        let bubbleDOMList = document.querySelectorAll('.bubble')
        dialogueDOM.scrollTop = bubbleDOMList.length * dialogueDOM.offsetHeight + 120
      })
    },
    getActivedChatIO () {
      for (let i = 0, len = this.$socketIO.chatIO.length; i < len; i++) {
        let io = this.$socketIO.chatIO[i]
        if (io._id === this.chatRoomActived._id) {
          return io
        }
      }
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
