<template>
  <div id="contact-bar">
    <div class="contact-list">
      <!-- <list-item
        :img="'http://img.souche.com/20161230/png/8bb4f0fd45ed6ae26533eadd85f0f7ea.png'"
        :text="'新朋友'"
        :badgeNum="newFriendNum"
        @click="handleClickNewFriend">
      </list-item> -->
      <div
        v-for="(item, index) in friendList"
        :key="index"
        class="contact-item"
        @click="handleClickFriend(index)">
        <div class="head-img">
          <img :src="item.head_img">
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ListItem from './ListItem'

export default {
  name: 'ContactBar',
  components: {
    ListItem
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      friendList: 'GET_FRIEND_LIST',
      friendReQuest: 'GET_FRIEND_REQUEST'
    }),
    newFriendNum () {
      return this.friendReQuest.length
    }
  },
  methods: {
    ...mapActions(['TOGGLE_SN_BAR', 'SET_SN_BAR_USER_INFO']),
    handleClickNewFriend () {
      console.log('handleClickNewFriend')
      this.TOGGLE_SN_BAR(true)
      this.SET_SN_BAR_USER_INFO(this.friendReQuest[0])
    },
    handleClickFriend (index) {
      this.TOGGLE_SN_BAR(true)
      this.SET_SN_BAR_USER_INFO(this.friendList[index])
    }
  }
}
</script>

<style lang="scss" scoped>
#contact-bar {
  overflow-y: scroll;
  height: 100vh;
}
.contact-list {
  width: 100%;
}
.contact-item {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .head-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .name {
    width: 70%;
    font-size: 13px;
  }
}
</style>
