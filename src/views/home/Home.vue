<template>
  <div id="home">
    <navbar class='home-nav'>
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </navbar>
    <tab-control class="fix-tab-control" 
      :title="['流行', '新款', '精选']" 
      @tabClick='tabClick'
      ref='fixtabcontrol'
      v-show='isFixedTabControl'/>
    <better-scroll 
      class="content" ref='scroll' 
      :probeType='3'
      :pullUpLoad=true 
      @scroll='scrollContent'
      @pullingup='loadMore'>
      <home-swiper :banner='banners' @swiperLoaded='swiperLoaded'></home-swiper>
      <recommend-view :recommends='recommends'></recommend-view>
      <feature-view/>
      <tab-control class="tab-control" 
        :title="['流行', '新款', '精选']" 
        @tabClick='tabClick'
        ref='tabcontrol'/>
      <goodList :goods='goods[currentType].list'/>
    </better-scroll>

    <back-top @click.native='backClick' v-show='isShowBackTop'/>
    
  </div>
</template>

<script>
  import Navbar from 'components/common/navbar/Navbar'
  import BetterScroll from 'components/common/scroll/BetterScroll'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import GoodList from 'components/content/goodList/GoodList'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import {debounce} from 'common/util'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'

  export default {
    name: "Home",
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list:[]},
          'new': {page: 0, list:[]},
          'sell': {page: 0, list:[]},
        },
        currentType: 'pop',
        isFixedTabControl: false,
        tabOffsetTop: 0,
        scrollY: 0,
      }
    },
    components: {
      Navbar,
      BetterScroll,
      TabControl,
      GoodList,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    created() {
      this.getHomeMultidata();

      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
      //防抖, 监听图片加载完成
      // const refresh = debounce(this.$refs.scroll.refresh, 500);
      // this.$bus.$on('homeImageLoaded', () => {
      //   // this.$refs.scroll.refresh(); 每加载一张图片就刷新scroll，十分消耗性能
      //   refresh();
      // })
    },
    activated() {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollToTop(0, this.scrollY, 0);
    },
    deactivated() {
      //记录滚动条的位置
      this.scrollY = this.$refs.scroll.scroll.y;
      //关闭图片加载监听
      this.$bus.$off('itemImageLoaded', this.itemImageListener);
    },
    methods: {
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        let page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp();
        })
      },
      tabClick(index) {
        switch(index) {
          case 0: this.currentType = 'pop'; break;
          case 1: this.currentType = 'new'; break;
          case 2: this.currentType = 'sell'; break;
        }
        this.$refs.tabcontrol.currentIndex = index;
        this.$refs.fixtabcontrol.currentIndex = index;
      },
      
      scrollContent(position) {
        this.listenShowBackTop(position);
        this.isFixedTabControl = (-position.y) > this.tabOffsetTop;
      },
      loadMore() {
        // console.log('上拉加载更多')
        this.getHomeGoods(this.currentType);
        this.$refs.scroll.scroll.refresh();
      },
      swiperLoaded() {
        //tabControl距离顶部的距离
        this.tabOffsetTop = this.$refs.tabcontrol.$el.offsetTop;
      },
    },
    mixins: [itemListenerMixin, backTopMixin]
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    padding-bottom: 49px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
  .content {
    height: calc(100vh - 49px);
    overflow: hidden;
  }
  .fix-tab-control {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    z-index: 9;
  }
</style>
