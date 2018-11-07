<template>
<<<<<<< HEAD
  <div class="dialogue-bubble">
    <div class="time" v-if="showTimeTip && isTimeLegal">{{ createTime | timeFilter }}</div>
    <div class="container" :class="typeClass">
      <transition name="fade">
        <div class="avatar" v-if="isShow">
          <img v-if="user.head_img" :src="user.head_img">
        </div>
      </transition>
      <transition name="fade">
        <div class="nickName">{{ user.name }}</div>
      </transition>
      <transition v-bind:name="transitionName">
        <div class="bubble" v-if="isShow">
          <span>{{ text }}</span>
        </div>
      </transition>
    </div> 
  </div>
=======
  <div class="dialogue-bubble container" :class="typeClass">
    <transition name="fade">
  		<div class="avatar" v-if="isShow">
        <img v-if="user.head_img" :src="user.head_img">
      </div>
    </transition>
    <transition name="fade">
      <div class="nickname">{{ user.name }}</div>
    </transition>
    <transition v-bind:name="transitionName">
      <div class="bubble" v-if="isShow">
        <span>{{ text }}</span>
      </div>
    </transition>
  </div> 
>>>>>>> 9a7416457b92901adbd12204acb000c55ab3f117
</template>

<script>
import { timeSimplify } from '../../util/time'

export default {
  name: 'DialogueVue',
  data () {
    return {
      show: false
    }
  },
  props: {
    static: false,
    type: {
      type: String,
      default: 'left'
    },
    text: {
      type: String,
      default: ''
    },
    user: {
      type: Object,
      default () {
        return {
          nick_name: '',
          head_img: '',
          name: ''
        }
      }
    },
    createTime: '',
    showTimeTip: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isShow () {
      return this.show || this.static
    },
    typeClass () {
      return this.type === 'left' ? { left: true } : { right: true }
    },
    transitionName () {
      return this.type === 'left' ? 'bubble-left' : 'bubble-right'
    },
    isTimeLegal () {
      return timeSimplify(this.createTime) !== '--:--'
    }
  },
  filters: {
    timeFilter (val) {
      return timeSimplify(val)
    }
  },
  methods: {
    init () {
      this.show = true
    }
  }
}
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: all .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0;
  transform: scale(0);
}

.bubble-left-enter-active, .bubble-right-enter-active {
  transition: opacity .4s .1s;
  animation: bubble-in .4s;
  animation-delay: .1s;
}

.bubble-left-enter, .bubble-left-leave-to, .bubble-right-enter, .bubble-right-leave-to {
  opacity: 0;
}

.bubble-left-enter-active {
  transform-origin: 0 0;
}

.bubble-right-enter-active {
  transform-origin: 100% 0;
}

.bubble-left-leave-active, .bubble-right-leave-active {
  transition: opacity .4s .1s;
  animation: bubble-in .4s reverse;
}

@keyframes bubble-in {
  from, to {
    animation-timing-function: cubic-bezier(1,.07,.52,.79);
  }

  0% {
    opacity: 0;
    transform: scale(0);
  }

  90% {
    transform: scale(1.05, 1.05);
  }

  to {
    opacity: 1;
    transform: scale(1, 1);
  }
}

.time {
  font-size: 12px;
  color: #bfbfbf;
  text-align: center;
}

.container {
  position: relative;
  margin: 4px 0;
  display: flex;
  width: 100%;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #607d8b;
  overflow: hidden;
  box-shadow: 3px 3px 7px -1px rgba(0,0,0,0.3);
}

.avatar img {
  width: 100%;
  height: 100%;
}

.nickname {
  position: absolute;
  top: 0;
  font-size: 12px;
  color: #b1b1b1;
}

.bubble {
  max-width: 50%;
  position: relative;
  color: #333;
  font-size: 12px;
  padding: 6px 8px;
  margin-top: 14px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.bubble span {
  line-height: 18px;
}

/* .bubble:before {
  content: '';
  display: block;
  position: absolute;
  top: 0%;
  width: 0;
  height: 0;
} */

.container.right {
  flex-direction: row-reverse;
}

.container.left .nickname {
  left: 50px;
}

.container.right .nickname {
  right: 50px;
}

.container.left .bubble {
  margin-left: 10px;
  background: #fff;
  /* background: #9e9e9e; */
  border-top-right-radius: 15px;
  box-shadow: 0px 3px 10px 4px rgba(234, 234, 234, 0.7);
}

.container.right .bubble {
  margin-right: 10px;
  color: #fff;
  /* background: #fff; */
  background: #81ccef;
  border-top-left-radius: 15px;
  box-shadow: 0px 3px 10px 4px rgba(129, 204, 239, 0.3);
}

/* .container.left .bubble:before {
  left: -6px;
  border-top: 3px solid transparent;
  border-right: 6px solid #9e9e9e;
  border-bottom: 6px solid transparent;
} */

/* .container.right .bubble:before {
  right: -6px;
  border-top: 3px solid transparent;
  border-left: 6px solid #81ccef;
  border-bottom: 6px solid transparent;
} */

</style>
