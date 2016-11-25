<template>
  <div id='login'>
    <div class="loginCard">
      <div style="padding: 16px;border: 1px dashed #e8e8e8">
        <input v-model="username" type="text" class="inputStyle" style="width: 94%" placeholder="用户名">
        <input v-model="password" type="text" class="inputStyle" style="margin-top:15px; width: 94%" placeholder="密码">
        <div v-on:click="submitLogin">
          <mt-button type="default" style="width: 100%;margin-top: 15px;font-size: 12px;height: 35px">登录</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'hello',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    submitLogin () {
      console.log(JSON.stringify)
      let data = {name: this.username, password: this.password}
      this.$http.post('http://localhost:3000/signin', data).then(response => {
        if (response.data.code === 0) {
          console.log(response.data.result)
          this.$toast(response.data.message)
          window.localStorage.setItem('user', JSON.stringify(response.data.result))
          console.log(this.$router.push('/'))
          this.callback(response.data.result)
        } else {
          this.$toast(response.data.error)
        }
      }, reponse => {

      })
    }
  },
  props: ['callback']
}
</script>

<style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
ul {
  list-style-type: none;
  padding: 0;
}

  #login{
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: #f2f2f2;
    text-align: center;
    width: 100%;
    height: 100%;
  }
  .loginCard{

    width: 50%;
    background-color: white;
  }
  .inputStyle{
    border: 1px dashed #e8e8e8;
    padding: 8px;
  }
</style>