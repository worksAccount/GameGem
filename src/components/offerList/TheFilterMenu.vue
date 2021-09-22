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
        <template v-if="item.id === 2">
          <category-menu
            ref="categoryMenu"
            placement="right"
            @change="function (val) { changeHandler('category', val) }"
          >
            <div>{{ item.title }}</div>
          </category-menu>
        </template>

        <template v-else-if="item.id === 3">
          <sort-menu
            ref="sortMenu"
            placement="right"
            @change="function (val) { changeHandler('sort', val) }"
          >
            <div>{{ item.title }}</div>
          </sort-menu>
        </template>

        <template v-else>
          <div @click="menuClickHandler(item)">{{ item.title }}</div>
        </template>
      </el-row>
    </template>
  </el-popover>
</template>

<script>
import CategoryMenu from '~components/offerList/CategoryMenu'
import SortMenu from '~components/offerList/SortMenu'
export default {
  name: 'TheFilterMenu',
  components: {
    CategoryMenu,
    SortMenu
  },
  data() {
    return {
      visible: false,
      menuList: [
        {
          id: 0,
          title: 'Reward'
        },
        {
          id: 1,
          title: 'Device'
        },
        {
          id: 2,
          title: 'Category'
        },
        {
          id: 3,
          title: 'Sort'
        },
        {
          id: 9,
          title: 'Reset'
        }
      ],
      checked: []
    }
  },
  methods: {
    clickHandler: function () {
      this.visible = !this.visible
    },

    changeHandler: function (type, value) {
      if (type === 'category') {
        // this.$store.commit('filter/TRIGGER_CATEGORY') // 多选不隐藏 popover
      }

      if (type === 'sort') {
        this.$store.commit('filter/TRIGGER_SORT')
      }

      this.$emit('change', type, value)
    },

    menuClickHandler: function (item) {
      this.visible = !this.visible

      this.$store.commit('filter/TRIGGER_CATEGORY', false)
      this.$store.commit('filter/TRIGGER_SORT', false)

      this.$emit('menuItemClick', item)
    },

    reset: function () {
      this.$refs['categoryMenu'][0].reset()
      this.$refs['sortMenu'][0].reset()
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
