<template>
  <div class="good-list-item" @click="itemClick">
    <img v-lazy="showImage" alt @load="imageLoaded" />
    <div class="good-info">
      <p class="good-title">{{good.title}}</p>
      <span class="good-price">{{good.price}}</span>
      <span class="good-cfav">{{good.cfav}}</span>
    </div>
  </div>
</template>

<script>
import GoodListItem from "./GoodListItem";
export default {
  name: "GoodListItem",
  props: {
    good: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showImage() {
      return this.good.image || this.good.show.img
    }
  },
  methods: {
    imageLoaded() {
      // if(this.$route.path.indexOf('/home'))
      //   this.$bus.$emit("homeImageLoaded");
      // else if(this.$route.path.indexOf('/detail')) {
      //   this.$bus.$emit("detailImageLoaded")
      // }
      this.$bus.$emit('itemImageLoaded')
    },
    itemClick() {
      if(this.good.iid !== undefined)
        this.$router.push("/detail/" + this.good.iid);
      else{
        this.$router.push("/detail/" + this.good.item_id);
      }
    }
  }
};
</script>
  
<style scoped>
.good-list-item {
  width: 48%;
}
.good-list-item img {
  width: 100%;
  border-radius: 5px;
}
.good-info {
  font-size: 14px;
  text-align: center;
  margin: 4px 0;
}
.good-title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  margin-bottom: 2px;
}
.good-price {
  color: var(--color-high-text);
  padding: 0 4px;
}
.good-cfav {
  margin-left: 20px;
  position: relative;
}
.good-cfav::before {
  display: inline-block;
  content: "";
  width: 14px;
  height: 14px;
  position: absolute;
  top: 1px;
  left: -15px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
