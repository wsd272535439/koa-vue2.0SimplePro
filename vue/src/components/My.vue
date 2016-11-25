<template>
  <div id="app">
    <h1>{{ todo }}</h1>
    <button v-on:click="reverseMessage">Reverse Message</button>
  </div>
</template>

<script type="text/ecmascript-6">
export default{
  name: 'app',
  data () {
    return {
      message: 'Hello Vue.js'
    }
  },
  methods: {
    reverseMessage () {
      this.message = this.message.split('').reverse().join('')
    }
  }
  props: ['todo']
}
</script>

