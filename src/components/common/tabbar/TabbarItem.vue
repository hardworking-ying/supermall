<template>
  <div class="tabbar-item" @click='tabbarClick'>
    <div v-if='!isActive'><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style='activeStyle'><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabbarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#ee5192'
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      // console.log(this.$route)y
      
      // console.log(this.path)
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods: {
    tabbarClick() {
      this.$router.push(this.path);
      
    }
  }
}
</script>

<style>
  .tabbar-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
    margin-top: 4px;
  }
  .tabbar-item img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }
  .active{
    color: #ee5192
  }
</style>
