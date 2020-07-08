<template>
  <swiper>
    <swiperItem v-for="item in banner" :key="item.link" class="swiper-item">
      <a :href="item.link">
        <img :src="item.image" @load='swiperImgLoaded'/>
      </a>
    </swiperItem>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isSwiperLoaded: false,
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    swiperImgLoaded() {
      if(this.isSwiperLoaded) return;
      this.isSwiperLoaded = true;
      this.$emit('swiperLoaded');
    }
  }
};
</script>

<style scoped>
  /* .swiper-item img{
    width: 100vw;
  } */
</style>
