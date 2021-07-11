<template>
  <el-popover
    v-model="visible"
    :placement="placement"
    title=""
    width="200"
    trigger="manual"
  >
    <span slot="reference" @click="clickHandler">
      <slot></slot>
    </span>

    <template v-for="(item, index) in menuList">
      <el-row class="menu-item" :key="index">
        <el-radio v-model="radio" :label="item.id" @change="changeHandler">
          {{ item.title }}
        </el-radio>
      </el-row>
    </template>
  </el-popover>
</template>

<script>
export default {
  name: 'SortMenu',
  props: {
    placement: {
      type: String,
      default: () => 'bottom'
    }
  },
  data() {
    return {
      visible: false,
      menuList: [
        // sort by: 0-Most Popular 1-High to Low 2-Level of Difficulty
        {
          id: '0',
          title: 'Most Popular'
        },
        {
          id: '1',
          title: 'High to Low'
        },
        {
          id: '2',
          title: 'Level of Difficulty'
        }
      ],
      radio: ''
    }
  },
  methods: {
    clickHandler: function () {
      this.visible = !this.visible
    },

    changeHandler: function (val) {
      this.$emit('change', val)
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
