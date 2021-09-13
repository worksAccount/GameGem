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
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters(['u_id', 'u_name'])
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
      if (item.name === 'Sign Up' || item.name === 'Log In') {
        if (this.u_id) res = false
      }

      if (item.name === 'User Center') {
        if (this.$route.path === '/userCenter') {
          // 用户中心页 不展示 用户中心页导航
          res = false
        }

        if (!this.u_id) res = false
      }

      if (item.name === 'Home') {
        if (this.$route.path === '/index') {
          // 首页 不展示 首页导航
          res = false

          if (!this.u_id) res = false
        }
      }

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
