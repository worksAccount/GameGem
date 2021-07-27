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
        <img :src="item.icon" />
      </el-row>

      <el-row class="content-container">
        <el-row class="description">{{ item.des }}</el-row>
      </el-row>

      <div class="button-container" v-if="!isReward">
        <el-button
          type="success"
          icon="el-icon-coin"
          round
          @click="addTask(item)"
        >
          {{ item.goal }}
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
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-dialog {
  ::v-deep {
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
    width: 200px;
    height: 200px;
    margin: auto;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .content-container {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .button-container {
    width: 125px;
    padding: 10px;
    margin: auto;

    button {
      width: 100%;
    }
  }
}
</style>
