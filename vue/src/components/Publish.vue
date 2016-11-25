<template>
  <div class="topicBack">
    <div class="topicContent borderStyle">
      <div style="font-size: 15px;font-weight: bold">发表话题</div>
      <div style="margin-top: 8px">*版块</div>
      <select class="borderStyle" v-model="topic.tab">
        <option>问答</option>
        <option>分享</option>
        <option>吐槽</option>
        <option>招聘</option>
      </select>
      <div style="margin-top: 8px">*标题</div>
      <input v-model="topic.title" type="text" class="borderStyle" style="width: 94%;margin-top: 4px" placeholder="标题字数不少于10字">
      <div style="margin-top: 8px">*内容</div>
      <textarea v-model="topic.content" class="borderStyle" style="width: 94%;margin-top: 4px;height: 44%" placeholder="标题字数不少于10字"/>
      <div v-on:click="publishTopic">
        <mt-button type="default" style="padding: 8px 15px 8px 15px;margin-top: 8px;font-size: 12px;">发布</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'topic',
    data () {
      return {
        topic: {
          content: '',
          title: '',
          tab: ''
        }
      }
    },
    methods: {
      publishTopic () {
        let user = JSON.parse(window.localStorage.getItem('user'))
        this.$http.post('http://localhost:3000/publish', {uid: user.uid, content: this.topic.content, title: this.topic.title, tab: this.topic.tab, pv: 0}).then(response => {
          if (response.data.code === 0) {
            this.$toast(response.data.message)
            this.$router.push({path: '/topicDetail', query: {topicId: response.data.result.topic, isPublish: true}})
          } else {
            this.$toast(response.data.error)
          }
        }, reponse => {
        })
      }
    }
  }
</script>

<style>
  .topicBack{
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    position: absolute;
    width: 90%;
    height: 100%;
    padding: 15px 30px 15px 30px;
    justify-content: space-between;
  }
  .topicContent{
    padding: 5px;
    position: relative;
    width: 60%;
    height: 80%;
    background-color: white;
  }
  .borderStyle{
    border: 1px dashed #e8e8e8;
    padding: 8px;
  }
  select {
    /*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/

    /*很关键：将默认的select选择框样式清除*/
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    width: 100px;
    /*在选择框的最右侧中间显示小箭头图片*/
    background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;

    /*为下拉小箭头留出一点位置，避免被文字覆盖*/
    padding: 8px;
  }


  /*清除ie的默认选择框样式清除，隐藏下拉箭头*/
  select::-ms-expand { display: none; }
</style>