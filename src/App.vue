<template>
  <div id="app">
    <el-backtop />

    <router-view />
  </div>
</template>

<style lang="scss" scoped>
::v-deep .el-backtop {
  i {
    color: #7359a4;
  }
}
</style>

<style lang="scss">
@import '~assets/style';
</style>
