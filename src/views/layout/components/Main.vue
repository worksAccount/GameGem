<template>
  <transition name="fade-transform" mode="out-in">
    <keep-alive :include="cachedViews">
      <router-view :key="key" />
    </keep-alive>
  </transition>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      cachedViews: []
    }
  },
  computed: {
    key: function () {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
