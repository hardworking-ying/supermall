<template>
  <div ref='wrapper'>
    <div>
      <slot></slot>
    </div>
    
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'BetterScroll',
    data() {
      return {
        scroll: null
      } 
    },
    props: {
      /**
       *  0：默认值，不侦测当前滚动位置
       *  1：不侦测当前滚动位置
       *  2：手指在屏幕上时侦测当前滚动位置，不侦测手指移开屏幕后的惯性滚动
       *  3：侦测所有滚动
       */
      probeType: {
        type: Number,
        default: 1,
      },
      /**
       * 点击列表是否派发click事件
       */
      click: {
        type: Boolean,
        default: true
      },
      
      /**
       * 是否派发滚动到底部的事件，用于上拉加载
       */
      pullUpLoad: {
        type: Boolean,
        default: false
      },
     
      refreshDelay: {
        type: Number,
        default: 20
      }
  
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad,
      });

      this.scroll.scrollTo(0, 0);
      if(this.probeType===2 || this.probeType===3){
        this.scroll.on('scroll', position => {
          this.$emit('scroll', position);
        });
      }
      
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingup')
        })        
      }
      
    },
    methods: {
      scrollToTop(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time);
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp();
      },
    }
  }
</script>

<style scope>
 
</style>