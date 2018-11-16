<template>
  <div id="chat">
    <div id="dialogue" ref="dialogue">
      <dialogue-group :data="dialogList" :user="user"></dialogue-group>
    </div>
    <div id="textArea">
      <div class="tool">
        <float-btns
          @imgChoosed="handleImgChoosed"></float-btns>
      </div>
      <textarea v-model="text" placeholder="" v-on:keyup.13="submit(text)"/>
      <div class="send-btn">
        <icon class="send-icon" name="paper_plane" scale="2"></icon>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import * as api from '@/api'
import { merge } from '@/util'
import DialogueGroup from '@/components/DialogueGroup'
import FloatBtns from './FloatBtns'
import Upload from '../Upload'

export default {
  name: 'Chat',
  data () {
    return {
      chats: [],
      text: ''
    }
  },
  components: {
    DialogueGroup,
    FloatBtns,
    Upload
  },
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
            let createTime = Date.now()
            this.$dialog({
              user: res.user,
              text: res.text,
              type: 'left',
              createTime: createTime,
              showTimeTip: this.showTimeTip(),
              duration: 1000
            }).then(id => {
              setTimeout(() => {
                this.$destroyDialog(id)
                this.ADD_DIALOGUE({
                  id: this.chatRoomActived._id,
                  dialogue: {
                    user: res.user,
                    text: res.text,
                    create_at: createTime
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
              text: res.text,
              create_at: Date.now()
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
      let createTime = Date.now()

      this.$dialog({
        user: user,
        text: text,
        type: 'right',
        createTime: createTime,
        showTimeTip: this.showTimeTip(),
        duration: 1000
      }).then(id => {
        setTimeout(() => {
          this.$destroyDialog(id)
          this.ADD_DIALOGUE({
            id: this.chatRoomActived._id,
            dialogue: {
              user: user,
              text: text,
              create_at: createTime
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
    },
    showTimeTip () {
      let lastTime = this.dialogList[this.dialogList.length - 1]
        ? this.dialogList[this.dialogList.length - 1].create_at
        : Date.now()
      return (Date.now() - lastTime) >= 60 * 1000
    },
    handleImgChoosed (filePaths) {
      console.log(filePaths[0])
      let user = merge({
        head_img: '',
        name: '',
        nick_name: '',
        _id: ''
      }, this.user)
      console.log('user', user)
      // this.$dialog({
      //   user: user,
      //   img: filePaths[0],
      //   type: 'right',
      //   createTime: Date.now(),
      //   showTimeTip: this.showTimeTip(),
      //   duration: 1000
      // })
    }
  }
}
</script>

<style scoped lang="scss">
#chat {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  border-left: 1px solid $dividerColor;
  // border-right: 1px solid #dee8f1;
}

#dialogue {
  width: 100%;
  // margin: 30px auto;
  // overflow-y: scroll;
  // height: 80vh;
  // padding: 10px;
  overflow-y: scroll;
  height: 80vh;
  padding: 0 30px;
}

#textArea {
  position: relative;
  width: 100%;
  height: 20vh;
  bottom: 0;
  display: flex;
  background-color: inherit;
  border-top: 1px solid $dividerColor;
  box-shadow: 3px 3px 9px 1px rgba(234, 234, 234, 0.4);
}

.button-list {
  width: 100%;
  height: 20%;
}

textarea {
  width: 100%;
  // height: 100%;
  padding: 0 60px;
  margin: 20px 0;
  overflow-y: scroll;
  border: none;
  outline: none;
  resize: none;
  font-size: 14px;
  line-height: 16px;
  color: #929292;
  background-color: inherit;
  /* box-shadow: -3px 3px 4px rgba(234, 234, 234, 0.4); */
}
.tool {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
}
.send-btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.send-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #7b60e2;
}
</style>
