<template>
  <div class="u-switch">
    <div class="button"></div>
  </div>
</template>

<script>
export default {
  name: 'USwitch'
}
</script>

<style lang="scss" scoped>
.u-switch {
  position: relative;
  width: 36px;
  height: 18px;
  border-radius: 10px;
  background-color: $minorColor;
}
.button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.1);
}
</style>

