<template>
  <el-dialog
    :visible.sync="visibility"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="change-password-dialog"
    title="change password"
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
        <el-form-item label="Your E-mail" prop="mail">
          <el-input v-model="form.mail"></el-input>
        </el-form-item>

        <el-form-item label="Current password" prop="curPwd">
          <el-input v-model="form.curPwd"></el-input>
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
import { changePlayerPassword } from '@/api'

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
        curPwd: '',
        pwd: '',
        rePwd: '' // 密码确认
      },
      rules: {
        mail: [
          {
            required: true,
            message: 'E-mail is required',
            trigger: 'blur'
          }
        ],
        curPwd: [
          {
            required: true,
            message: 'current password is required',
            trigger: 'blur'
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
          const params = {
            playerName: this.form.mail,
            playerPassword: this.form.curPwd,
            newPassWord: this.form.pwd
          }
          changePlayerPassword(params).then(res => {
            if (res && res.code === 200) {
              this.$notify({
                title: '',
                message: res.message,
                type: 'success'
              })

              this.$store.commit('user/CLEAN_UID')
              this.$store.commit('user/CLEAN_UNAME')

              this.$router.replace({
                path: '/logIn'
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
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.change-password-dialog {
  font-size: initial;
  line-height: initial;
  text-align: left;

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
