<template>
  <div class="tabbar">
    <slot></slot> 
  </div>
</template>

<script>
import TabbarItem from "./TabbarItem";
export default {
  name: 'Tabbar',
  components: {
    TabbarItem
  }
}
</script>

<style>
  .tabbar {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 49px;
    background-color: #f6f6f6;
    box-shadow: 0px -1px 3px rgba(200,200,200,0.1);
  }
</style>
