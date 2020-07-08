<template>
  <div id="app">
    <keep-alive exclude='Detail'>
      <router-view/>
    </keep-alive>
    <main-tabbar/>
  </div>
</template>

<script>
  import MainTabbar from 'components/content/MainTabbar'

  export default {
    name: 'App',
    components: {
      MainTabbar,
    }
  }
</script>

<style>
  @import url('assets/css/base.css');
</style>
