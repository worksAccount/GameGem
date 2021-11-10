<template>
  <div class="detail-container">
    <el-dialog
      :visible.sync="visible"
      class="detail-dialog"
      :title="item.name || 'OfferDetail'"
      :append-to-body="true"
      :modal-append-to-body="true"
      width="90%"
      top="20px"
    >
      <el-row class="content">
        <el-row class="icon-container">
          <div class="img-container">
            <img :src="item.icon" />
          </div>

          <div class="img-description">
            A quick, easy, and thrilling way to earn!
          </div>
        </el-row>

        <el-row class="content-container">
          <el-row class="title">Instructions/Guidelines:</el-row>
          <el-row class="sub-title">
            Pro Tip: Reach your goal faster by purchasing the xxx$ coin package!
          </el-row>
          <el-row
            class="description"
            v-html="getDescriptionHtml(item.des)"
          ></el-row>
        </el-row>

        <el-row class="content-container">
          <el-row class="title">Goal:</el-row>
          <el-row class="sub-title">
            {{ item.goal }}
          </el-row>
        </el-row>

        <template v-if="!item.isInProcess && !item.isComplete">
          <div class="button-container" v-if="!isReward">
            <el-button type="success" round @click="addTask(item)">
              <!--
              <span style="padding-right: 8px">Continue To Earn</span>
              <i class="el-icon-coin" />
              <span>+{{ item.goal }}</span>
              <span style="padding-left: 8px">Robux</span>
              -->
              Take the task
            </el-button>
          </div>
        </template>

        <el-row v-if="isInProgress || item.isInProcess">
          <!-- {{ isInProgress }} -->
          <div class="button-container">
            <el-button type="success" round @click="clickHandler">
              Resend E-mail
            </el-button>
          </div>
        </el-row>
      </el-row>
    </el-dialog>

    <email-dialog ref="emailDialog" :item="item" :is-resend="isResend" :is-reward="isReward" />
  </div>
</template>

<script>
import EmailDialog from '~components/base/EmailDialog'

// import { addTask } from '@/api'

export default {
  name: 'DetailDialog',
  components: {
    EmailDialog
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    isReward: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      visible: false,
      isInProgress: false,
      isResend: false
    }
  },
  methods: {
    /**
     *
     * @param isInProgress 是否是 点击 进行中 list 查看详情 如果是 展示 重新发送任务邮件 按钮
     */
    init: function (isInProgress) {
      this.visible = true

      if (isInProgress) {
        this.isInProgress = true
      } else {
        this.isInProgress = false
      }
    },

    addTask: function (item) {
      this.isResend = false
      this.$refs['emailDialog'].init('Send E-mail')

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
      //   } else {
      //     this.$notify({
      //       title: '',
      //       message: res.message,
      //       type: 'error'
      //     })
      //   }
      // })
    },

    getDescriptionHtml: function (str) {
      let res = ''
      if (str) {
        res = str.replace(/\n/g, '<br/>')
      }
      return res
    },

    clickHandler: function () {
      this.isResend = true
      this.$refs['emailDialog'].init()
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-dialog {
  ::v-deep {
    .el-dialog__header {
      padding: 20px;
      color: #fff;
      background: #e1e1e1;
    }

    .el-dialog__body {
      padding: 10px;
      width: 100%;
      box-sizing: border-box;
    }
  }

  .content {
    width: 100%;
    overflow: hidden;
  }

  .icon-container {
    display: flex;

    .img-container {
      width: 150px;
      height: 150px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .img-description {
      padding-left: 10px;
      flex: 1;
    }
  }

  .content-container {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;

    .title {
      font-weight: bold;
      margin-bottom: 10px;
    }

    .sub-title {
      margin-bottom: 10px;
    }

    .description {
      padding: 10px;
      background: #f2f2f2;
      border-radius: 5px;
    }
  }

  .button-container {
    /*width: 125px;*/
    padding: 10px;
    margin: auto;

    button {
      width: 100%;
    }
  }
}
</style>
