<template>
  <div class="shop-info">
    <div class="shop-name">
      <img :src="shopInfo.logo" alt="">
      <span>{{shopInfo.name}}</span>
    </div>
    <div class="shop-detail">
      <div class="shop-detail-left">
        <div class="shop-sells">
          <p class="sells-count">{{shortSells}}</p>
          <p class="sells-text">总销量</p>
        </div>
        <div class="shop-goodscount">
          <p class="goods-count">{{shopInfo.goodsCount}}</p>
          <p class="goods-text">全部宝贝</p>
        </div>
      </div>     
      <div class="shop-score">
        <table class="shop-score-table">
          <tr v-for='item in shopInfo.score' :key='item.index'>
            <td class="score-name">{{item.name}}</td>
            <td class="score-score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="score-level" :class="{'level-higher': item.isBetter}">{{item.isBetter? '高': '低'}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="enter-shop">
      <div class="btn-enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    shortSells() {
      let s = this.shopInfo.sells;
      if(s < 10000) return s;
      return (s/10000).toFixed(1)+'万';
    }
  }
}
</script>

<style>
  .shop-info {
    border-top: 5px solid #f2f5f8;
    border-bottom: 5px solid #f2f5f8;
    background-color: #fff;
  }
  .shop-name img{
    width: 60px;
    height: 60px;
    vertical-align: middle;
    margin: 0 6px;
  }
  .shop-name span{
    display: inline-block;
    line-height: 80px;
    font-size: 15px;
  }
  .shop-detail {
    display: flex;
    align-items: center;
  }
  .shop-detail-left, .shop-score {
    flex: 1;
  }
  .shop-detail-left {
    display: flex;
    justify-content: space-evenly;
    border-right: 2px solid #aaa;
  }
  .shop-sells, .shop-goodscount {
    text-align: center;
  }
  .sells-text, .goods-text {
    font-size: 12px;
  }
  .sells-count, .goods-count {
    font-size: 18px;
  }
  .shop-score-table {
    margin: 0 auto;
    font-size: 13px;
  }
  .shop-detail-left p, .shop-score-table td {
    line-height: 24px;
  }
  .shop-score-table td {
    padding: 0 5px;
  }
  .score-score {
    color: #5ea732;
  }
  .score-better {
    color: #f13e3a;
  }
  .score-level {
    font-size: 12px;
    color: #fff;
    background-color: #5ea732;
    border-radius: 1px;
  }
  .level-higher {
    background-color: #f13e3a;
  }
  .enter-shop {
    padding: 15px 0 20px;
    text-align: center;
  }
  .btn-enter-shop {
    width: 150px;
    height: 30px;
    background-color: #f2f5f8;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
    margin: 0 auto;
  }
</style>