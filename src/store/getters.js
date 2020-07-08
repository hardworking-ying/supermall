export default {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  },
  cartTotalPrice(state) {
    return state.cartList
    .filter(item => item.checked === true)
    .reduce( (total, item) => total += item.price*item.count, 0)
    .toFixed(2);
  },
  cartSelectedLength(state) {
    return state.cartList.filter(item => item.checked===true).length;
  },
}