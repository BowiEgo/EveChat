<template>
  <div id="contact-bar">
    <search></search>
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
        :class="{ 'actived': index === activedIndex }"
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
import Search from '@/components/Search'

export default {
  name: 'ContactBar',
  components: {
    ListItem,
    Search
  },
  data () {
    return {
      activedIndex: -1
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
    ...mapActions(['TOGGLE_SN_BAR', 'SET_SN_BAR_USER_INFO', 'TOGGLE_INFO_BAR']),
    handleClickNewFriend () {
      this.TOGGLE_SN_BAR(true)
      this.SET_SN_BAR_USER_INFO(this.friendReQuest[0])
    },
    handleClickFriend (index) {
      this.activedIndex = index
      this.TOGGLE_SN_BAR(true)
      this.TOGGLE_INFO_BAR(false)
      this.SET_SN_BAR_USER_INFO(this.friendList[index])
    }
  }
}
</script>

<style lang="scss" scoped>
#contact-bar {
  padding: 16px;
  overflow-y: scroll;
  height: 100vh;
}
.contact-list {
  width: 100%;
}
.contact-item {
  width: 100%;
  height: 60px;
  padding-left: 10px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 5px;
  background-color: #fff;
  &.actived, &:hover {
    color: #fff;
    background-color: #8f9ad6;
  }
  .head-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
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
