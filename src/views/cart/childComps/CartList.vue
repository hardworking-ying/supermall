<template>
<div class="cart-list">
  <cart-list-item v-for="item in cartList" :key='item.iid' :product='item'></cart-list-item>
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import CartListItem from './CartListItem'
  export default {
    name: 'CartList',
    components: {
      CartListItem,
    },
    computed: {
      ...mapGetters(['cartList']),
    }
  }
</script>

<style>

</style>