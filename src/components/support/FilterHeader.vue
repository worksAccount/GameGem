<template>
  <el-row class="filter-header-container">
    <el-row class="content">
      <template v-if="device !== 'mobile'">
        <template v-for="(item, index) in list">
          <div v-if="item.position !== 'right'" :key="index" class="item">
            <div @click="clickHandler(item)">
              <i :class="item.icon" />
              {{ item.title }}
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <the-filter-menu ref="theFilterMenu" @menuItemClick="clickHandler">
          <el-row class="mobile-menu">
            <div class="item">
              <i class="el-icon-s-operation" />
            </div>
          </el-row>
        </the-filter-menu>
      </template>
    </el-row>

    <el-row class="right" :style="{ width: '45px' }">
      <template v-for="(item, index) in list">
        <div
          v-if="item.position === 'right'"
          :key="index"
          class="item"
          :style="{ padding: !item.title ? '0 10px' : '0 20px 0 10px' }"
          @click="clickHandler(item)"
        >
          <i :class="item.icon" />
          {{ item.title }}
        </div>
      </template>
    </el-row>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import ResizeHandlerMixin from '~views/layout/mixin/ResizeHandler'

import TheFilterMenu from './TheFilterMenu'

export default {
  name: 'FilterHeader',
  components: {
    TheFilterMenu
  },
  mixins: [ResizeHandlerMixin],
  data() {
    return {
      list: [
        {
          id: 0,
          title: 'Home',
          sort: '',
          icon: ''
        },
        {
          id: 1,
          title: 'User Terms of Service',
          sort: '',
          icon: ''
        },
        {
          id: 2,
          title: 'Player Support',
          sort: '',
          icon: ''
        },
        {
          id: 3,
          title: 'iOS 14.5',
          sort: '',
          icon: ''
        },

        {
          id: 10,
          title: '',
          sort: '',
          icon: 'el-icon-back',
          position: 'right'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['device'])
  },
  methods: {
    clickHandler: function (item) {
      if (item.id === 10) {
        this.$router.go(-1)
      } else {
        this.$emit('click', item)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-header-container {
  width: 100%;
  box-shadow: 0 0 0.2rem rgb(0 0 0 / 10%), 0 0.2rem 0.4rem rgb(0 0 0 / 20%);
  transition: transform 0.25s cubic-bezier(0.1, 0.7, 0.1, 1), box-shadow 0.25s;
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  z-index: 2;
  background-color: #ab47bd;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;

  .content {
    width: calc(100% - 45px);
  }

  .right {
  }

  .content,
  .right {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    .item {
      height: 48px;
      line-height: 47px;
      padding: 0 20px;
      color: #fff;
      opacity: 0.7;
      font-size: 14px;
      font-weight: initial;
      border: none;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 20px;
        vertical-align: middle;
      }
    }
  }
}
</style>
