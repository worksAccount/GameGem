<template>
  <el-row class="support-container">
    <filter-header @click="clickHandler" />

    <el-row class="content-container">
      <component :is="currentComponent" />
    </el-row>
  </el-row>
</template>

<script>
import FilterHeader from '~components/support/FilterHeader'
import One from '~components/support/One'
import Two from '~components/support/Two'
import Three from '~components/support/Three'
import Four from '~components/support/Four'

export default {
  name: 'Support',
  components: {
    FilterHeader,
    One,
    Two,
    Three,
    Four
  },
  data() {
    return {
      activeName: 'One',
      currentComponent: One
    }
  },
  methods: {
    clickHandler: function (data) {
      const id = data.id
      const compList = [One, Two, Three, Four]
      this.currentComponent = compList[id]

      setTimeout(() => {
        document.getElementsByClassName('content-container')[0].scrollTop = 0
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.support-container {
  width: 100%;
  height: 100%;

  .content-container {
    width: 100%;
    height: calc(
      100% - 48px
    ); /* header`s height 48px; page padding`s height 10px  */
    overflow-y: auto;
  }

  /*::v-deep.el-tabs {
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
  }*/
}
</style>
