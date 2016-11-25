<template>
    <div style="width: 100%;">
      <ul>
        <li v-for="(title, title_index) in titles" v-bind:class="[title_index === selectIndex ? selectListSelect : '', selectList]"  v-on:click="selected(title,title_index)">{{ title }}</li>
      </ul>
      <ul v-if="topics">
        <li v-for="topic in topics" v-on:click="toDetail(topic._id)">
          <div class="content">
            <img v-bind:src="topic.user.avatar" style="width: 50px;height: 50px;"/>
            <div style="margin-left: 4px">
              <p style="font-size: 14px;font-weight: bold">{{ topic.title }}</p>
              <div style="margin-top: 15px;font-size: 10px;color: #999999">{{ '发布于' + topic.created_at.timeStr() + '●' + '作者'
                + topic.user.name + '●' + topic.pv + '次浏览' + '●' + topic.comment + '个回复'
                }}
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div v-if="pageNums" style="margin-top: 15px">
        <span v-if="forwardShow" style="padding: 6px">
          <img src="../assets/back@2x.png" style="width: 10px;height: 18px"/>
        </span>
        <ul>
          <li v-for="page in pageNums" style="display: inline-block">
            <div v-on:click="pageClick(page)" v-bind:class="page === selectPage ? pageSelectStyle : pageDefaultStyle " style="border: 1px solid #E8E8E8;border-radius: 2px ">
              {{ page }}
            </div>
          </li>
        </ul>
        <span v-if="afterShow">
          <img src="../assets/icon_right@2x.png" style="width: 10px;height: 18px"/>
        </span>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'topicItem',
    data () {
      return {
        titles: ['全部', '问答', '分享', '吐槽', '招聘'],
        selectIndex: 0,
        selectListSelect: 'selectListSelect',
        selectList: 'selectList',
        topics: undefined,
        pageNums: undefined,
        forwardShow: undefined,
        afterShow: undefined,
        selectPage: 1,
        pageSelectStyle: 'pageSelect',
        pageDefaultStyle: 'pageDefault'
      }
    },
    props: ['data'],
    methods: {
      pageClick (page) {
        this.selectPage = page
        this.getTopicData()
      },
      toDetail (topicId) {
        this.$router.push({path: '/topicDetail', query: {topicId: topicId}})
        console.log('id', this.topics)
      },
      selected (title, index) {
        if (index === this.selectIndex) {
          return
        } else {
          this.selectIndex = index
          this.getTopicData()
        }
      },
      getTopicData () {
//        console.log('getdat')
        let user = JSON.parse(window.localStorage.getItem('user'))
        if (user) {
          this.isLogin = true
          this.$http.post('http://localhost:3000/getTopics', {tab: this.titles[this.selectIndex], uid: user.uid, page: this.selectPage}).then(response => {
            if (response.data.code === 0) {
              let topics = response.data.result.topics
              let count = response.data.result.topicCount
              if (topics.length > 0) {
                this.topics = topics
                var pages = []
                for (let i = 0; i < parseInt(count / 2); i++) {
                  pages.push(i + 1)
                }
                this.pageNums = pages
                console.log(topics)
              } else {
                this.topics = undefined
                this.pageNums = undefined
              }
            } else {
              this.$toast(response.data.error)
            }
          }, reponse => {
          })
        }
      }
    },
    mounted () {
      this.getTopicData()
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
  .pageSelect{
    padding: 10px 15px 10px 15px;
    background-color: #999999;
  }
  .pageDefault{
    padding: 10px 15px 10px 15px;
    background-color: white;
  }
  li{
    list-style: none;
  }

  ul{
    margin: 0;
    padding: 0;
  }
</style>