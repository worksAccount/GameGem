<template>
  <el-row class="balance-history-container">
    <el-row class="filter-header-container">
      <el-row class="content">
        <div class="item">
          <div>
            balance history
          </div>
        </div>
      </el-row>

      <el-row class="right" :style="{ width: '45px' }">
        <div class="item" style="padding: 0 10px" @click="$router.go(-1)">
          <i class="el-icon-back" />
        </div>
      </el-row>
    </el-row>

    <el-row class="container">
      <el-row class="content">
        <template v-if="list.length">
          <!--
          <template v-for="(item, index) in list">
            <el-row>
              <el-col :span="2">{{ index }}</el-col>
              <el-col :span="20">{{ item }}</el-col>
            </el-row>
          </template>
          -->
          <el-table :data="list" stripe style="width: 100%">
            <el-table-column prop="eventName" label="TYPE" />
            <el-table-column prop="updateTime" label="DATE" />
            <el-table-column prop="goal" label="POINTS">
              <template slot-scope="scoped">
                <i :class="scoped.row.type - 0 === 1 ? 'el-icon-plus' : 'el-icon-minus'" />
                {{ scoped.row.goal }}
              </template>
            </el-table-column>
            <el-table-column prop="balance" label="BALANCE" />
          </el-table>
        </template>
        <template v-else>
          <div class="no-more">
            -- no more data --
          </div>
        </template>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import { queryBalanceRecords } from '@/api'

export default {
  name: 'BalanceHistory',
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.getBalanceHistory()
  },
  methods: {
    getBalanceHistory: function () {
      const params = {
        playerId: window.sessionStorage.getItem('GameGemUID')
      }
      queryBalanceRecords(params).then(res => {
        if (res) {
          // this.$notify({
          //   title: '',
          //   message: res.message,
          //   type: 'success'
          // })
          const ls = res?.result || []
          this.list = ls
          // this.list = [
          //   {
          //     eventName: 'abc',
          //     goal: 20,
          //     type: 1, // 1.加；2.扣
          //     balance: 300, // 变动后积分余额
          //     updateTime: '2021-10-10 10:10:10'
          //   },
          //   {
          //     eventName: 'abc',
          //     goal: 20,
          //     type: 2, // 1.加；2.扣
          //     balance: 300, // 变动后积分余额
          //     updateTime: '2021-10-10 10:10:10'
          //   }
          // ]
        } else {
          this.$notify({
            title: '',
            message: res.message,
            type: 'error'
          })
        }
      })
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

.container {
  color: #424242;
  font-weight: 700;
  line-height: 40px;
  padding: 0 2%;

  .content {
    text-align: center;
    font-size: 18px;
    font-weight: normal;

    .no-more {
      text-align: center;
      font-size: 14px;
      color: #424242;
      opacity: 0.7;
    }
  }
}
</style>
