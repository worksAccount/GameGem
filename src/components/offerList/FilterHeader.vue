<template>
  <el-row class="filter-header-container">
    <el-row class="content">
      <template v-if="device !== 'mobile'">
        <template v-for="(item, index) in list">
          <div v-if="item.position !== 'right'" :key="index" class="item">
            <template v-if="item.id === 2">
              <category-menu
                @change="function (val) { changeHandler('category', val) }"
              >
                <span>
                  <i :class="item.icon" />
                  {{ item.title }}
                </span>
              </category-menu>
            </template>

            <template v-else-if="item.id === 3">
              <sort-menu
                @change="function (val) { changeHandler('sort', val) }"
              >
                <span>
                  <i :class="item.icon" />
                  {{ item.title }}
                </span>
              </sort-menu>
            </template>

            <template v-else>
              <div @click="clickHandler(item)">
                <i :class="item.icon" />
                {{ item.title }}
              </div>
            </template>
          </div>
        </template>
      </template>
      <template v-else>
        <the-filter-menu @change="changeHandler" @menuItemClick="clickHandler">
          <el-row class="mobile-menu">
            <div class="item">
              <i class="el-icon-s-operation" />
            </div>
          </el-row>
        </the-filter-menu>
      </template>
    </el-row>

    <el-row
      class="right"
      :style="{ width: device !== 'mobile' ? '220px' : '285px' }"
    >
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

    <reward-dialog ref="rewardDialog" />
    <device-dialog
      ref="deviceDialog"
      @change="function (val) { changeHandler('device', val) }"
    />
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import ResizeHandlerMixin from '~views/layout/mixin/ResizeHandler'

import RewardDialog from '~components/offerList/RewardDialog'
import DeviceDialog from '~components/offerList/DeviceDialog'
import CategoryMenu from '~components/offerList/CategoryMenu'
import SortMenu from '~components/offerList/SortMenu'

import TheFilterMenu from '~components/offerList/TheFilterMenu'

export default {
  name: 'FilterHeader',
  components: {
    RewardDialog,
    DeviceDialog,
    CategoryMenu,
    SortMenu,
    TheFilterMenu
  },
  mixins: [ResizeHandlerMixin],
  data() {
    return {
      list: [
        {
          id: 0,
          title: 'Reward',
          sort: '',
          icon: 'el-icon-s-flag'
        },
        {
          id: 1,
          title: 'Device',
          sort: '',
          icon: 'el-icon-mobile'
        },
        {
          id: 2,
          title: 'Category',
          sort: '',
          icon: 'el-icon-cold-drink'
        },
        {
          id: 3,
          title: 'Sort',
          sort: '',
          icon: 'el-icon-d-caret'
        },
        {
          id: 4,
          title: '',
          sort: '',
          icon: 'el-icon-message-solid',
          position: 'right'
        },
        {
          id: 6,
          title: '',
          sort: '',
          icon: 'el-icon-s-home',
          position: 'right'
        },
        {
          id: 5,
          title: 'User Terms',
          sort: '',
          icon: 'el-icon-s-order',
          position: 'right'
        }
      ],
      searchParams: {
        category: '', // category: 0-App 1-Survey 2-Trail
        deviceType: '', // device: 0-android 1-iphone 2-ipad
        estimateDays: '' // sort by: 0-Most Popular 1-High to Low 2-Level of Difficulty
      }
    }
  },
  computed: {
    ...mapGetters(['device'])
  },
  methods: {
    clickHandler: function (item) {
      if (item.id === 5) {
        this.$router.push({
          path: '/support'
        })
      }

      if (item.id === 6) {
        this.$router.push({
          path: '/'
        })
      }

      if (item.id === 4) {
        this.$emit('click', item)
      }

      if (item.id === 0) {
        this.$refs['rewardDialog'].init()
      } else if (item.id === 1) {
        this.$refs['deviceDialog'].init()
      }
    },
    changeHandler: function (type, value) {
      if (type === 'device') {
        this.searchParams.deviceType = value
      }

      if (type === 'category') {
        this.searchParams.category = value
      }

      if (type === 'sort') {
        this.searchParams.estimateDays = value
      }

      this.$emit('search', this.searchParams)
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
    width: calc(100% - 160px);
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
