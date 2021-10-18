<template>
  <el-dialog
    :visible.sync="visible"
    class="detail-dialog"
    title="Send E-mail"
    :append-to-body="true"
    :modal-append-to-body="true"
    width="50%"
    top="20px"
  >
    <el-row class="content">
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
              Resend E-mail
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

    .button-container {
      margin: auto;

      button {
        width: 100%;
      }
    }
  }
}
</style>
