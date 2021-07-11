<template>
  <el-row class="top-banner-container">
    <span class="left">
      Schedule Some Time to Meet the {{ projectName }} Team!
    </span>

    <section class="right" v-if="device !== 'mobile'">
      <span @click="clickHandler(0)">Sign Up</span>
      <span @click="clickHandler(1)">Log In</span>
    </section>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TopBanner',
  computed: {
    ...mapGetters(['device']),

    projectName() {
      return process.env.VUE_APP_PROJECT_NAME
    }
  },
  methods: {
    clickHandler: function (type) {
      let path = ''
      if (type === 0) {
        path = '/signUp'
      } else {
        path = 'logIn'
      }
      this.$router.push({
        path: path
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.top-banner-container {
  line-height: 35px;
  padding: 0 30px;
  color: #fff;
  background: #7359a4;
  font-size: 14px;

  display: flex;

  .left {
    flex: 1;
  }

  .right {
    span {
      cursor: pointer;

      &:hover {
        opacity: 0.7;
        transition: all 0.4s ease-in-out;
      }

      &:nth-child(1) {
        margin-right: 15px;
      }
    }
  }
}
</style>
