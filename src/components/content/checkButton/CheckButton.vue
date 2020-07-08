<template>
  <div class="check-btn" :class="{'selector-active': isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
  .check-btn {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }
  .selector-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>