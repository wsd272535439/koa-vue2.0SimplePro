<template>
  <div>
    <ul>
      <li v-for="article in articles">
        {{ article }}
      <li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      articles: ['123', '456']
    }
  },
  mounted () {
    console.log('data', this)
    this.articles = ['4444', '5555']
    this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
      headers: {
      },
      emulateJSON: true
    }).then(function (response) {
      this.articles = response.data.subjects
    }, function (response) {
      console.log(response)
    })
  }
}
</script>