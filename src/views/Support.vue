<template>
  <el-row class="support-container">
    <el-tabs v-model="activeName" type="card" @tab-click="clickHandler">
      <el-tab-pane label="Home" name="One">
        <component :is="component1" />
      </el-tab-pane>
      <el-tab-pane label="User Terms of Service" name="Two">
        <component :is="component2" />
      </el-tab-pane>
      <el-tab-pane label="Player Support" name="Three">
        <component :is="component3" />
      </el-tab-pane>
      <el-tab-pane label="iOS 14.5" name="Four">
        <component :is="component4" />
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script>
import One from '~components/support/One'
import Two from '~components/support/Two'
import Three from '~components/support/Three'
import Four from '~components/support/Four'

export default {
  name: 'Support',
  components: {
    One,
    Two,
    Three,
    Four
  },
  data() {
    return {
      activeName: 'One',
      component1: One,
      component2: Two,
      component3: Three,
      component4: Four
    }
  },
  methods: {
    clickHandler: function (instance) {
      console.info(instance.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.support-container {
  ::v-deep.el-tabs {
    .el-tabs__header {
      box-shadow: 0 0 0.2rem rgb(0 0 0 / 10%), 0 0.2rem 0.4rem rgb(0 0 0 / 20%);
      transition: transform 0.25s cubic-bezier(0.1, 0.7, 0.1, 1),
        box-shadow 0.25s;
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      right: 0;
      left: 0;
      z-index: 2;
      background-color: #ab47bd;

      .el-tabs__nav {
        border: none;

        .el-tabs__item {
          height: 48px;
          line-height: 47px;
          color: #fff;
          opacity: 0.7;
          font-size: 14px;
          font-weight: initial;
          border: none;

          &.is-active {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
