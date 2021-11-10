<template>
  <el-dialog
    :visible.sync="visible"
    class="detail-dialog"
    :title="isReward ? 'Resend E-mail' : 'Send E-mail'"
    :append-to-body="true"
    :modal-append-to-body="true"
    width="50%"
    top="20px"
  >
    <el-row class="content">
      <el-row class="description">
        <p>
          From the depths of obscurity to the peaks of legend, you will be the
          author of your civilization`s history. Will you launch epic wars and
          conquer the entire world? Or rise up as a virtuous leader renowned for
          your sagacity? To get points play Rise of Kingdoms: must be done in
          under 25 days from install.
        </p>
      </el-row>

      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="E-MAIL" name="first">
          <el-form
            v-if="visible"
            ref="form"
            :model="form"
            :rules="rules"
            label-position="top"
            label-width="100px"
          >
            <el-form-item label="Your E-mail" prop="mail">
              <el-input v-model="form.mail"></el-input>
            </el-form-item>
          </el-form>

          <div class="button-container">
            <el-button type="success" round v-loading="loading" @click="clickHandler">
              {{ isReward ? 'Resend E-mail' : 'Send E-mail' }}
            </el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </el-dialog>
</template>

<script>
import {
  addTaskSendMail,
  sendTaskMail
} from '@/api'

export default {
  name: 'EmailDialog',
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    isResend: {
      type: Boolean,
      default: () => false
    },
    isReward: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      visible: false,
      loading: false,
      activeName: 'first',
      form: {
        mail: ''
      },
      rules: {
        mail: [
          { required: true, message: 'E-mail is required', trigger: 'blur' },
          {
            type: 'email',
            message: 'Please enter a valid E-mail',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    init: function () {
      this.form.mail = sessionStorage.getItem('GameGemUName')
      this.visible = true
    },
    clickHandler: function () {
      this.$refs['form'].validate(valid => {
        if (valid) this.addTask(this.item)
      })
    },
    addTask: function (item) {
      const params = {
        offerId: item.id,
        playerId: window.sessionStorage.getItem('GameGemUID'),
        toMail: this.form.mail
      }
      const request = this.isResend ? sendTaskMail : addTaskSendMail
      this.loading = true
      request(params).then(res => {
        this.loading = false
        this.visible = false
        this.$emit('updated')

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
    .el-dialog__header {
      padding: 20px;
      color: #fff;
      background: #e1e1e1;
    }

    .el-dialog__body {
      padding: 10px;
      width: 100%;
      box-sizing: border-box;
    }
  }

  .content {
    width: 100%;
    overflow: hidden;

    .description {
      margin-bottom: 10px;

      p {
        margin: 0;
        font-weight: 400;
        word-break: break-word;
      }
    }

    .button-container {
      margin: auto;

      button {
        width: 100%;
      }
    }
  }
}
</style>
