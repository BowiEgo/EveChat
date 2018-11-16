<template>
  <div class="float-btns">
    <div class="plus-btn" @click="toggleToolGroup">
      <icon class="plus-icon" name="plus" scale="2"></icon>
    </div>
    <div class="btn-group">
      <div
        class="capture-btn btn-item"
        :class="{
          'active' : showBtnGroup
        }">
        <icon class="capture-icon icon-item" name="scissors" scale="2"></icon>
      </div>
      <div
        class="pic-btn btn-item"
        :class="{
          'active' : showBtnGroup
        }"
        @click="choosePic">
        <icon class="pic-icon icon-item" name="picture" scale="2.6"></icon>
      </div>
      <div
        class="emoji-btn btn-item"
        :class="{
          'active' : showBtnGroup
        }">
        <icon class="emoji-icon icon-item" name="emoji" scale="3"></icon>
      </div>
    </div>
  </div>
</template>

<script>
import { remote } from 'electron'

export default {
  name: 'FloatBtns',
  data () {
    return {
      showBtnGroup: false
    }
  },
  methods: {
    toggleToolGroup () {
      this.showBtnGroup = !this.showBtnGroup
    },
    choosePic () {
      remote.dialog.showOpenDialog({
        title: '选择图片'
      }, (filePaths, bookmarks) => {
        console.log('filePaths:', filePaths)
        this.$emit('imgChoosed', filePaths)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-group {
  position: absolute;
  bottom: 40px;
  left: 0;
  .btn-item {
    position: absolute;
    width: 40px;
    height: 40px;
    // margin-top: 6px;
    /* background-color: #2196f3; */
    border-radius: 50%;
  }
  .icon-item {
    position: absolute;
    top: 50%;
    left: 50%;
    color: #fff;
    transform: translate(-50%, -50%);
  }
}
.plus-btn {
  width: 40px;
  height: 40px;
  &:hover {
    animation-name: rotate;
    animation-duration: .4s;
  }
}
.plus-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #7b60e2;
}
.emoji-btn {
  background-color: #ef6493;
  box-shadow: 0px 3px 6px 0px rgba(255, 78, 166, 0.4);
}
.pic-btn {
  background-color: $greenColor;
  box-shadow: 0px 3px 6px 0px rgba(153, 209, 89, 0.8);
}
.capture-btn {
  background-color: #7b60e2;
  box-shadow: 0px 3px 6px 0px rgba(139, 70, 179, 0.4);
}
@for $i from 1 through 3 {
  @keyframes scaleMoveFadeIn#{$i}
  {
    0%   {
      transform: translateY(0) scale(0);
      transform-origin: 50% 50%;
      opacity: 0;
    }
    100% {
      transform: translateY(10px - $i * 50px) scale(1);
      transform-origin: 50% 50%;
      opacity: 1;
    }
  }
  @keyframes scaleMoveFadeOut#{$i}
  {
    0%   {
      transform: translateY(10px - $i * 50px) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(0) scale(0);
      opacity: 0;
    }
  }
  .btn-item {
    &.active:nth-of-type(#{$i}) {
      animation-name: scaleMoveFadeIn#{$i};
      animation-duration: (0.1s + $i * 0.1);
      animation-timing-function: cubic-bezier(.43, .27, 0, 1.45);
    }
    &:nth-of-type(#{$i}) {
      transform: translateY(10px - $i * 50px);
      animation-name: scaleMoveFadeOut#{$i};
      animation-duration: (0.45s - $i * 0.05);
      animation-timing-function: cubic-bezier(.43, .27, 0, 1.45);
    }
  }
}
.btn-item {
  opacity: 0;
  &.active {
    opacity: 1;
  }
}
</style>