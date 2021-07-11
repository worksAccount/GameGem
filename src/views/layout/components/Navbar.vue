<template>
  <el-row class="nav-bar-container">
    <div class="line">
      <div class="left">
        <the-logo />
      </div>

      <div class="right">
        <template v-if="device !== 'mobile'">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="selectHandler"
          >
            <template v-for="(item, index) in menuList">
              <el-menu-item :index="item.id" :key="index">
                <template v-if="item.type !== '9'">
                  {{ item.name }}
                </template>
                <template v-else>
                  <a :href="item.path" target="_blank">{{ item.name }}</a>
                </template>
              </el-menu-item>
            </template>
          </el-menu>
        </template>
        <template v-else>
          <el-row class="mobile-menu">
            <div class="icon">
              <span>
                <the-menu
                  ref="theMenu"
                  v-model="activeIndex"
                  :menu-list="menuListCollapsed"
                  @menuItemClick="menuItemClickHandler"
                >
                  <i class="el-icon-s-operation" />
                </the-menu>
              </span>
            </div>
          </el-row>
        </template>
      </div>
    </div>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

import TheMenu from './TheMenu'
import TheLogo from './TheLogo'

export default {
  name: 'Navbar',
  components: {
    TheMenu,
    TheLogo
  },
  data() {
    return {
      activeIndex: '0',
      menuList: [
        {
          name: 'Monetize',
          id: '1',
          type: '5', // 0 内部页面 5 锚点 9 外部链接
          path: ''
        },
        {
          name: 'Advertise',
          id: '2',
          type: '5', // 0 内部页面 5 锚点 9 外部链接
          path: ''
        },
        {
          name: 'Players',
          id: '3',
          type: '0', // 0 内部页面 5 锚点 9 外部链接
          path: ''
        },
        {
          name: 'contact',
          id: '4',
          type: '0', // 0 内部页面 5 锚点 9 外部链接
          path: ''
        }
      ],
      menuListCollapsed: []
    }
  },
  computed: {
    ...mapGetters(['device'])
  },
  created() {
    this.activeIndex = this.menuList[0].id
    this.menuListCollapsed = [
      ...this.menuList,
      {
        name: 'Sign Up',
        id: '5',
        type: '0', // 0 内部页面 5 锚点 9 外部链接
        path: ''
      },
      {
        name: 'Log In',
        id: '6',
        type: '0', // 0 内部页面 5 锚点 9 外部链接
        path: ''
      }
    ]
  },
  methods: {
    selectHandler: function (e) {
      this.activeIndex = e

      if (e === '1') {
        if (this.$route.path !== '/index') {
          this.$router.push({
            path: '/'
          })

          setTimeout(() => {
            document.getElementById('monetize').scrollIntoView({
              behavior: 'smooth'
            })
          }, 300)
        } else {
          document.getElementById('monetize').scrollIntoView({
            behavior: 'smooth'
          })
        }
      } else if (e === '2') {
        if (this.$route.path !== '/index') {
          this.$router.push({
            path: '/'
          })

          setTimeout(() => {
            document.getElementById('advertise').scrollIntoView({
              behavior: 'smooth'
            })
          }, 300)
        } else {
          document.getElementById('advertise').scrollIntoView({
            behavior: 'smooth'
          })
        }
      } else {
        let path = ''
        if (e === '3') {
          path = '/support'
        } else if (e === '4') {
          path = '/contact'
        }
        this.$router.push({
          path: path
        })
      }
    },
    clickHandler: function () {
      console.info('click handler')
      // todo
    },
    goIndex: function () {
      console.info('go index')
    },

    menuItemClickHandler: function (item) {
      if (item.id === '1') {
        if (this.$route.path !== '/index') {
          this.$router.push({
            path: '/'
          })

          setTimeout(() => {
            document.getElementById('monetize').scrollIntoView({
              behavior: 'smooth'
            })
          }, 300)
        } else {
          document.getElementById('monetize').scrollIntoView({
            behavior: 'smooth'
          })
        }
      } else if (item.id === '2') {
        if (this.$route.path !== '/index') {
          this.$router.push({
            path: '/'
          })

          setTimeout(() => {
            document.getElementById('advertise').scrollIntoView({
              behavior: 'smooth'
            })
          }, 300)
        } else {
          document.getElementById('advertise').scrollIntoView({
            behavior: 'smooth'
          })
        }
      } else {
        let path = '/todo'
        if (item.id === '3') {
          path = '/support'
        } else if (item.id === '4') {
          path = '/contact'
        } else if (item.id === '5') {
          path = '/signUp'
        } else if (item.id === '6') {
          path = '/logIn'
        }
        this.$router.push({
          path: path
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$LOGO_WIDTH: 200px;
.nav-bar-container {
  box-shadow: 0 1px 0 rgb(0 0 0 / 10%);

  .line {
    width: 100%;

    .left {
      width: $LOGO_WIDTH;
      display: inline-block;
      float: left;
    }

    .right {
      width: calc(100% - #{$LOGO_WIDTH});
      display: inline-block;
      float: left;

      .mobile-menu {
        line-height: 60px;
        float: right;
        padding-right: 30px;

        .icon {
          color: #7359a4;
          font-size: 25px;
          cursor: pointer;
        }
      }
    }
  }

  ::v-deep.el-menu {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    border-bottom: none;

    .el-menu-item {
      border-bottom: none;

      &.is-active {
        border-bottom: none;
      }
    }
  }
}
</style>
