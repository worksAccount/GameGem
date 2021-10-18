<template>
  <div class="list-container infinite-list-wrapper" style="overflow: auto">
    <ul
      class="list-ul"
      :infinite-scroll-disabled="disabled"
      v-infinite-scroll="getList"
    >
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

                <el-row
                  class="description"
                  v-html="getDescriptionHtml(item.des)"
                >
                </el-row>
              </div>

              <div class="button-container">
                <template v-if="item.isInProcess">
                  <span class="no-more" style="font-style: italic">
                    In Process
                  </span>
                </template>
                <template v-else-if="item.isComplete">
                  <span class="no-more" style="font-style: italic">
                    Completed
                  </span>
                </template>
                <template v-else>
                  <el-button
                    type="success"
                    icon="el-icon-coin"
                    round
                    @click="addTask(item)"
                  >
                    {{ item.goal }}
                  </el-button>
                </template>
              </div>
            </el-row>
          </el-card>
        </li>
      </template>
    </ul>

    <div v-if="loading" class="loading">
      <i class="el-icon-loading" />
      loading...
    </div>

    <div v-if="!loading && noMore" class="no-more">
      -- no more data --
    </div>

    <email-dialog ref="emailDialog" :item="currentItem" @updated="init" />
  </div>
</template>

<script>
import EmailDialog from '~components/base/EmailDialog'

import {
  getList,
  // addTask,
  getTask
} from '@/api'

export default {
  name: 'List',
  components: {
    EmailDialog
  },
  data() {
    return {
      params: {
        category: '', // category: 0-App 1-Survey 2-Trail
        delFlag: '',
        des: '',
        deviceType: '', // device: 0-android 1-iphone 2-ipad
        estimateDays: '', // sort by: 0-Most Popular 1-High to Low 2-Level of Difficulty
        goal: '',
        icon: '',
        id: '',
        kpi: '',
        name: '',
        pageNo: 1,
        pageSize: 15,
        pkg: '',
        status: '',
        weight: ''
      },
      total: 0,
      dataList: [],
      count: 10,
      loading: false,

      listInProgress: [],
      listCompleted: [],
      currentItem: {}
    }
  },
  computed: {
    noMore() {
      return this.dataList.length >= this.total
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  created() {
    this.init()
  },
  methods: {
    init: function () {
      this.params.pageNo = 1

      this.getList('init')
    },

    getDescriptionHtml: function (str) {
      let res = ''
      if (str) {
        res = str.replace(/\n/g, '<br/>')
      }
      return res
    },

    doSearch: function (params) {
      this.params.pageNo = 1
      Object.keys(params).map(key => {
        this.params[key] = params[key]
      })
      this.getList('init')
    },

    getList: function (type) {
      this.loading = true
      getList(this.params).then(res => {
        this.loading = false
        if (res && res.code === 200) {
          const result = res.result
          this.total = result.total

          if (type === 'init') {
            this.dataList = result.records
          } else {
            this.dataList.push(result.records)
          }

          this.params.pageNo += 1
        } else {
          this.total = 0

          if (type === 'init') {
            this.dataList = []
          }
        }

        this.getTaskList() // 在任务列表中 设置 任务状态 未接受 or 进行中 or 已完成
      })
    },

    getTaskList: function () {
      const params = {
        playerId: window.sessionStorage.getItem('GameGemUID')
      }
      getTask(params).then(res => {
        if (res && res.code === 200) {
          // status=1 未完成；status=2 已完成
          // 修改为字段 taskStatus=1 未完成；taskStatus=2 已完成
          const ls = res.result.records
          this.listInProgress = ls.filter(item => {
            return item.taskStatus === 1
          })
          this.listCompleted = ls.filter(item => {
            return item.taskStatus === 2
          })
        } else {
          this.listInProgress = []
          this.listCompleted = []
        }

        this.dataList.map(item => {
          this.listInProgress.forEach(inProcessItem => {
            if (inProcessItem.offerId === item.id) item.isInProcess = true
          })
          this.listCompleted.forEach(completeItem => {
            if (completeItem.offerId === item.id) item.isComplete = true
          })
        })

        this.$forceUpdate()
      })
    },

    addTask: function (item) {
      // show E-mail dialog
      this.currentItem = item
      this.$refs['emailDialog'].init()

      // const params = {
      //   offerId: item.id,
      //   playerId: window.sessionStorage.getItem('GameGemUID')
      // }
      // addTask(params).then(res => {
      //   if (res && res.code === 200) {
      //     this.$notify({
      //       title: '',
      //       message: res.message,
      //       type: 'success'
      //     })
      //
      //     this.doSearch()
      //   } else {
      //     this.$notify({
      //       title: '',
      //       message: res.message,
      //       type: 'error'
      //     })
      //   }
      // })
    },

    goDetailPage: function (item) {
      this.$emit('itemClick', item)
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

        .button-container {
          width: 125px;
          padding: 10px;

          button {
            width: 100%;
          }
        }
      }
    }
  }

  .no-more,
  .loading {
    text-align: center;
    font-size: 14px;
    color: #424242;
    opacity: 0.7;
  }
}
</style>
