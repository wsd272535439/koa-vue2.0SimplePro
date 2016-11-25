<template>
  <div style="width: 100%;">
    <div v-if="data.statusText" class="borderStyle" style="margin: 15px 25px 0 25px;background-color: #dddddd;color: #999999;padding: 8px 0px 8px 8px">{{ data.statusText }}</div>
    <div id='home'>
      <div style="width: 70%">
        <router-view v-bind:statusCall="statusCall" v-bind:data="data"></router-view>
      </div>
      <div style="margin-left: 15px;width: 23%">
        <div v-if="isLogin" class="personalInfo">
          <div class="personalInfoHead">
            <img v-bind:src="data.avatar" style="width: 50px;height: 50px">
            <input style="width: 50px;height: 50px;position: absolute;filter: alpha(opacity : 0);opacity: 0;" type="file" v-on:change="onFileChange">
            </img>
            <div style="margin-left: 4px">
              <div style="margin-top: 4px">{{ data.name }}</div>
              <div style="color: #999999;font-size: 12px;margin-top: 6px;">{{ data.sex }}</div>
            </div>
          </div>
          <div style="font-size: 12px;color: #999999">{{ data.signature }}</div>
          <div style="border: 1px dashed #E8E8E8;margin-top: 5px"></div>
          <div class="flexSpaceBetween">
            <div>
              <img src=""/>
              <span style="display: block;margin-left: 3px; font-size: 12px;color: #999999;margin-top: 8px;font-weight: bold">个人主页</span>
            </div>
            <div>
              <img src=""/>
              <span style="display: block;margin-left: 3px; font-size: 12px;color: #999999;margin-top: 8px;font-weight: bold">设置</span>
            </div>
          </div>
        </div>
        <div v-on:click="toPublish" v-if="isLogin" style="padding: 10px;background-color: white;margin-top: 30px;border: 1px dashed #e8e8e8;">
          <mt-button type="primary" style="width: 100%">发表话题</mt-button>
        </div>
        <div style="padding: 10px 5px 10px 5px;background-color: white;margin-top: 30px;border: 1px dashed #e8e8e8;">
          <div style="font-weight: bold;">无人回复的话题</div>
          <div style="border: 1px dashed #e8e8e8;margin-top: 10px"/>
          <ul>
            <li style="list-style: none;margin-top: 6px;font-size: 12px;color: #333333" v-for="topic in data.unreadTopcs">{{ topic }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'home',
  data () {
    return {
      data: {
        uid: undefined,
        name: 'wsd',
        sex: '男',
        signature: '做人若清泉，清澈，淡雅, 纯净',
        unreadTopcs: ['122313', '22290312'],
        avatar: require('../assets/Icon.jpg'),
        statusText: undefined
      },
      isLogin: false,
      statusCall: status => { console.log('callback', status); this.data.statusText = status }
    }
  },
  props: ['user'],
  methods: {
    toPublish () {
      this.$router.push('/publish')
    },
    getHomeData () {
      let user = JSON.parse(window.localStorage.getItem('user'))
      if (user) {
        this.isLogin = true
        this.$http.post('http://localhost:3000/home', {uid: user.uid}).then(response => {
          if (response.data.code === 0) {
            this.$toast(response.data.message)
            let data = response.data.result
            if (data) {
              console.log('data', data)
              this.data.name = data.name
              this.data.sex = data.gender
              this.data.signature = data.signature
              this.data.uid = data.uid
              if (data.avatar) {
                this.data.avatar = data.avatar
              }
            }
          } else {
            this.$toast(response.data.error)
          }
        }, reponse => {
        })
      }
    },
    onFileChange (e) {
      e.preventDefault()
      let target = e.target
      let files = target.files
      if (files) {
        let formData = new window.FormData()
        formData.append('filedata', files[0])
        formData.append('uid', this.data.uid)
//        console.log(this.data.uid)
        this.$http.post('http://localhost:3000/uploadAvatar', formData).then(response => {
          if (response.data.code === 0) {
            this.data.avatar = response.data.result.url
            this.$toast(response.data.message)
          } else {
            this.$toast(response.data.error)
          }
        }, reponse => {
        })
      }
    }
  },
  watch: {
    user (curVal, oldVal) {
      if (!curVal) {
        console.log('logout')
        this.data = {
          uid: undefined,
          name: 'wsd',
          sex: '男',
          signature: '做人若清泉，清澈，淡雅, 纯净',
          unreadTopcs: ['122313', '22290312'],
          avatar: require('../assets/Icon.jpg')
        }
        this.isLogin = false
      }
      console.log('homeUser', curVal, oldVal)
    }
  },
  mounted () {
    this.getHomeData()
  }
}
</script>

<style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

li{
  list-style: none;
}

ul{
  margin: 0;
  padding: 0;
}

  #home{
    background-color: #f2f2f2;
    padding: 15px 25px 15px 25px;
    height: 100%;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .selectList{
    display: inline-block;
    padding: 10px;
  }

  .selectListSelect{
    background-color: white;
    border-left: 1px dashed #e8e8e8;
    border-top: 1px dashed #e8e8e8;
    border-right: 1px dashed #e8e8e8;
  }
  .content{
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    background-color: white;
    padding: 12px 0 12px 8px;
    width: 98%;
    border: 1px dashed #e8e8e8;
    margin-top: -1px;
  }
  .personalInfo{
    border: 1px dashed #e8e8e8;
    padding: 10px;
    background-color: white;
  }
  .personalInfoHead{
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
  }
  .flexSpaceBetween{
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>