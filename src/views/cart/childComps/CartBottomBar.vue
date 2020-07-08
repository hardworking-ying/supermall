<template>
  <div class='cart-bottom-bar'>
    <div class='all-selector'>
      <check-button class='all-select-btn' :isChecked='isAllSelected' @click.native='allSelect'/>
      <span> 全选</span>
    </div>
    <div class='totalPrice'>合计:￥{{cartTotalPrice}}</div>
    <div class='count' @click='countPrice'>去计算({{cartSelectedLength}})</div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import { mapGetters } from 'vuex'
  import { ALL_SELECT, CANCLE_ALL_SELECT } from 'store/mutation-types'
  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton,
    },
    computed: {
      ...mapGetters(['cartLength','cartSelectedLength', 'cartTotalPrice']),
      isAllSelected() {
        if(!this.cartLength) return false;
        return this.cartLength === this.cartSelectedLength;
      },
    },
    methods: {
      allSelect() {
        if(this.isAllSelected)
          this.$store.commit(CANCLE_ALL_SELECT);
        else
          this.$store.commit(ALL_SELECT);
      },
      countPrice() {
        if(!this.cartLength) {
          this.$toast.show('请先添加商品！',1500);
        }else if(!this.cartSelectedLength){
          this.$toast.show('请先选择商品！',1500);
        }
      }
    },
  }
</script>

<style scoped>
  .cart-bottom-bar {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    background-color: #eee;
    font-size: 15px;
  }
  .all-selector {
    display: flex;
    padding: 0 10px;
  }
  .all-select-btn {
    margin-right: 5px;
  }
  .totalPrice {
    flex: 1;
  }
  .count {
    padding: 0 10px;
    height: 40px;
    line-height:40px;
    background-color: orange;
  }
</style>