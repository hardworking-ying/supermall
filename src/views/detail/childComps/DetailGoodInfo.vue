<template>
  <div v-if='Object.keys(good).length !== 0' class="base-info">
    <div class="info-title">{{good.title}}</div>
    <div class="info-price">
      <span class="n-price">{{good.newPrice}}</span>
      <span v-if="good.oldPrice" class="o-price">{{good.oldPrice}}</span>
      <span v-if="good.discount" class="discount">{{good.discount}}</span>
    </div>
    <div class="info-others">
      <div v-for='item in good.columns' :key='item.index' class="info-others-item">
        {{item}}
      </div>
      <!-- <div class="info-others-item">{{good.services[good.services.length-1].name}}</div> -->
    </div>
    <div class="info-services">
      <div v-for='index in good.services.length-1' :key='index' class="services-item">
        <img :src="good.services[index-1].icon" alt="">
        <span>{{good.services[index-1].name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodInfo',
  props: {
    good: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style>
  .base-info {
    padding: 0 10px;
  }
  .info-title {
    padding: 12px 0;
    font-size: 16px;
  }
  .n-price {
    font-size: 20px;
    font-weight: bold;
    color: var(--color-high-text);
  }
  .o-price {
    font-size: 14px;
    text-decoration: line-through;
    margin: 0 10px;
  }
  .discount {
    position: relative;
    top: -2px;
    color: #fff;
    font-size: 12px;
    background-color: var(--color-high-text);
    padding: 2px;
    border-radius: 4px;
  }
  .info-others {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding: 16px 0 4px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    color: #aaa;
  }
  .info-others-item {
    flex: 1;
  }
  .info-services {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
  }
  .services-item {
    color: #333;
    font-size: 12px;
  }
  .services-item img {
    width: 12px;
    height: 12px;
  }
</style>