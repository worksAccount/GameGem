<template>
  <el-dialog
    class="reward-dialog"
    title="现有积分/GameGem"
    :append-to-body="true"
    :modal-append-to-body="true"
    :visible.sync="visible"
    width="90%"
  >
    <el-row class="content">
      <el-tabs v-model="activeName" type="card" @tab-click="clickHandler">
        <el-tab-pane label="In Progress" name="one">
          <reward-list :data-list="listInProgress" />
        </el-tab-pane>
        <el-tab-pane label="Completed" name="two">
          <reward-list :data-list="listCompleted" />
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </el-dialog>
</template>

<script>
import RewardList from '~components/offerList/RewardList'
import { getTask } from '@/api'
export default {
  name: 'RewardDialog',
  components: {
    RewardList
  },
  data() {
    return {
      visible: false,
      activeName: '',
      listInProgress: [],
      listCompleted: []
    }
  },
  methods: {
    init: function () {
      this.visible = true
      this.activeName = 'one'
      this.getList()
    },
    clickHandler: function (e) {
      this.activeName = e.name
    },
    getList: function () {
      const params = {
        playerId: window.sessionStorage.getItem('GameGemUID')
      }
      getTask(params).then(res => {
        console.info(res)
        if (res && res.code === 200) {
          // status=1 未完成；status=2 已完成
          const ls = res.result.records
          this.listInProgress = ls.filter(item => {
            return item.status === 1
          })
          this.listCompleted = ls.filter(item => {
            return item.status === 2
          })
        } else {
          this.listInProgress = []
          this.listCompleted = []
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.reward-dialog {
  ::v-deep {
    .el-dialog__body {
      padding: 0;
    }
  }
}
</style>
