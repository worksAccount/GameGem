<template>
  <el-dialog
    title="Mobile exclusive offers"
    :append-to-body="true"
    :modal-append-to-body="true"
    :visible.sync="visible"
    width="90%"
  >
    <el-row class="content">
      <el-row class="description-container">
        Do you own any of these mobile devices?
        Select the device you own to see their exclusive offers.
      </el-row>

      <el-row class="card-container" :gutter="16">
        <el-col :md="8" :sm="24" :xs="24">
          <el-card shadow="hover">
            <div class="content-container" @click="clickHandler('0')">
              <el-row>todo pic1</el-row>
              <el-row>Android</el-row>
            </div>

            <el-row class="icon-container">
              <i v-if="deviceChosen === '0'" class="el-icon-check" />
            </el-row>
          </el-card>
        </el-col>

        <el-col :md="8" :sm="24" :xs="24">
          <el-card shadow="hover">
            <div class="content-container" @click="clickHandler('1')">
              <el-row>todo pic2</el-row>
              <el-row>iPhone</el-row>
            </div>

            <el-row class="icon-container">
              <i v-if="deviceChosen === '1'" class="el-icon-check" />
            </el-row>
          </el-card>
        </el-col>

        <el-col :md="8" :sm="24" :xs="24">
          <el-card shadow="hover">
            <div class="content-container" @click="clickHandler('2')">
              <el-row>todo pic3</el-row>
              <el-row>iPad</el-row>
            </div>

            <el-row class="icon-container">
              <i v-if="deviceChosen === '2'" class="el-icon-check" />
            </el-row>
          </el-card>
        </el-col>
      </el-row>

      <el-row class="button-container">
        <el-button type="primary" @click="submitHandler">Save Device</el-button>
      </el-row>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: 'DeviceDialog',
  data() {
    return {
      visible: false,
      deviceChosen: '' // 0-android 1-iphone 2-ipad
    }
  },
  methods: {
    init: function () {
      this.visible = true
    },
    clickHandler: function (e) {
      this.deviceChosen = e
    },
    submitHandler: function () {
      this.visible = false
      this.$emit('change', this.deviceChosen)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  .description-container {
    text-align: center;
    margin-bottom: 20px;
  }

  .card-container {
    margin-bottom: 20px;
    text-align: center;

    .content-container {
      cursor: pointer;
    }

    .icon-container {
      height: 35px;
      line-height: 35px;
      font-size: 30px;
      color: #67c23a;
    }

    ::v-deep .el-card {
      margin-bottom: 5px;
    }
  }

  .button-container {
    text-align: right;
  }
}
</style>
