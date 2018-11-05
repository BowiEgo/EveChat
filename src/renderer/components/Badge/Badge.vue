<template>
  <div class="badge" v-if="info > 0">
    <span>{{ info }}</span>
  </div>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    info: 0
  }
}
</script>

<style lang="scss" scoped>
.badge {
  width: 14px;
  height: 14px;
  background-color: #e91e63;
  border-radius: 50%;
  color: #fff;
  line-height: 14px;
  text-align: center;
  font-size: 12px;
  span {
    display: inline-block;
    transform: scale(.7);
  }
}
</style>
