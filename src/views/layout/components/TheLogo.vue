<template>
  <div class="logo" @click="goIndex">
    <div class="image"><img :src="imgLogo" /></div>
    <div>GameGem</div>
  </div>
</template>

<script>
export default {
  name: 'TheLogo',
  props: {
    allowClick: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      imgLogo: require('@/assets/logo.png')
    }
  },
  methods: {
    goIndex: function () {
      if (!this.allowClick) return

      if (this.$route.path !== '/index') {
        this.$router.push({
          path: '/'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  line-height: 60px;
  padding: 0 30px;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;

  .image {
    margin-right: 10px;
    display: flex;

    img {
      width: 55px;
      height: 55px;
    }
  }
}
</style>
