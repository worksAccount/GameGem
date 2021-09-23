<template>
  <el-row class="log-in-container">
    <el-row class="content">
      <the-logo :allow-click="true" />

      <el-row class="top">
        <el-row> Sign In </el-row>

        <el-row class="linkable-container">
          Now Here?
          <span class="linkable" @click="goSignUp">Create Account</span>
        </el-row>
      </el-row>

      <el-row class="form-container">
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

          <el-form-item prop="pwd">
            <div slot="label">
              <div class="label-container">
                <div>Your Password</div>
                <div class="forgot-password" @click="goFindPassword">
                  Forgot Password?
                </div>
              </div>
            </div>

            <el-input v-model="form.pwd" type="password"></el-input>
          </el-form-item>
        </el-form>
      </el-row>

      <el-row class="footer">
        <el-button type="primary" v-loading="loading" @click="clickHandler">
          Sign In
        </el-button>
        <el-button
          type="text"
          style="float: right"
          @click="$router.replace('/')"
        >
          go back home
        </el-button>
      </el-row>
    </el-row>

    <forgot-password-dialog ref="forgotPasswordDialog" />
  </el-row>
</template>

<script>
import TheLogo from '~views/layout/components/TheLogo'
import ForgotPasswordDialog from '~components/base/ForgotPasswordDialog'

import { logIn } from '@/api'

export default {
  name: 'LogIn',
  components: {
    TheLogo,
    ForgotPasswordDialog
  },
  data() {
    return {
      loading: false,

      form: {
        mail: '',
        pwd: ''
      },
      rules: {
        mail: [
          { required: true, message: 'E-mail is required', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: 'password is required', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    clickHandler: function () {
      this.$refs['form'].validate(valid => {
        if (valid) this.doLogIn()
      })
    },
    goSignUp: function () {
      this.$router.push({
        path: '/signUp'
      })
    },
    goFindPassword: function () {
      this.$refs['forgotPasswordDialog'].show()
    },
    doLogIn: function () {
      const params = {
        playerName: this.form.mail,
        playerPassword: this.form.pwd
      }
      this.loading = true
      logIn(params).then(res => {
        this.loading = false
        if (res && res.code === 200) {
          this.$notify({
            title: '',
            message: res.message,
            type: 'success'
          })

          const loginObj = res.result
          const userId = loginObj.id
          const userName = loginObj.playerName

          this.$store.commit('user/SET_UID', userId)
          this.$store.commit('user/SET_UNAME', userName)

          this.$router.replace({
            path: '/offerList'
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
.log-in-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .content {
    width: 100%;
    min-width: 375px;
    max-width: 450px;
    font-size: 21px;
    padding: 20px;
    font-weight: 600;
  }

  .top {
    margin-top: 45px;

    .linkable-container {
      font-size: 16px;
      color: rgb(181, 181, 195);
      margin-top: 5px;

      .linkable {
        color: #7359a4;
        cursor: pointer;
      }
    }
  }

  .form-container {
    margin-top: 15px;

    ::v-deep .el-form {
      .el-form-item {
        .el-form-item__label {
          width: 100%;
          font-size: 16px;
          color: #181c32;

          &::before {
            content: ' ';
            margin: 0;
          }
        }
      }
    }

    .label-container {
      display: flex;
      flex-direction: row;

      div {
        /*width: calc(50vw - 20px);*/ /* padding 20px */
      }

      .forgot-password {
        flex: 1;
        color: #7359a4;
        text-align: right;
        cursor: pointer;
      }
    }
  }

  .footer {
    margin-top: 15px;
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
