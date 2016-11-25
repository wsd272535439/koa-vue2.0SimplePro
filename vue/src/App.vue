<template>
  <div id="app">
    <img src="./assets/logo.png">
    <my v-bind:todo='todo'></my>
    <router-view></router-view>
  </div>
</template>

<script>
import My from './components/My'

export default {
  name: 'app',
  data () {
    return {
      todo: 'wwllss'
    }
  },
  components: {
    My
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
