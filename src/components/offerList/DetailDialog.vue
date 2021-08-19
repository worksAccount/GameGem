<template>
  <el-dialog
    class="detail-dialog"
    :title="item.name || 'OfferDetail'"
    :append-to-body="true"
    :modal-append-to-body="true"
    :visible.sync="visible"
    width="90%"
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

      <div class="button-container" v-if="!isReward">
        <el-button type="success" round @click="addTask(item)">
          <span style="padding-right: 8px">Continue To Earn</span>
          <i class="el-icon-coin" />
          <span>+{{ item.goal }}</span>
          <span style="padding-left: 8px">Robux</span>
        </el-button>
      </div>
    </el-row>
  </el-dialog>
</template>

<script>
import { addTask } from '@/api'

export default {
  name: 'DetailDialog',
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
      visible: false
    }
  },
  methods: {
    init: function () {
      this.visible = true
    },

    addTask: function (item) {
      const params = {
        offerId: item.id,
        playerId: window.sessionStorage.getItem('GameGemUID')
      }
      addTask(params).then(res => {
        if (res && res.code === 200) {
          this.$notify({
            title: '',
            message: res.message,
            type: 'success'
          })
        } else {
          this.$notify({
            title: '',
            message: res.message,
            type: 'error'
          })
        }
      })
    },

    getDescriptionHtml: function (str) {
      let res = ''
      if (str) {
        res = str.replace(/\n/g, '<br/>')
      }
      return res
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
