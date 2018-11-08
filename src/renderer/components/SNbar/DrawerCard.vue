<template>
  <div class="drawer-card">
    <div class="drawer-handler" @click="toggleFold">
      <icon
        class="arrow-up-icon"
        :class="{ down: isFold }"
        name="arrow_up" scale="2">
      </icon>
    </div>
    <div class="content" :class="{ fold: isFold }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DrawerCard',
  data () {
    return {
      isFold: false
    }
  },
  methods: {
    toggleFold () {
      this.isFold = !this.isFold
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-card {
  // position: relative;
  width: 100%;
  // background-color: $dividerColor;
}
.drawer-handler {
  // position: absolute;
  // top: -30px;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #dedede;
  background: $basicGroundColor;
}
.arrow-up-icon {
  &.down {
    transform: rotate(180deg);
  }
}
.content {
  background-color: $basicGroundColor;
  height: 36vh;
  border-top: solid 5px $dividerColor;
  transition: all .3s ease;
  transform-origin: 50% 100%;
  transform: scaleY(1);
  &.fold {
    height: calc(100vh - 180px);
    // transform: scaleY(0);
    margin-top: 0;
  }
}
</style>

