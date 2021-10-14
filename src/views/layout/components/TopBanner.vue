<template>
  <el-row class="top-banner-container" v-show="isLogin()">
    <span class="left">
      Schedule Some Time to Meet the {{ projectName }} Team!
    </span>

    <section class="right" v-if="device !== 'mobile'">
      <template v-if="!u_name">
        <span @click="clickHandler(0)">Sign Up</span>
        <span @click="clickHandler(1)">Log In</span>
      </template>

      <template v-if="u_name">
        <template v-if="$route.path !== '/userCenter'">
          <!-- @click="clickHandler(2)" -->
          <span class="user-center" style="margin: 0 !important">
            <!--<i class="el-icon-user-solid" />-->
            <el-popover
              v-model="popoverVisibility"
              placement="top-start"
              width="300"
              trigger="manual"
            >
              <span
                slot="reference"
                style="margin: 0 !important"
                @click="clickHandler(7)"
              >
                <i class="el-icon-user-solid" />
              </span>

              <user-center />
            </el-popover>
          </span>
        </template>
        <template v-else>
          <span class="user-center" @click="clickHandler(9)">
            <i class="el-icon-s-home" />
          </span>
        </template>
      </template>
    </section>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

import UserCenter from '~views/UserCenter'

export default {
  name: 'TopBanner',
  components: {
    UserCenter
  },
  data() {
    return {
      popoverVisibility: false
    }
  },
  mounted() {},
  computed: {
    ...mapGetters(['device', 'u_id', 'u_name']),

    projectName() {
      return process.env.VUE_APP_PROJECT_NAME
    }
  },
  methods: {
    isLogin() {
      if (sessionStorage.getItem('GameGemUID')) {
        this.$store.commit('user/SET_UID', sessionStorage.getItem('GameGemUID'))
      }

      if (sessionStorage.getItem('GameGemUName')) {
        this.$store.commit(
          'user/SET_UNAME',
          sessionStorage.getItem('GameGemUName')
        )
      }

      return true
    },

    clickHandler: function (type) {
      let path = ''
      if (type === 0) {
        path = '/signUp'
      } else if (type === 1) {
        path = 'logIn'
      } else if (type === 2) {
        path = '/userCenter'
      } else if (type === 9) {
        path = '/'
      }

      if (type === 7) {
        // 个人中心 popover
        this.popoverVisibility = !this.popoverVisibility
      } else {
        if (type !== 9) {
          this.$router.push({
            path: path
          })
        } else {
          this.$router.replace({
            path: path
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.top-banner-container {
  line-height: 35px;
  padding: 0 18px;
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

    .user-center {
    }
  }
}
</style>
