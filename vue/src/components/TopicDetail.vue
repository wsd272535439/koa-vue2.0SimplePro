<template>
  <div v-if="topic">
    <div style="padding: 10px;background-color: white" class="borderStyle">
      <div style="font-weight: bold;font-size: 15px">{{ topic.title }}</div>
      <div style="margin-top: 15px;font-size: 10px;color: #999999">{{ '发布于' + topic.created_at.timeStr() + '●' + '作者'
        + topic.user.name + '●' + topic.pv + '次浏览' + '●' + topic.comment + '个回复'
        }}
      </div>
      <div style="margin-top: 10px;border: 1px dashed #e8e8e8;"></div>
      <div style="margin-top: 15px;font-size: 13px;color: #333333">
        {{ topic.content }}
      </div>
    </div>
    <ul v-if="isComment">
      <li v-for="item in comments">
        <div style="margin-top: 10px;background-color: white" class="borderStyle">
          <div style="color: #333333;font-size: 13px;font-weight: bold">评论</div>
          <div style="margin-top: 10px;border: 1px dashed #e8e8e8;"/>
          <div style="margin-top: 10px;display: flex">
            <img v-bind:src="item.user.avatar" style="width: 50px;height: 50px"/>
            <div>
              <div style="font-size: 12px;font-weight: bold">{{ item.user.name }}
                <span style="margin-left: 4px;font-size: 10px;color: #999999">{{ item.created_at.timeStr() }}</span>
              </div>
              <div style="font-size: 13px;color: #666666;margin-top: 5px">{{ item.content }}</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-else style="margin-top: 10px;background-color: white;" class="borderStyle">
      <div style="font-weight: bold;font-size: 15px">评论</div>
      <div style="margin-top: 10px;border: 1px dashed #e8e8e8;"/>
      <textarea v-model="comment" style="margin-top: 8px;display: block;width: 100%;box-sizing:border-box;height: 150px" class="borderStyle"></textarea>
      <div v-on:click="submitComment">
        <mt-button type="default" style="margin-top: 15px;font-size: 12px;height: 35px">提交</mt-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'topicItem',
    props: ['statusCall'],
    data () {
      return {
        topicId: this.$route.query.topicId,
        user: JSON.parse(window.localStorage.getItem('user')),
        isPublish: this.$route.query.isPublish,
        topic: undefined,
        comments: [],
        isComment: false
      }
    },
    methods: {
      submitComment () {
        if (this.comment.length < 8){
          this.$toast('评论字符不能少于8个')
          return
        }
        this.$http.post('http://localhost:3000/comment', { topicId:this.topicId, user: {uid:this.user.uid}, content:this.comment }).then(response => {
          if (response.data.code === 0) {
            console.log(response)
            this.comments = response.data.result.comments
            this.isComment = true
            this.$toast(response.data.message)
          } else {
            this.$toast(response.data.error)
          }
        }, reponse => {
        })
      }
    },
    mounted () {
      if (this.isPublish) {
        this.statusCall('发布成功')
      }
      this.$http.post('http://localhost:3000/topicDetail', { topicId: this.topicId,uid:this.user.uid }).then(response => {
        if (response.data.code === 0) {
          console.log(response)
          this.topic = response.data.result.topic
          this.isComment = response.data.result.isComment === 1 ? true : false
          this.comments = response.data.result.comments
          this.$toast(response.data.message)
          console.log('isComment', response.data.result.isComment)
        } else {
          this.$toast(response.data.error)
        }
      }, reponse => {

      })
    }
  }
</script>

<style>

</style>