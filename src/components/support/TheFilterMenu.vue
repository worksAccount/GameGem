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
      <el-row class="menu-item" :key="index">
        <div @click="menuClickHandler(item)">{{ item.title }}</div>
      </el-row>
    </template>
  </el-popover>
</template>

<script>
export default {
  name: 'TheFilterMenu',
  data() {
    return {
      visible: false,
      menuList: [
        {
          id: 0,
          title: 'Home'
        },
        {
          id: 1,
          title: 'User Terms of Service'
        },
        {
          id: 2,
          title: 'Player Support'
        },
        {
          id: 3,
          title: 'iOS 14.5'
        }
      ],
      checked: []
    }
  },
  methods: {
    clickHandler: function () {
      this.visible = !this.visible
    },

    menuClickHandler: function (item) {
      this.visible = !this.visible
      this.$emit('menuItemClick', item)
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
