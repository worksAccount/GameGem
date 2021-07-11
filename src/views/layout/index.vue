<template>
  <el-row class="layout-container">
    <top-banner />

    <Navbar />

    <Main />

    <Footer />
  </el-row>
</template>

<script>
import { TopBanner, Navbar, Main, Footer } from './components'

import ResizeHandlerMixin from '~views/layout/mixin/ResizeHandler'

export default {
  name: 'index',
  components: {
    TopBanner,
    Navbar,
    Main,
    Footer
  },
  mixins: [ResizeHandlerMixin]
}
</script>

<style lang="scss" scoped></style>
