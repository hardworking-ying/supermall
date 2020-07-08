<template>
  <div v-if='Object.keys(goodRate).length != 0' class="good-rate">
    <div class="rate-head">
      <span class="user-comment">用户评价</span>
      <span class="more-rate">更多</span>
    </div>
    <div class="rate-detail">
      <div class="rate-user-info">
        <img :src="goodRate.user.avatar | imgFilter" alt="">
        <span class="rate-username">{{goodRate.user.uname}}</span>
      </div>
      <p class="rate-content">{{goodRate.content}}</p>
      <div class="rate-date">
        <span>{{goodRate.created | dateFilter}}</span>
        <span class="good-style">{{goodRate.style}}</span>
      </div>
      <div v-if='goodRate.images !== undefined' class="rate-images">
        <img v-for='(item,index) in goodRate.images' :key='index' :src="item | imgFilter" alt="">
      </div> 
    </div>
  </div>
</template>

<script>
import {formatDate} from 'common/util.js' 
export default {
  name: 'DetailGoodRate',
  props: {
    goodRate: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    imgFilter(value) {
      return 'http:' + value;
    },
    dateFilter(value) {
      let date = new Date(value);
      return formatDate(date, 'yyyy-mm-dd');
    }
  }
}
</script>

<style>
  .good-rate {
    padding: 20px 15px;
    border-bottom: 8px solid #f2f5f8;
  }
  .rate-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 10px;
    border-bottom: 2px solid #f2f5f8;
  }
  .user-comment {
    font-size: 18px;
  }
  .more-rate {
    font-size: 14px;
  }
  .rate-user-info {
    padding: 5px 0;
    line-height: 48px;
  }
  .rate-user-info img {
    width: 48px;
    height: 18px;
    vertical-align: middle;
    margin-right: 10px;
  }
  .rate-user-info .rate-username {
    font-size: 16px;
  }
  .rate-content {
    font-size: 14px;
    color: #777;
  }
  .rate-date {
    color: #999;
    font-size: 12px;
    padding: 10px 0;
  }
  .rate-date .good-style {
    margin-left: 8px;
  }
  .rate-images img {
    width: 64px;
    height: 64px;
  }
</style>