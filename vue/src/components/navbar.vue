<template>
  <div>
    <div id='navbar'>
      <div>
        <span>Node.js-club   一个分享与发现的地方</span>
      </div>
      <div v-if="user" v-on:click="logout">
        登出
      </div>
      <div v-else>
        <router-link style="display: inline-block" to="/register">注册</router-link>
        <router-link style="display: inline-block;margin-left: 10px" to="/login">登录</router-link>
      </div>
      </div>
    <div id='navline'></div>
    <router-view v-bind:user="user" v-bind:callback="loginCallback"></router-view>
  </div>
</template>

<script>
export default{
  name: 'navbar',
  data () {
    return {
      user: window.localStorage.getItem('user'),
      loginCallback: user => { this.user = user }
    }
  },
  methods: {
    logout () {
      window.localStorage.removeItem('user')
      this.user = undefined
    },
    login () {

    }
  }
//  computed: {
//    user:
//  }
}
</script>

<style>
  #navbar{
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 25px;
    padding-right: 25px;
    padding-top:15px;
    padding-bottom:15px;
    background-color: white;
  }

  #navline{
    background-color: #e8e8e8;
    height: 1px;
    width: 100%;
  }
</style>