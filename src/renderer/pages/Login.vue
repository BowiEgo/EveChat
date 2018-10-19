<template>
  <div class="wrap">
    <div class="login-container">
      <div class="input-container username" :class="{ shake : !!this.usernameError }">
        <text-field
          v-model="username"
          :labelText="'请输入用户名'"
          :errorHint="usernameErrorHint">
        </text-field>
      </div>
      <div class="input-container password" :class="{ shake : !!this.passwordError }">
        <text-field
          v-model="password"
          :labelText="'请输入密码'"
          :errorHint="passwordErrorHint">
        </text-field>
      </div>
      <div class="submit-btn" @click="register">注册</div>
      <div class="submit-btn" @click="login" :class="{ shrink : isBtnLoaing}">
        <loading-win
          v-show="isBtnLoaing"
          :style="{position: 'absolute',top: '30%', left: '30%'}"
          :dotSize="3"
          :width="16"
          :height="16">
        </loading-win>
        <span v-show="!isBtnLoaing">登入</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api'
import TextField from '@/components/TextField'
import LoadingWin from '@/components/LoadingWin'

export default {
  name: 'login-page',
  data () {
    return {
      username: '',
      password: '',
      /* 输入框错误提示 */
      usernameError: false,
      passwordError: false,
      usernameErrorHint: '',
      passwordErrorHint: '',
      /* 按钮loading状态 */
      isBtnLoaing: false
    }
  },
  components: {
    TextField,
    LoadingWin
  },
  methods: {
    register () {
      api.u.register({
        username: this.username,
        password: this.password
      }).then(res => {
        console.log(res)
        if (res.data.success) {
          /* TODO 完成注册 */
        } else {
          /* TODO 提示错误 */
          this.hintError(res.data.message)
        }
      })
    },
    login () {
      // console.log(this.username)
      // console.log(this.password)
      api.u.login({
        username: this.username,
        password: this.password
      }).then(res => {
        console.log('res: ', res)
        if (res.data.success) {
          /* TODO 完成登入 */
          this.$store.dispatch('SET_USER', res.data.data)
          this.isBtnLoaing = true
          setTimeout(() => {
            this.$router.push({
              name: 'home'
            })
          }, 2000)
        } else {
          /* TODO 提示错误 */
          this.hintError(res.data.message)
        }
      })
    },
    hintError (msg) {
      let t = {
        username: '',
        password: ''
      }
      msg.map(item => {
        if (item.username) t.username = item.username
        if (item.password) t.password = item.password
      })
      this.usernameErrorHint = t.username
      this.usernameError = !!this.usernameErrorHint
      this.passwordErrorHint = t.password
      this.passwordError = !!this.passwordErrorHint
      setTimeout(() => {
        this.usernameError = false
        this.passwordError = false
      }, 1000)
    }
  }
}
</script>

<style scoped>
 /* transition */
/* .button-loading-enter-active, {
  transition: opacity .4s .1s;
  animation: shrink .4s;
  animation-delay: .1s;
}

.button-loading-enter, .button-loading-leave-to {
  opacity: 0;
}

.button-loading-enter-active {
  transform-origin: 0 0;
}

.button-loading-leave-active {
  transition: opacity .4s .1s;
  animation: bubble-in .4s reverse;
} */
 /* animate */
/* @keyframes shrink {
  from, to {
    animation-timing-function: cubic-bezier(1,.07,.52,.79);
  }
  0% {
    width: 180px;
  }
  100% {
    width: 36px;
  }
} */
/* 
.shrink {
  animation-duration: .8s;
  animation-name: shrink;
} */

.shrink {
  width: 36px !important;
  transition: all .3s ease-out;
}

@keyframes shake {
  from, to {
    transform: translate3d(0, 0, 0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translate3d(-10px, 0, 0);
  }
  20%, 40%, 60%, 80% {
    transform: translate3d(10px, 0, 0);
  }
}

.shake {
  animation-duration: 1s;
  animation-name: shake;
}

/* style */
::-webkit-input-placeholder {
  color: #cecece;
}

.wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #ececec;
}

.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-container .input-container {
  width: 240px;
  height: 36px;
  border: none;
  border-radius: 30px;
  line-height: 36px;
  color: grey;
  padding: 2px 10px;
  margin-bottom: 30px;
  font-size: 12px;
  background-color: #fff;
  box-shadow: 5px 10px 11px -2px rgba(199, 199, 199, 0.8);
  caret-color: pink;
}

.login-container input {
  width: 240px;
  height: 36px;
  border: none;
  border-radius: 30px;
  line-height: 36px;
  color: grey;
  padding: 6px 10px;
  margin: 8px 0;
  box-shadow: 5px 10px 11px -2px rgba(199, 199, 199, 0.8);
  caret-color: pink;
}

.submit-btn {
  position: relative;
  margin: 40px auto 0;
  width: 180px;
  height: 36px;
  border: none;
  border-radius: 30px;
  line-height: 36px;
  background-color: #d64073;
  box-shadow: 5px 10px 11px -2px rgba(199, 163, 176, 0.7);
  color: #fff;
  text-align: center;
  font-size: 12px;
}

</style>
