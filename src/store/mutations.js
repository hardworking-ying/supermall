import {
  ADD_TO_CART,
  ADD_COUNTER,
  ALL_SELECT,
  CANCLE_ALL_SELECT,
} from './mutation-types'

export default {
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    //let oldProduct = null;

    // for(let item of state.cartList) {
    //   if(item.iid === payload.iid) {
    //     oldProduct = item;
    //     break;
    //   }
    // }
    payload.checked = true;
    state.cartList.push(payload);
  },
  [ALL_SELECT](state) {
    state.cartList.forEach(item => item.checked = true);
  },
  [CANCLE_ALL_SELECT](state) {
    state.cartList.forEach(item => item.checked = false);
  }
}