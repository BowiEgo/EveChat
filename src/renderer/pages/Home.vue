<template>
  <div id="wrapper">
    <main>
      <div class="taskbar-wrap">
        <task-bar @click="toggleMid" :choosed="infoType"></task-bar>
      </div>
      <div class="infobar-wrap" :class="{ unfold: showInfobar }">
        <info-bar v-show="infoType === 'chat'" :unfolded="showInfobar"></info-bar>
        <contact-bar v-show="infoType === 'contact'" :unfolded="showInfobar"></contact-bar>
        <setting-bar v-show="infoType === 'setting'" :unfolded="showInfobar"></setting-bar>
      </div>
      <div class="chatroom-wrap">
        <chat></chat>
      </div>
      <div class="SNbar-wrap" :class="{ unfold: showSNbar }">
        <SN-bar></SN-bar>
      </div>
    </main>
  </div>
</template>

<script>
import TaskBar from '@/components/TaskBar'
import InfoBar from '@/components/InfoBar'
import SettingBar from '@/components/SettingBar'
import SNBar from '@/components/SNbar'
import ContactBar from '@/components/ContactBar'
import Chat from '@/components/Chat'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'home-page',
  components: {
    TaskBar,
    InfoBar,
    SettingBar,
    ContactBar,
    SNBar,
    Chat
  },
  data () {
    return {
      infoType: 'chat',
      showMid: true
    }
  },
  computed: {
    ...mapGetters({
      showInfobar: 'GET_INFO_BAR_STATE',
      showSNbar: 'GET_SN_BAR_STATE'
    })
  },
  methods: {
    ...mapActions(['TOGGLE_INFO_BAR']),
    toggleMid (type) {
      if (type === this.infoType) {
        this.TOGGLE_INFO_BAR(!this.showInfobar)
        return
      }
      this.infoType = type
      this.$nextTick(() => {
        this.TOGGLE_INFO_BAR(true)
      })
    },
    toggleSNbar () {
      this.showSNbar = !this.showSNbar
    }
  }
}
</script>

<style lang="scss" scoped>
/* transition */
// .unfold-enter-active, .unfold-leave-active {
//   transition: all .3s ease;
//   // transform-origin: top center;
//   transform-origin: 0 50%;
//   transform: scaleX(1);
//   // opacity: 0;
// }
// .unfold-enter, .unfold-leave-to {
//   // opacity: 1;
//   transform: scaleX(0);
// }

/* style */
#wrapper {
  background:
    radial-gradient(
      ellipse at top left,
      rgba(255, 255, 255, 1) 40%,
      rgba(229, 229, 229, .9) 100%
    );
  /* height: 100vh; */
  /* width: 100vw; */
}

/* main > div { flex-basis: 50%; } */

main {
  display: flex;
  height: 100%;
}

.taskbar-wrap {
  height: 100vh;
}

.infobar-wrap {
  width: 0;
  // width: 300px;
  background: #fbfaf7;
  background: #f0f3f5;
  transition: all .3s ease;
  transform-origin: 0 50%;
  transform: scaleX(0);
  &.unfold {
    width: 300px;
    transform: scaleX(1);
  }
}

.chatroom-wrap {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f0f3f5;
  height: 100vh;
}

.SNbar-wrap {
  width: 0;
  height: 100vh;
  background: #fbfaf7;
  // background: #f0f3f5;
  // background-color: grey;
  transition: all .3s ease;
  transform-origin: 100% 50%;
  transform: scaleX(0);
  &.unfold {
    width: 300px;
    transform: scaleX(1);
  }
}
</style>
