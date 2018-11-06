<template>
  <div id="infoCard">
    <div class="container" :class="{ highlight: actived }">
      <div class="brief">
        <div class="head-img">
          <img :src="avatar" alt="">
        </div>
        <div class="mid">
          <div class="name">{{ name }}</div>
          <div class="time">07:08AM</div>
        </div>
        <div class="status">Online</div>
        <div class="unread">{{ unreadMsgNum }}条未读</div>
      </div>
      <div class="content">{{ data.text }}</div>
    </div>
  </div>
</template>

<script>
import Badge from '../Badge'

export default {
  name: 'InfoCard',
  components: {
    Badge
  },
  props: {
    actived: {
      type: Boolean
    },
    show: {
      type: Boolean
    },
    data: {
      type: Object,
      default () {
        return {
          user: {
            head_img: '',
            name: ''
          },
          text: ''
        }
      }
    },
    avatar: String,
    name: String,
    unreadMsgNum: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
#infoCard {
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 3px 3px 9px 1px rgba(234, 234, 234, 0.4);
}

.container {
  position: relative;
  width: 100%;
  padding: 16px;
  background: #fff;
  transition: all ease 0.2s;
  &.highlight {
    background: #5abdea;
    .name, .status, .content {
      color: #fff;
    }
    .time, .unread {
      color: rgba(255, 255, 255, 0.7);
    }
  }
}

.brief {
  display: flex;
  .mid {
    width: 60%;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    justify-content: space-around;
  }
}

.head-img {
  position: relative;
  width: 36px;
  height: 36px;
  img {
    position: absolute;
    top: 50%;
    border-radius: 50%;
    transform: translate(0, -50%);
    width: 36px;
    height: 36px;
  }
}
.name {
  font-weight: 600;
}
.time {
  color: #c5c5c5;
}
.status {
  width: 20%;
  font-size: 12px;
  color: #a7a7a7;
  &:before {
    content: '';
    display: inline-block;
    width: 5px;
    height: 5px;
    background: #9be248;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 4px;
  }
}
.content {
  padding-top: 8px;
  font-size: 11px;
  color: #696969;
  font-weight: 300;
}
.unread {
  position: absolute;
  top: 34px;
  right: 28px;
  color: #c5c5c5;
  font-size: 12px;
}
</style>
