<template>
  <div class="popover-card-container" v-if="visible">
    <el-card>
      <el-row class="icon-container">todo icon for apple</el-row>

      <el-row class="content-container">
        <el-row class="title"> Extra Steps for iOS 14.5+ Users </el-row>

        <el-row class="content">
          With recent updates to Apple iOS, you are
          <span class="green">
            required to complete additional steps to earn your reward.
          </span>

          <el-divider />
          <div class="offer" @click="clickHandler">
            Ready to Submit an Offer Completion?
            <i class="el-icon-arrow-right" />
          </div>
          <el-divider />
        </el-row>
      </el-row>

      <el-row class="button-container">
        <el-button type="success" @click="clickHandler">Learn More</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PopoverCard',
  data() {
    return {
      visible: false
    }
  },
  methods: {
    clickHandler: function () {
      this.$router.push({
        path: '/support'
      })
    },

    triggerVisibility: function () {
      this.visible = !this.visible
    }
  }
}
</script>

<style lang="scss" scoped>
.popover-card-container {
  width: 350px;
  position: absolute;
  top: 55px;
  right: 15px;
  text-align: center;
  z-index: 999;

  .icon-container {
    margin: 16px 0;
  }

  .content-container {
    .title {
      margin-bottom: 16px;
      font-weight: bold;
    }

    .content {
      font-size: 14px;

      .green {
        color: #67c23a;
      }

      .offer {
        text-align: left;
        cursor: pointer;

        i {
          float: right;
        }
      }
    }
  }

  .button-container {
  }
}
</style>
