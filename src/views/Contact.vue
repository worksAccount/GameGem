<template>
  <el-row class="contact-container">
    <el-row class="title">
      <el-row>Contact Us</el-row>

      <el-row class="card-container" :gutter="20">
        <el-col class="card-section" :md="12" :sm="24" :xs="24">
          <el-card class="box-card">
            <span>
              I have completed an offer, but I did not receive my rewards
            </span>
            <div class="bold" @click="clickHandler">
              What do I do?
            </div>
          </el-card>
        </el-col>

        <el-col class="card-section" :md="12" :sm="24" :xs="24">
          <el-card class="box-card">
            <span>
              I am missing my rewards and would like to submit a support
              request.
            </span>
            <div class="bold" @click="clickHandler">
              How do I submit a support request?
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row class="divider"></el-row>
    </el-row>

    <el-row class="content">
      <el-row class="description">
        If you have other inquiries, please contact us with the form below
      </el-row>

      <el-row class="form-container">
        <el-form ref="form" :model="form" :rules="rule" label-position="top">
          <el-form-item label="What does inquiry relate to?" prop="inquiry">
            <el-select v-model="form.inquiry" placeholder="">
              <el-option
                label="Missing Rewards"
                value="Missing Rewards"
              />
              <el-option
                label="Interested in Advertising"
                value="Interested in Advertising"
              />
              <el-option
                label="Interested in Becoming a Publisher"
                value="Interested in Becoming a Publisher"
              />
              <el-option
                label="I am a current Publisher and need support"
                value="I am a current Publisher and need support"
              />
              <el-option
                label="Other"
                value="Other"
              />
            </el-select>
          </el-form-item>

          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="First Name" prop="fName">
                <el-input v-model="form.fName" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Last Name" prop="lName">
                <el-input v-model="form.lName" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="App or Website">
            <el-input v-model="form.type"></el-input>
          </el-form-item>

          <el-form-item label="Skype Handle" prop="type">
            <el-input v-model="form.skype"></el-input>
          </el-form-item>

          <el-form-item label="Email" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>

          <el-form-item label="Message" prop="message">
            <el-input type="textarea" v-model="form.message"></el-input>
          </el-form-item>

          <el-form-item>
            <el-row class="button-container">
              <el-button type="primary" @click="beforeSubmit">Submit</el-button>
            </el-row>
          </el-form-item>
        </el-form>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        inquiry: '',
        fName: '',
        lName: '',
        type: '',
        skype: '',
        email: '',
        message: ''
      },
      rule: {
        inquiry: [
          { required: true, message: 'please select', trigger: 'blur' }
        ],
        fName: [
          { required: true, message: 'please type in', trigger: 'blur' }
        ],
        lName: [
          { required: true, message: 'please type in', trigger: 'blur' }
        ],
        type: [
          { required: true, message: 'please type in', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'please type in', trigger: 'blur' }
        ],
        message: [
          { required: true, message: 'please type in', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    clickHandler: function () {
      this.$router.push({
        path: '/support'
      })
    },
    beforeSubmit: function () {
      this.$refs['form'].validate(res => {
        console.info(res)
        this.$notify({
          title: '',
          message: 'todo submit',
          type: 'warning'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-container {
  color: #424242;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  line-height: 60px;
  margin-top: 40px;
  padding: 0 2%;

  .title {
    .card-container {
      margin-top: 40px;

      .card-section {
        margin-bottom: 16px;

        color: #424242;
        font-size: 26px;
        font-weight: 400;
        line-height: 31.2px;
        text-align: center;

        span {
          opacity: 0.7;
        }

        .bold {
          margin-top: 10px;
          font-weight: 500;
          opacity: 1;
          cursor: pointer;
        }
      }
    }

    .divider {
      &:before {
        content: '';
        width: 100%;
        height: 1px;
        margin-top: 20px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
      }
    }
  }

  .content {
    margin-top: 80px;
    text-align: center;

    .description {
      font-size: 18px;
      font-weight: 500;
      line-height: 30.6px;
      opacity: 0.8;
    }

    .form-container {
      max-width: 992px;
      min-width: 375px;
      margin: auto;

      .el-select {
        width: 100%;
      }

      .button-container {
        margin-top: 20px;

        ::v-deep .el-button {
          &.el-button--primary {
            background-color: #7359a4;
            border-color: #7359a4;
          }
        }
      }
    }
  }

  ::v-deep .el-form {
    .el-form-item {
      margin-bottom: 8px;
      text-align: left;

      .el-form-item__label {
        font-weight: bold;
        color: #424242;
      }
    }
  }
}
</style>
