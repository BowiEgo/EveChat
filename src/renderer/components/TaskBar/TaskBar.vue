<template>
  <div id="taskBar">
    <div class="taskBar-container">
      <div class="head-img">
        <img :src="user.head_img" alt="">
      </div>
      <ul class="task-list">
        <li class="task-item"
          :class="{ active: choosed === 'chat' }"
          @click="handleClick('chat')">
          <icon class="task-icon" name="bubble_smile" scale="3"></icon>
        </li>
        <!-- <li class="task-item" @click="handleClick">
          <icon class="task-icon" name="group" scale="3">多人聊天室</icon>
        </li> -->
        <li class="task-item"
         :class="{ active: choosed === 'contact' }"
          @click="handleClick('contact')">
          <icon class="task-icon" name="signal" scale="3"></icon>
        </li>
        <li class="task-item"
          :class="{ active: choosed === 'setting' }"
          @click="handleClick('setting')">
          <icon class="task-icon" name="setting" scale="3"></icon>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TaskBar',
  data () {
    return {
    }
  },
  props: {
    choosed: {
      type: String,
      default: 'chat'
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    handleClick (type) {
      console.log('handleClick')
      this.$emit('click', type)
    }
  }
}
</script>

<style lang="scss" scoped>
#taskBar {
  width: 80px;
  background-color: #fff;
  height: 100vh;
  padding-top: 40px;
}

.taskBar-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.head-img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}

.task-list {
  margin-top: 40px;
  width: 100%;
}

.task-item {
  width: 100%;
  height: 50px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 3px solid #fff;
  transition: all ease 0.3s;
  &.active {
    border-left-color: #e91e63;
    background-color: #fff;
    .task-icon {
      transition: all ease 0.3s;
      color: #e91e63;
    }
  }
  .task-icon {
    color: #cecece;
  }
}
</style>

