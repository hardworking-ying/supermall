<template>
  <tabbar>
    <tabbar-item path="/home">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/home.svg" alt />
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/home_active.svg" alt />
      </template>
      <template v-slot:item-text>
        <div>首页</div>
      </template>
    </tabbar-item>
    <tabbar-item path="/category">
      <template v-slot:item-icon>
      <img src="~assets/img/tabbar/category.svg" alt />
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/category_active.svg" alt />
      </template>
      <template v-slot:item-text>
        <div>分类</div>
      </template>
    </tabbar-item>
    <tabbar-item path="/cart">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/shopcart.svg" alt />
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/shopcart_active.svg" alt />
      </template>
      <template v-slot:item-text>
        <div>购物车</div>
      </template>
    </tabbar-item>
    <tabbar-item path="/profile">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/profile.svg" alt />
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/profile_active.svg" alt />
      </template>
      <template v-slot:item-text>
        <div>我的</div>
      </template>
    </tabbar-item>
  </tabbar>
</template>

<script>
import TabbarItem from "components/common/tabbar/TabbarItem";
import Tabbar from "components/common/tabbar/Tabbar";
export default {
  name: "MainTabbar",
  components: {
    TabbarItem,
    Tabbar
  }
};
</script>

<style>
</style>
