import {debounce} from 'common/util.js'
import BackTop from 'components/content/backtop/BackTop'
import {BACK_POSITION} from 'common/const'

export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null,
      refresh: null,
    }
    
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImageListener = () => {
      this.refresh();
    }
    this.$bus.$on('itemImageLoaded',this.itemImageListener)
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop,
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollToTop(0, 0, 300);
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > BACK_POSITION;
    }
  },
}
