<template>
  <el-row class="sign-up-container">
    <el-row class="content">
      <the-logo :allow-click="true" />

      <el-row class="top">
        <el-row class="linkable-container">
          Already have an Account?
          <span class="linkable" @click="goLogIn">Sign In</span>
        </el-row>
      </el-row>

      <el-row class="middle">
        <el-row class="title"> Create your Account </el-row>

        <el-row class="sub-title">
          Enter your details to create an account
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
          <el-form-item label="Email" prop="mail">
            <el-input v-model="form.mail"></el-input>
          </el-form-item>

          <el-form-item label="Password" prop="pwd">
            <el-input v-model="form.pwd" type="password"></el-input>
          </el-form-item>

          <el-form-item label="Confirm Password" prop="rePwd">
            <el-input v-model="form.rePwd" type="password"></el-input>
          </el-form-item>
        </el-form>
      </el-row>

      <el-row class="footer">
        <el-button type="primary" @click="clickHandler">Next</el-button>
        <el-button
          type="text"
          style="float: right"
          @click="$router.replace('/')"
        >
          go back home
        </el-button>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import TheLogo from '~views/layout/components/TheLogo'

import { signUp } from '@/api'

export default {
  name: 'SignUp',
  components: {
    TheLogo
  },
  data() {
    const validation_password = (rule, value, callback) => {
      if (value !== this.form.pwd) {
        callback(new Error("Passwords don't match"))
      } else {
        callback()
      }
    }

    return {
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
          { required: true, message: 'password is required', trigger: 'blur' },
          {
            min: 10,
            message:
              'Use 10 or more characters with a mix of lowercase letters, uppercase letters, and numbers',
            trigger: 'blur'
          }
        ],
        rePwd: [
          { required: true, message: 'password is required', trigger: 'blur' },
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
    clickHandler: function () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.doSignUp()
        }
      })
    },
    goLogIn: function () {
      this.$router.push({
        path: '/logIn'
      })
    },
    doSignUp: function () {
      const params = {
        playerName: this.form.mail,
        playerPassword: this.form.pwd
      }
      signUp(params).then(res => {
        if (res && res.code === 200) {
          this.$notify({
            title: '',
            message: res.message,
            type: 'success'
          })

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
.sign-up-container {
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
      margin-bottom: 30px;

      .linkable {
        color: #7359a4;
        cursor: pointer;
      }
    }
  }

  .middle {
    .title {
      color: #3f4254;
      font-size: 17px;
      font-weight: 500;
      margin-bottom: 6px;
    }

    .sub-title {
      color: #b5b5c3;
      font-size: 12px;
      font-weight: 400;
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
