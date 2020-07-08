<template>
  <div class="cart-list-item" > 
    <div class="item-selector">
      <check-button :isChecked='product.checked' @click.native='checkClick'/>
    </div>
    <div class="item-img">
      <img :src="product.img" alt="" >
    </div>
    <div class="item-info">
      <div class="title-desc">
        <div class="item-title">{{product.title}}</div>
        <div class="item-desc">{{product.desc}}</div>
      </div>
      <div class="price-count">
        <div class="price">￥{{product.price}}</div>
        <div class="count">x {{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  export default {
    name: 'CartListItem',
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      CheckButton,
    },
    methods: {
      checkClick() {
        this.product.checked = !this.product.checked;
      },
     
    }
  }
</script>

<style scoped>
  .cart-list-item {
    display: flex;
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .item-selector {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
  .item-img img {
    display: block;
    width: 80px;
    height: 100px;
    border-radius: 4px;
  }
  .item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }
  .item-title, .item-desc {
    color: #333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 5px 10px;
  }
  .item-title {
    font-size: 16px;
  }
  .item-desc {
    font-size: 13px;
    color: #666;
  }
  .price-count {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
  }
  .price {
    color: orangered;
  }
 
</style>