<template>
  <el-row class="offer-list-container">
    <filter-header @click="clickHandler" @search="searchHandler" />

    <popover-card ref="popoverCard" />

    <list ref="offerList" />
  </el-row>
</template>

<script>
import FilterHeader from '~components/offerList/FilterHeader'
import PopoverCard from '~components/offerList/PopoverCard'
import List from '~components/offerList/List'

export default {
  name: 'OfferList',
  components: {
    PopoverCard,
    FilterHeader,
    List
  },
  methods: {
    clickHandler: function (item) {
      if (item.id === 4) {
        this.$refs['popoverCard'].triggerVisibility()
      }
    },

    searchHandler: function (searchParams) {
      this.$refs['offerList'].doSearch(searchParams)
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
