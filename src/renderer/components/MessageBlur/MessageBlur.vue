<template>
  <div class="message-blur">
    <div class="msg">您已经断开连接</div>
  </div>
</template>

<script>
export default {
  name: 'message-blur',
  props: {
    msg: {
      type: String,
      default: '您已经断开连接'
    }
  }
}
</script>

<style lang="scss" scoped>
.message-blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9999;
}
.msg {
  position: absolute;
  color: #fff;
  font-size: 20px;
  font-weight: 800;
  top: 46%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
