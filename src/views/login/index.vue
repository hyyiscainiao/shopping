<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" alt="" @click="getPicCode">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode" >{{seconds===totalTime?'获取验证码':seconds+`秒后重新发送`}}</button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'
// import { Mutation } from 'vuex'
// import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  data () {
    return {
      picUrl: '',
      pickey: '',
      totalTime: 60,
      seconds: 60,
      timer: null,
      picCode: '', // 图形验证码
      mobile: '',
      msgCode: ''
    }
  },
  async created () {
    this.getPicCode()
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    // 获取图形验证码
    async getPicCode () {
      const { data: { key, base64 } } = await getPicCode()
      this.picUrl = base64
      this.picKey = key
      // Toast('获取验证码成功')
      // this.$toast('图形验证码获取成功')
    },
    // 验证码手机号码和图形验证码
    vaildFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('输入正确的手机号码')
        return false
      }

      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('输入正确的图形验证码')
        return false
      }
      return true
    },

    // 倒计时
    async getCode () {
      // this.vaildFn()
      if (!this.vaildFn()) {
        return
      }
      await getMsgCode(this.picCode, this.picKey, this.mobile)
      this.$toast('发送成功，注意查收')
      if (this.seconds === this.totalTime && !this.timer) {
        this.timer = setInterval(() => {
          // console.log('倒计时' + this.seconds)
          this.seconds--
          if (this.seconds < 1) {
            clearInterval(this.timer)
            this.seconds = this.totalTime
            this.timer = null
          }
        }, 1000)
      }
    },
    async login () {
      if (!this.vaildFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
      this.$toast('登录成功')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;

    h3 {
      font-size: 26px;
      font-weight: normal;
    }

    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;

    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }

    img {
      width: 94px;
      height: 31px;
    }

    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
