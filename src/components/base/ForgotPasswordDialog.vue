<template>
  <el-dialog
    :visible.sync="visibility"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="forgot-password-dialog"
    title="forgot password"
    width="95%"
    top="20px"
  >
    <el-row class="dialog-body">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="top"
        label-width="100px"
      >
        <el-form-item label="E-mail" prop="mail">
          <el-input v-model="form.mail"></el-input>
        </el-form-item>

        <el-form-item label="Verification Code" prop="code">
          <el-input v-model="form.code" auto-complete="false">
            <el-button
              slot="append"
              v-show="!time"
              :style="{ color: '#fff', backgroundColor: '#7359a4' }"
              @click="sendVerificationCode"
            >
              send verification code
            </el-button>
            <el-button
              slot="append"
              v-show="time"
              disabled
            >
              {{ time }}s
            </el-button>
          </el-input>
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
import { getVerificationCode, changePlayerPasswordByCode } from '@/api'

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
        code: '', // verification code
        pwd: '',
        rePwd: '' // 密码确认
      },
      rules: {
        mail: [
          { required: true, message: 'E-mail is required', trigger: 'blur' },
          {
            type: 'email',
            message: 'Please enter a valid E-mail',
            trigger: ['blur', 'change']
          }
        ],
        code: [
          {
            required: true,
            message: 'Verification Code is required',
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
      },

      time: 0,
      timer: null,

      code: ''
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
      if (this.timer) clearInterval(this.timer)
      this.timer = null
      this.time = 0
      if (this.$refs['form']) this.$refs['form'].clearValidate()
    },

    sendVerificationCode: function () {
      if (!this.form.mail) {
        this.$notify({
          title: '',
          message: 'please type in E-mail',
          type: 'warning'
        })
        return
      }

      const params = {
        resetMail: this.form.mail,
        resetType: '0' // 默认为0 【邮箱找回】
      }

      getVerificationCode(params).then(res => {
        if (res && res.code === 200) {
          this.$notify({
            title: '',
            message: res.message,
            type: 'success'
          })

          this.code = res.result.code // todo 发送的 verification code

          this.timerInit()
        } else {
          this.$notify({
            title: '',
            message: res.message,
            type: 'error'
          })
        }
      })
    },

    timerInit: function () {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.time = TIME_COUNT
        this.timer = setInterval(() => {
          if (this.time && this.time <= TIME_COUNT) {
            this.time--
          } else {
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },

    clickHandler: function () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.code !== this.form.code) {
            this.$notify({
              title: '',
              message: 'wrong verification code',
              type: 'error'
            })
          } else {
            this.doPasswordForgot()
          }
        }
      })
    },

    doPasswordForgot: function () {
      const params = {
        playerName: this.form.mail,
        code: this.form.code, // todo verification code
        newPassWord: this.form.pwd
      }
      changePlayerPasswordByCode(params).then(res => {
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
