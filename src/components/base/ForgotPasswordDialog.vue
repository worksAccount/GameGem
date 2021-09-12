<template>
  <el-dialog
    :visible.sync="visibility"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="forgot-password-dialog"
    title="forgot password"
    width="95%"
  >
    <el-row class="dialog-body">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="top"
        label-width="100px"
      >
        <el-form-item label="Email" prop="mail">
          <el-input v-model="form.mail"></el-input>
        </el-form-item>

        <el-form-item label="New password" prop="pwd">
          <el-input v-model="form.pwd" type="password"></el-input>
        </el-form-item>

        <el-form-item label="Confirm new password" prop="rePwd">
          <el-input v-model="form.rePwd" type="password"></el-input>
        </el-form-item>
      </el-form>
    </el-row>

    <el-row slot="footer" class="dialog-footer">
      <el-button size="mini" @click="visibility = false">Cancel</el-button>
      <el-button size="mini" type="primary" @click="clickHandler">
        Next
      </el-button>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: 'ChangePasswordDialog',
  data() {
    const validation_password = (rule, value, callback) => {
      if (value !== this.form.pwd) {
        callback(new Error("Passwords don't match"))
      } else {
        callback()
      }
    }

    return {
      visibility: false,

      form: {
        mail: '',
        pwd: '',
        rePwd: '' // 密码确认
      },
      rules: {
        mail: [
          { required: true, message: 'Email is required', trigger: 'blur' },
          {
            type: 'email',
            message: 'Please enter a valid email',
            trigger: ['blur', 'change']
          }
        ],
        pwd: [
          {
            required: true,
            message: 'new password is required',
            trigger: 'blur'
          },
          {
            min: 10,
            message:
              'Use 10 or more characters with a mix of lowercase letters, uppercase letters, and numbers',
            trigger: 'blur'
          }
        ],
        rePwd: [
          {
            required: true,
            message: 'confirm new password is required',
            trigger: 'blur'
          },
          {
            min: 10,
            message:
              'Use 10 or more characters with a mix of lowercase letters, uppercase letters, and numbers',
            trigger: 'blur'
          },
          { validator: validation_password, trigger: blur }
        ]
      }
    }
  },

  methods: {
    show: function () {
      this.visibility = true
      this.reset()
    },

    hide: function () {
      this.visibility = false
    },

    reset: function () {
      this.form = this.$options.data().form
      if (this.$refs['form']) this.$refs['form'].clearValidate()
    },

    clickHandler: function () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          // todo set new password
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.forgot-password-dialog {
  font-size: initial;
  line-height: initial;

  .dialog-body {
    font-weight: initial;
  }

  ::v-deep .el-dialog {
    .el-dialog__header {
    }

    .el-dialog__body {
      padding: 10px 14px;
    }

    .el-dialog__footer {
    }
  }
}
</style>
