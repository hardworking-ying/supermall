<template>
  <div class="detail">
    <detail-navbar class='navbar' 
      :titles='["商品","参数","评论","推荐"]'
      @themeChange='scrollToTheme'
      ref='nav'/>
    <better-scroll :probeType='3' class="content"
      @scroll='scrollContent'
      ref='scroll'>
      <detail-swiper :bannerImgs='bannerImgs'/>
      <detail-good-info :good="good"/>
      <detail-shop-info :shopInfo='shopInfo'/>
      <detail-good-detail :detailInfo='detailInfo' @detailImageLoaded='detailImageLoaded'></detail-good-detail>
      <detail-params-info ref='params' :paramInfo='paramsInfo'></detail-params-info>
      <detail-good-rate ref='comment' :goodRate='goodRate'></detail-good-rate>
      <good-list ref='recommend' :goods='recommendGoods'/>
    </better-scroll> 
    <detail-bottom-bar @addToCart='addToCart'/>
    <back-top @click.native='backClick' v-show='isShowBackTop'/>
  </div>
</template>

<script>
import DetailNavbar from './childComps/DetailNavbar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailGoodInfo from './childComps/DetailGoodInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodDetail from './childComps/DetailGoodDetail'
import DetailParamsInfo from './childComps/DetailParamsInfo'
import DetailGoodRate from './childComps/DetailGoodRate'
import DetailBottomBar from './childComps/DetailBottomBar'

import BetterScroll from 'components/common/scroll/BetterScroll'
import Toast from 'components/common/toast/Toast'
import GoodList from 'components/content/goodList/GoodList'

import {getDetailInfo, getRecommend, Good, Shop, GoodsParam} from 'network/detail'
import {debounce} from 'common/util'
import {itemListenerMixin, backTopMixin} from 'common/mixin'
import { mapActions } from 'vuex'
export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      bannerImgs: [],
      good: {},
      shopInfo: {},
      detailInfo: {},
      paramsInfo: {},
      goodRate: {},
      recommendGoods: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentThemeIndex: 0,
      toastMessage: '',
      isShowToast: false,
    }
  },
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailGoodInfo,
    DetailShopInfo,
    DetailGoodDetail,
    DetailParamsInfo,
    DetailGoodRate,
    DetailBottomBar,

    BetterScroll,
    Toast,
    GoodList,

  },
  created() {
    this.iid = this.$route.params.iid;
    this.getDetail(this.iid);
    this.getRecommendGoods();
    this.getThemeTopY = debounce(()=>{
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    },300)
    /*尝试一：this.$refs.params.$el还未渲染出来
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);
    */
  },
/* 方式一  
  updated() {
    this.themeTopYs = [];
    this.themeTopYs.push(0);
    this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    console.log(this.themeTopYs);
  },*/
  destory() {
    this.$bus.$off('itemImageLoaded', this.itemImageListener)
  },
  // mounted() {
  //   //防抖, 监听图片加载完成
  //   const refresh = debounce(this.$refs.scroll.refresh, 500);
  //   this.$bus.$on('detailImageLoaded', () => {
  //     refresh();
  //   })
  // },
  methods: {
    getDetail(iid) {
      getDetailInfo(iid).then(res => {
        let data = res.result;
        //1.获取轮播图片
        this.bannerImgs = data.itemInfo.topImages;
        //2.获取商品基本信息
        this.good = new Good(data.itemInfo, data.columns, data.shopInfo.services);
        //3.获取店铺信息
        this.shopInfo = new Shop(data.shopInfo);
        //4.获取商品详细信息
        this.detailInfo = data.detailInfo;
        //5.获取商品参数信息
        this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        //6.获取商品评价信息
        if(data.rate.cRate) {
          this.goodRate = data.rate.list[0];
        }

      //尝试二：数据加载完，但是图片还没加载出来，offsetTop不包含图片
      /*  this.$nextTick(() => {
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          console.log(this.themeTopYs);
        }); 
      */
      })
    },
    getRecommendGoods() {
      getRecommend().then(res => {
        this.recommendGoods = res.data.list;
      })
    },
    scrollContent(position) {
      let length = this.themeTopYs.length;
      let y = -position.y;
      for(let i=0; i<length-1; i++) {
        if(this.currentThemeIndex!=i && y+44>=this.themeTopYs[i] && y+44<this.themeTopYs[i+1]) {
          this.currentThemeIndex = i;
          this.$refs.nav.currentIndex = i;
        }
      }
      this.listenShowBackTop(position);
    },
    detailImageLoaded() {
      this.refresh();
      this.getThemeTopY();
    },
    scrollToTheme(index) {
      this.$refs.scroll.scrollToTop(0, -this.themeTopYs[index]+44, 200);
      this.currentThemeIndex = index;
    },
    addToCart() {
      const product = {};
      product.iid = this.iid,
      product.img = this.bannerImgs[0],
      product.title = this.good.title,
      product.desc = this.good.desc,
      product.price =  this.good.realPrice,
      
      // this.$store.commit('addCart', product);
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // });
      this.addCart(product).then(res => {
        // this.toastMessage = res;
        // this.isShowToast = true;

        // setTimeout(() => {
        //   this.isShowToast = false;
        //   this.toastMessage = res;
        // }, 1000);
        this.$toast.show(res, 1000);
      });
    },
    ...mapActions(['addCart']),
  },
  mixins: [itemListenerMixin, backTopMixin]
}
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    height: 100vh;
    background-color: #fff;
  }
  .navbar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100vh - 44px - 49px);
    overflow: hidden;
  }
</style>