<template>
  <div id="infoCard">
    <div class="container" :class="{ highlight: actived }">
      <div class="brief">
        <div class="left">
          <div class="head-img">
            <img :src="avatar" alt="">
            <div
              class="status"
              :class="{ 'offline': !isConnected }">
              <!-- {{ isConnected ? 'Online' : 'Offline' }} -->
            </div>
          </div>
        </div>
        <div class="mid">
          <div class="name">{{ name }}</div>
          <div class="content">{{ data.text }}</div>
        </div>
        <div class="right">
          <div class="time">{{ lastTime | timeFilter }}</div>
          <div class="unread">{{ unreadMsgNum }}条未读</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Badge from '../Badge'
import { timeSimplify } from '../../util/time'

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
    },
    isConnected: {
      type: Boolean,
      default: true
    },
    lastTime: Number
  },
  filters: {
    timeFilter (val) {
      return timeSimplify(val)
    }
  }
}
</script>

<style lang="scss" scoped>
#infoCard {
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
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
  min-height: 40px;
  // display: flex;
  // justify-content: space-between;
}

.left, .mid {
  float: left;
}
.right {
  float: right;
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

.mid {
  // width: 150px;
  // flex: .6;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  justify-content: space-around;
}
.name, .content {
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.name {
  font-size: 13px;
  font-weight: 600;
}
.content {
  margin-top: 8px;
  font-size: 11px;
  color: #696969;
  font-weight: 300;
}
.status {
  width: 20%;
  position: absolute;
  right: -1px;
  font-size: 12px;
  color: #a7a7a7;
  &:before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #5bdf87;
    border-radius: 50%;
    border: 2px solid #fff;
    vertical-align: middle;
    margin-right: 4px;
  }
  &.offline {
    &:before {
      display: none;
      background: #bfbfbf;
    }
  }
}

.right {
  // width: 48px;
  display: flex;
  flex-direction: column;
}
.time {
  font-size: 12px;
  color: #c5c5c5;
}
.unread {
  margin-top: 4px;
  color: #c5c5c5;
  font-size: 12px;
}
</style>
