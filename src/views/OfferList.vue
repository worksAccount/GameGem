<template>
  <el-row class="offer-list-container">
    <filter-header @click="clickHandler" @search="searchHandler" />

    <popover-card ref="popoverCard" />

    <list ref="offerList" @itemClick="itemClickHandler" />

    <detail-dialog ref="detailDialog" :item="offerItem" />
  </el-row>
</template>

<script>
import FilterHeader from '~components/offerList/FilterHeader'
import PopoverCard from '~components/offerList/PopoverCard'
import List from '~components/offerList/List'
import DetailDialog from '~components/offerList/DetailDialog'

export default {
  name: 'OfferList',
  components: {
    PopoverCard,
    FilterHeader,
    List,
    DetailDialog
  },
  data() {
    return {
      offerItem: {}
    }
  },
  methods: {
    clickHandler: function (item) {
      if (item.id === 4) {
        this.$refs['popoverCard'].triggerVisibility()
      }
    },

    searchHandler: function (searchParams) {
      this.$refs['offerList'].doSearch(searchParams)
    },

    itemClickHandler: function (item) {
      this.offerItem = item
      this.$refs['detailDialog'].init()
    }
  }
}
</script>

<style lang="scss" scoped>
.offer-list-container {
  width: 100%;
  height: 100%;
}
</style>
