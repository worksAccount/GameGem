<template>
  <div class="logo" @click="goIndex">LOGO GameGem</div>
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
}
</style>
