<template>
  <el-popover
    v-model="visible"
    placement="bottom"
    title=""
    width="200"
    trigger="manual"
  >
    <span slot="reference" @click="clickHandler">
      <slot></slot>
    </span>

    <template v-for="(item, index) in menuList">
      <el-row v-show="showFilter(item)" class="menu-item" :key="index">
        <div @click="menuClickHandler(item)">{{ item.name }}</div>
      </el-row>
    </template>
  </el-popover>
</template>

<script>
export default {
  name: 'TheMenu',
  props: {
    menuList: {
      type: Array
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    clickHandler: function () {
      this.visible = !this.visible
    },

    menuClickHandler: function (item) {
      this.visible = !this.visible
      this.$emit('menuItemClick', item)
    },

    showFilter: function (item) {
      let res = true
      if (item.name === 'User Center' && this.$route.path === '/userCenter') {
        res = false
      }

      // todo 已登录 不展示 sign up 和 log in

      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-item {
  padding: 0 14px;
  line-height: 44px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  color: #666;
  display: block;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
    opacity: 0.7;
  }
}
</style>
