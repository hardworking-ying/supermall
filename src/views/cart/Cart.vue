<template>
<div class='cart'>
  <navbar class='cart-navbar'>
    <template v-slot:center>
      <div>购物车<span v-if='length'>({{length}})</span></div>
    </template>
  </navbar>
  <better-scroll :probeType='3' class='cart-content' ref='scroll'>
    <cart-list/>
  </Better-scroll>
  <cart-bottom-bar />
</div>
  
</template>

<script>
  import Navbar from 'components/common/navbar/Navbar'
  import BetterScroll from 'components/common/scroll/BetterScroll'

  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      Navbar,
      BetterScroll,

      CartList,
      CartBottomBar,
    },
    computed: {
      //mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
      //1.写法一：...mapGetters(['cartLength']),
      //2.也可以使用对象形式为getters属性重命名
      ...mapGetters({
        'length' : 'cartLength',
        'list' : 'cartList',
      })
    },
    
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .cart-navbar {
    background-color: var(--color-tint);
    color: #fff;
  }
  .cart-content {
    height: calc(100% - 49px - 44px - 40px);
    overflow: hidden;
  }
</style>
