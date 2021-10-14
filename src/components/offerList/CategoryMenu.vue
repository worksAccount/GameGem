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

    <!-- <template v-for="(item, index) in menuList">
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
  name: 'CategoryMenu',
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
        // 0-App 1-Survey 2-Trail
        {
          id: '0',
          title: 'App'
        },
        {
          id: '1',
          title: 'Survey'
        },
        {
          id: '2',
          title: 'Trail'
        }
      ],
      checked: [],
      radio: ''
    }
  },
  computed: {
    // ...mapGetters(['visibility_category'])
    ...mapGetters({
      visible: 'visibility_category',
      visible_sort: 'visibility_sort'
    })
  },
  methods: {
    hide: function () {
      // this.visible = false
      this.$store.commit('filter/TRIGGER_CATEGORY', false)
    },

    reset: function () {
      this.checked = []
      this.radio = ''
    },

    clickHandler: function () {
      // this.visible = !this.visible
      this.$store.commit('filter/TRIGGER_CATEGORY')

      if (this.visible_sort) this.$store.commit('filter/TRIGGER_SORT')
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
