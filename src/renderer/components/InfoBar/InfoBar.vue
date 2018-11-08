<template>
  <div id="infoBar">
    <search></search>
    <span class="warning" v-if="!isConnected">您已断开连接</span>
    <transition-group name="fadeIn">
      <info-card
        v-for="(item, index) in infoList"
        :show="unfolded"
        v-if="unfolded && !!item"
        :unread-msg-num="getUnreadMsgNum(item._id)"
        :key="index"
        :actived="item._id === chatRoomActived._id"
        @click.native="chooseInfo(item._id)"
        :avatar="item.other_user_list[0].head_img"
        :name="item.other_user_list[0].name"
        :last-time="getLastTime(item)"
        :is-connected="item.other_user_list[0].is_connected"
        :data="item.dialog_list[item.dialog_list.length - 1]">
      </info-card>
    </transition-group>
  </div>
</template>

<script>
import InfoCard from '@/components/InfoCard'
import Search from '@/components/Search'
import { mapState, mapGetters } from 'vuex'
import { deepClone } from '../../util'

export default {
  name: 'InfoBar',
  components: { InfoCard, Search },
  data () {
    return {
      infoList: []
    }
  },
  props: {
    unfolded: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(['user', 'chatRoom']),
    ...mapGetters({
      isConnected: 'GET_IS_CONNECTED',
      friendList: 'GET_FRIEND_LIST',
      chatRoomList: 'GET_CHAT_ROOMS',
      chatRoomActived: 'GET_ACTIVED_CHAT_ROOM'
    })
  },
  watch: {
    chatRoomList: {
      handler: function (val) {
        val.map((item, index) => {
          if (item !== this.infoList[index]) {
            let info = deepClone(item)
            let userList = item.user_list
            let otherUserList = userList.filter(id => {
              return id !== this.user._id
            }).map(id => {
              return this.friendList.find(user => {
                return user._id === id
              })
            })
            info['other_user_list'] = otherUserList
            console.log('infoList', this.infoList)
            this.$set(this.infoList, index, info)
          }
        })
      },
      deep: true
    }
  },
  mounted () {
    console.log('chatRoomActived', this.chatRoomActived)
  },
  methods: {
    chooseInfo (id) {
      this.$store.dispatch('ACTIVE_CHAT_ROOM', id)
    },
    getUnreadMsgNum (id) {
      console.log('getUnreadMsgNum', id, this.user.unread_num_list)
      return this.user.unread_num_list ? this.user.unread_num_list[id] : 0
    },
    getLastTime (info) {
      return info.dialog_list[info.dialog_list.length - 1]
        ? info.dialog_list[info.dialog_list.length - 1].create_at
        : Date.now()
    }
  }
}
</script>

<style lang="scss" scoped>
/* transition */
.fadeIn-enter-active, .fadeIn-leave-active {
  transition: opacity .5s ease;
}
@for $index from 0 to 100 {
  .fadeIn-enter-active:nth-child(#{$index}), {
    transition-delay: (0.1 + $index * 0.15)#{s};
  }
  .fadeIn-leave-active:nth-child(#{$index}) {
    transition-delay: (0.1 + $index * 0.15)#{s};
  }
}
.fadeIn-leave-to {
  transition: none;
}

.fadeIn-enter, .fadeIn-leave-to {
  opacity: 0;
}

/* style */
#infoBar {
  padding: 9px;
  overflow-y: scroll;
  height: 100vh;
}
.warning {
  width: 100%;
  display: inline-block;
  text-align: center;
  color: #909090;
  line-height: 30px;
}
</style>
