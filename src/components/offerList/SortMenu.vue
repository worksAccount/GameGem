<template>
  <el-popover
    :value="visible"
    :placement="placement"
    title=""
    width="200"
    trigger="manual"
  >
    <span slot="reference" @click="clickHandler">
      <slot></slot>
    </span>

    <el-checkbox-group v-model="checked" @change="changeHandler">
      <template v-for="(item, index) in menuList">
        <el-row class="menu-item" :key="index">
          <el-checkbox :label="item.id" :key="index">
            {{ item.title }}
          </el-checkbox>
        </el-row>
      </template>
    </el-checkbox-group>

    <!--
    <template v-for="(item, index) in menuList">
      <el-row class="menu-item" :key="index">
        <el-radio v-model="radio" :label="item.id" @change="changeHandler">
          {{ item.title }}
        </el-radio>
      </el-row>
    </template>
    -->
  </el-popover>
</template>

<script>
import { mapGetters } from 'vuex'

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
      // visible: false,
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
      checked: [],
      radio: ''
    }
  },
  computed: {
    // ...mapGetters(['visibility_sort'])
    ...mapGetters({
      visible: 'visibility_sort',
      visible_category: 'visibility_category'
    })
  },
  methods: {
    hide: function () {
      // this.visible = false
      this.$store.commit('filter/TRIGGER_SORT', false)
    },

    reset: function () {
      this.checked = []
      this.radio = ''
    },

    clickHandler: function () {
      // this.visible = !this.visible
      this.$store.commit('filter/TRIGGER_SORT')

      if (this.visible_category) this.$store.commit('filter/TRIGGER_CATEGORY')
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
