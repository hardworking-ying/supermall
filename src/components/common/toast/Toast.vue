<template>
  <div class="toast" v-show='isShow'>
    {{message}}
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      message:'',
      isShow: false,
    }
  },
  methods: {
    show(message, duration=1000) {
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      }, duration);
    }
  }
}
</script>

<style>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    z-index: 999;
    border-radius: 2px;
    padding: 8px 10px;
    color: #ffffff;
    background-color: rgba(0,0,0,.65);
  }
</style>