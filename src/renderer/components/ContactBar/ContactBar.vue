<template>
  <div id="contact-bar">
    <div class="contact-list">
      <div
        v-for="(item, index) in contactList"
        :key="index"
        class="contact-item">
        <div class="head-img">
          <img :src="item.head_img">
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactBar',
  data () {
    return {
      contactList: [
        {
          head_img: '',
          name: '西瓜'
        },
        {
          head_img: '',
          name: '苹果'
        },
        {
          head_img: '',
          name: '香蕉'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
#contact-bar {
  overflow-y: scroll;
  height: 100vh;
}
.contact-list {
  width: 100%;
}
.contact-item {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .head-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .name {
    width: 70%;
    font-size: 13px;
  }
}
</style>
