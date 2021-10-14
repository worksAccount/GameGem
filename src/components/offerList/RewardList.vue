<template>
  <div class="list-container" style="overflow: auto">
    <template v-if="dataList.length">
      <ul class="list-ul">
        <template v-for="(item, index) in dataList">
          <li :key="index" class="list-item">
            <el-card :body-style="{ padding: '10px' }">
              <el-row class="item-container">
                <div class="icon-container" @click="goDetailPage(item)">
                  <img :src="item.icon" />
                </div>

                <div class="content-container" @click="goDetailPage(item)">
                  <el-row class="name">{{ item.name }}</el-row>

                  <el-divider />

                  <el-row class="description">{{ item.des }}</el-row>
                </div>
              </el-row>
            </el-card>
          </li>
        </template>
      </ul>
    </template>
    <template v-else>
      <div class="no-more">
        -- no more data --
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'RewardList',
  props: {
    dataList: {
      type: Array
    },
    isInProgress: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    goDetailPage: function (item) {
      this.$emit('itemClick', {
        item: item,
        isInProgress: this.isInProgress
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  height: calc(
    100% - 58px
  ); /* header`s height 48px; page padding`s height 10px  */

  .list-ul {
    list-style-type: none;
    padding: 0 10px;

    .list-item {
      margin-top: 10px;
      &:nth-child(1) {
        margin-top: 0;
      }

      .item-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;

        .icon-container {
          width: 125px;
          height: 125px;
          padding: 10px;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .content-container {
          flex: 1;
          min-width: 375px;
          cursor: pointer;
        }
      }
    }
  }

  .no-more {
    text-align: center;
    font-size: 14px;
    color: #424242;
    opacity: 0.7;
    margin-bottom: 16px;
  }
}
</style>
