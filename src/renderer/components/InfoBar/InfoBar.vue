<template>
  <div id="infoBar">
    <search></search>
    <transition-group name="fadeIn">
      <info-card
        v-for="(item, index) in infoList"
        :show="unfolded"
        v-if="unfolded && !!item"
        :key="index"
        :actived="item._id === chatRoomActived._id"
        @click.native="chooseInfo(item._id)"
        :avatar="otherUser.head_img"
        :data="item.dialog_list[item.dialog_list.length - 1]"></info-card>
    </transition-group>
  </div>
</template>

<script>
import InfoCard from '@/components/InfoCard'
import Search from '@/components/Search'
import { mapState, mapGetters } from 'vuex'

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
      chatRoomList: 'GET_CHAT_ROOM',
      chatRoomActived: 'GET_ACTIVED_CHAT_ROOM'
    }),
    otherUser () {
      let result = ''
      if (this.chatRoomActived) {
        this.chatRoomActived.user_list.map(item => {
          if (item !== this.user._id) {
            result = item
          }
        })
      }
      return result
    }
  },
  watch: {
    chatRoomList: {
      handler: function (val) {
        if (this.infoList.length === 0) {
          this.infoList = val
        } else {
          val.map((item, index) => {
            if (item !== this.infoList[index]) {
              this.infoList[index] = item
            }
          })
        }
        console.log('infoList', val)
      },
      deep: true
    }
  },
  mounted () {
    console.log(this.chatRoomActived)
  },
  methods: {
    chooseInfo (id) {
      this.$store.dispatch('ACTIVE_CHAT_ROOM', id)
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
  padding: 16px;
  overflow-y: scroll;
  height: 100vh;
}
</style>
