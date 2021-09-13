<template>
  <el-row class="home-container">
    <!--
    <el-row style="margin: 20px 0; font-size: 50px; text-align: center">
      todo swiper
    </el-row>
    -->

    <el-row id="main-content">
      <el-row class="level1">
        <el-row>
          <a class="et_pb_button purple" @click="clickHandler('monetize')">
            Monetize
          </a>
          <a class="et_pb_button purple" @click="clickHandler('advertise')">
            Advertise
          </a>
        </el-row>

        <el-row class="linkable">
          Looking for Player Support?
          <a @click="goSupport"> <b>Get Started Now</b> </a>.
        </el-row>
      </el-row>

      <el-row class="level2">
        <el-row class="title">Maximize Monetization</el-row>

        <p>
          GameGem is the industry’s fastest growing Reward Monetization
          Marketplace. We connect advertisers to engaged audiences around the
          world with a user-centric focus. Our advanced, proprietary technology
          provides a best-in-class native ad experience to users and drives
          quality at volume for developers and marketers alike.
        </p>
      </el-row>

      <!-- monetize -->
      <el-row class="level3" id="monetize">
        <el-row>
          <el-col :md="12" :sm="24" :xs="24">
            <el-row class="title">MONETIZE</el-row>

            <el-row>
              <el-row class="sub-title">Premium Demand</el-row>

              <el-row>
                <p>
                  Reach captivated audiences worldwide to maximize your ARPDAU
                  and eCPMs with the industry’s top advertisers
                </p>
              </el-row>
            </el-row>

            <el-row style="margin-top: 40px">
              <el-row class="sub-title">Earn More</el-row>

              <el-row>
                <p>
                  Monetize your user base and increase revenue when players
                  engage with GameGem’s high-performing ad units
                </p>
              </el-row>
            </el-row>

            <el-row style="margin-top: 40px">
              <el-row class="sub-title">Direct Access to the Experts</el-row>

              <el-row>
                <p>
                  Dedicated, in-house expertise and live chat available to
                  deliver reliable support for monetization efficiencies,
                  including best-in-class documentation
                </p>
              </el-row>
            </el-row>

            <el-row style="margin-top: 40px">
              <el-row class="sub-title">Up-to-the-Minute Reporting</el-row>

              <el-row>
                <p>
                  Real-time analytics provide complete transparency with
                  immediate, detailed results
                </p>
              </el-row>
            </el-row>

            <el-row class="button-container">
              <div @click="goSignUp">Sign Up</div>
            </el-row>
          </el-col>

          <el-col :md="12" :sm="24" :xs="24">
            <el-row style="text-align: center; padding: 40px 0">
              <img :src="img_AdGems_Publisher7_optimized" />
            </el-row>
          </el-col>
        </el-row>
      </el-row>

      <!-- advertise -->
      <el-row class="level3" id="advertise" style="text-align: left">
        <el-row>
          <el-col :md="8" :sm="24" :xs="24">
            <el-row style="text-align: center; padding: 40px 0">
              <img :src="img_Advertiser_optimized" />
            </el-row>
          </el-col>

          <el-col :md="16" :sm="24" :xs="24">
            <el-row class="title">ADVERTISE</el-row>

            <el-row>
              <el-row class="sub-title">Your Users, Your Way</el-row>

              <el-row>
                <p>
                  Robust advertising targeting capabilities ensure your tailored
                  ad content reaches the ideal user anywhere in the world
                </p>
              </el-row>
            </el-row>

            <el-row style="margin-top: 40px">
              <el-row class="sub-title">Optimize the Experience</el-row>

              <el-row>
                <p>
                  Control design and functionality to provide the ultimate
                  native experience for optimal ad engagement
                </p>
              </el-row>
            </el-row>

            <el-row style="margin-top: 40px">
              <el-row class="sub-title">Go Global</el-row>

              <el-row>
                <p>
                  Target globally and expand your user base through custom
                  downstream events with CPC, CPCV, CPI, CPA, CPS, and CPE
                  campaigns
                </p>
              </el-row>
            </el-row>

            <el-row style="margin-top: 40px">
              <el-row class="sub-title">Data You Can Use</el-row>

              <el-row>
                <p>
                  Access to behavior data including clicks, views, offer wall
                  opens, retention, and additional ad engagement metrics
                </p>
              </el-row>
            </el-row>

            <el-row class="button-container">
              <div @click="goRunCampaign">Run Campaign</div>
            </el-row>
          </el-col>
        </el-row>
      </el-row>

      <!-- offer wall -->
      <el-row class="level3">
        <el-row>
          <el-col :md="16" :sm="24" :xs="24">
            <el-row class="title">OFFER WALL</el-row>

            <el-row>
              <el-row
                class="sub-title"
                style="font-size: 26px; font-weight: 700"
              >
                The industry’s most rewarding ad unit
              </el-row>

              <el-row style="margin-top: 40px; padding-left: 30%">
                <span style="">Effortless integration </span>
                <p style="display: inline">
                  with multiple options to fit your specific needs, including
                  in-app, mobile web, and desktop
                </p>
              </el-row>

              <el-row style="margin-top: 40px; padding-left: 30%">
                <span style="">Non-intrusive ad unit </span>
                <p style="display: inline">
                  that is entirely opt-in and users are rewarded for engaging
                  with content that they choose
                </p>
              </el-row>

              <el-row style="margin-top: 40px; padding-left: 30%">
                <span style="">Fully-integrated customer support team </span>
                <p style="display: inline">
                  provides expertise, managing all player support requests
                  prompt and directly
                </p>
              </el-row>
            </el-row>
          </el-col>

          <el-col :md="8" :sm="24" :xs="24">
            <el-row style="text-align: center; padding: 40px 0">
              <img :src="img_OfferWallProcess_optimized2" />
            </el-row>
          </el-col>
        </el-row>
      </el-row>

      <el-row class="level4">
        <el-row class="title">SDK</el-row>

        <el-row class="sub-title">
          Lightweight, easy integration for your monetization needs
        </el-row>

        <el-row class="button-container">
          <a
            class="iOS"
            href="https://docs.adgem.com/publisher-support/ios-sdk-integration-guide/"
            target="_blank"
            :style="{ backgroundImage: 'url(' + img_button_ios + ')' }"
          >
            iOS
          </a>

          <a
            class="Andorid"
            href="https://docs.adgem.com/publisher-support/android-sdk-integration-guide/"
            target="_blank"
            :style="{ backgroundImage: 'url(' + img_button_android + ')' }"
          >
            Android
          </a>

          <a
            class="Unity"
            href="https://docs.adgem.com/publisher-support/unity-integration-guide/"
            target="_blank"
            :style="{ backgroundImage: 'url(' + img_button_unity + ')' }"
          >
            Unity
          </a>
        </el-row>
      </el-row>

      <el-row class="level-bottom">
        <p>
          <strong>
            For more information about GameGem’s event schedule or to arrange a
            meeting, send us an email:&nbsp;
            <a href="mailto:todo your email">todo your email</a>
          </strong>
        </p>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      img_AdGems_Publisher7_optimized: require('@/assets/images/index/AdGems-Publisher7_optimized.png'),
      img_Advertiser_optimized: require('@/assets/images/index/Advertiser_optimized.gif'),
      img_OfferWallProcess_optimized2: require('@/assets/images/index/OfferWallProcess_optimized2.gif'),
      img_button_ios: require('@/assets/images/index/apple_button_background2.png'),
      img_button_android: require('@/assets/images/index/android5.png'),
      img_button_unity: require('@/assets/images/index/unity3.png')
    }
  },
  methods: {
    clickHandler: function (id) {
      document.getElementById(id).scrollIntoView({
        behavior: 'smooth'
      })
    },
    goSupport: function () {
      this.$router.push({
        path: '/support'
      })
    },
    goSignUp: function () {
      this.$router.push({
        path: '/signUp'
      })
    },
    goRunCampaign: function () {
      this.$router.push({
        path: '/runCampaign'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/home.scss';
</style>
