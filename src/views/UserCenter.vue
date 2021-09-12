<template>
  <el-row class="container">
    <el-row class="title">
      <el-row>User Center</el-row>
    </el-row>

    <el-row class="content">
      <el-row>
        todo Your name
      </el-row>

      <el-row>
        todo Your E-mail
      </el-row>

      <el-row>
        <el-button
          type="text"
          @click="clickHandler(1)"
        >
          Change password
        </el-button>
      </el-row>

      <el-row>
        <el-button
          type="text"
          @click="clickHandler(2)"
        >
          Log out
        </el-button>
      </el-row>
    </el-row>

    <change-password-dialog ref="changePasswordDialog" />
  </el-row>
</template>

<script>
import ChangePasswordDialog from '~components/base/ChangePasswordDialog'

export default {
  name: 'UserCenter',
  components: {
    ChangePasswordDialog
  },
  data() {
    return {}
  },
  methods: {
    clickHandler: function (type) {
      if (type === 1) {
        this.$refs['changePasswordDialog'].show()
      } else if (type === 2) {
        // todo clean user data

        this.$router.replace({
          path: '/'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  color: #424242;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  line-height: 60px;
  margin-top: 40px;
  padding: 0 2%;

  .title {
  }

  .content {
    margin-top: 80px;
    text-align: center;
    font-size: 18px;
    font-weight: normal;
  }

  ::v-deep .el-button {
    &.el-button--primary {
      background-color: #7359a4;
      border-color: #7359a4;
    }

    &.el-button--text {
      color: #7359a4;
    }
  }
}
</style>
