<template>
  <dir class="SNCard">
    <div class="head">
      <div class="avatar">
        <img src="//img.souche.com/20161230/png/f9d10bb683d940dd14dc1b1344e89568.png" alt="">
      </div>
      <div class="name">Skr高手</div>
      <div class="time">12:30</div>
      <div class="other">
        <icon class="chat-icon" name="ellipse" scale="2.4"></icon>
      </div>
    </div>
    <div class="body">
      <div class="content">
        <div class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, recusandae a maiores ex sint, maxime corporis excepturi fugit hic, itaque veniam tempora ipsa? Dignissimos ratione officiis odit eos, aperiam porro?</div>
        <div class="image-group">
          <div
            class="image-item"
            v-for="(item, index) in imgList"
            :key="index">
            <img :src="item">
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      <!-- <div class="people-like">
        <div class="avatar">
            <img src="//img.souche.com/20161230/png/0795744371fd5869af6cab796bdacb95.png" alt="">
          </div>
          <div class="avatar">
            <img src="//img.souche.com/20161230/png/bc836261fbb654dda6b653e428014279.png" alt="">
          </div>
          <div class="avatar">
            <img src="//img.souche.com/20161230/png/bc836261fbb654dda6b653e428014279.png" alt="">
          </div>
      </div> -->
      <div class="action-group">
        <div class="like">
          <icon class="chat-icon" name="like" scale="2.4"></icon>
        </div>
        <div class="comment">
          <icon class="chat-icon" name="comment" scale="2.4"></icon>
        </div>
        <div class="repost" style="color">
          <icon class="chat-icon" name="repost" scale="2.4"></icon>
        </div>
        <div class="share">
          <icon class="chat-icon" name="share" scale="2.4"></icon>
        </div>
      </div>
    </div>
  </dir>
</template>

<script>
export default {
  name: 'SNCard',
  data () {
    return {
      imgList: [
        'https://tse4-mm.cn.bing.net/th?id=OIP.sggRWI3dfIWrGPgNpc1D2gHaE6&w=300&h=199&c=7&o=5&dpr=2&pid=1.7',
        'https://tse1-mm.cn.bing.net/th?id=OIP.6tnm8LFqod5QBjHwq436wwHaFo&w=235&h=178&c=7&o=5&dpr=2&pid=1.7',
        'https://tse2-mm.cn.bing.net/th?id=OIP.zZ0mQhQagjtiuwkBoh7ohAHaE8&w=299&h=193&c=7&o=5&dpr=2&pid=1.7'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.SNCard {
  width: 90%;
  margin: 20px auto;
  border-radius: 10px;
  background-color: #fff;
  padding: 10px;
  background-color: $themeColor;
  box-shadow: 0 2px 14px 4px rgba(70, 90, 202, 0.4);
}
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
.head {
  position: relative;
  display: flex;
  align-items: center;
  .name {
    margin: 0 10px;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
  }
  .time {
    font-size: 12px;
    color: #fff;
  }
  .other {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    color: #fff;
  }
}
.body {
  border-bottom: 1px solid #6c78bb;
  .content {
    color: #fff;
    font-size: 13px;
    text-align: justify;
  }
  .paragraph {
    padding: 10px 16px;
  }
  .image-group {
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
  }
  .image-item {
    flex: .28;
    img {
      width: 100%;
    }
  }
}
.foot {
  padding: 10px 10px 0 10px;
  display: flex;
  .people-like {
    display: flex;
    flex-direction: row-reverse;
    padding-left: 10px;
    .avatar {
      margin-left: -10px;
    }
  }
}
.action-group {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #fff;
}
</style>
