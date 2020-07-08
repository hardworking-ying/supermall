<template>
  <navbar>
    <template v-slot:left>
      <div class="back" @click="backClick"><img src="~assets/img/common/back.svg" alt=""></div>
    </template>
    <template v-slot:center>
      <div class="tabs">
        <div v-for='(item, index) in titles' :key='item' @click='tabClick(index)' :class="{active: currentIndex===index}">{{item}}</div>
      </div>
    </template>
  </navbar>
</template>

<script>
import Navbar from 'components/common/navbar/Navbar'
export default {
  name: 'DetailNavbar',
  data() {
    return {
      currentIndex: 0,
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Navbar,
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index;
      this.$emit('themeChange', index);
    },
    backClick() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
  .back {
    text-align: center;
  }
  .back img {
    width: 20px;
    height: 20px;
    margin-top: 13px;
  }
  .tabs {
    display: flex;
    font-size: 14px;
  }
  .tabs div {
    flex: 1;
    text-align: center;
  }
  .active {
    color: var(--color-high-text);
  }
</style>