<template>
  <div class="list-item" @click="handleClick">
    <div class="img-container">
      <img :src="img">
    </div>
    <div class="text">
      <span>{{ text }}</span>
    </div>
    <div class="badge" v-if="badgeNum > 0">{{ badgeNum }}</div>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    img: {
      type: String,
      default: ''
    },
    text: '',
    badgeNum: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleClick () {
      this.$emit('click', null)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.img-container {
  flex: .2;
}
.text-container {
  flex: .8;
}
.badge {
  position: absolte;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: crimson;
  color: #fff;
  text-align: center;
  line-height: 20px;
}
</style>
