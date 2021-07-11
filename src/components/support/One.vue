<template>
  <el-row>
    <article class="md-content__inner md-typeset">
      <p></p>
      <center>
        <p></p>
        <h1 id="welcome-to-adgem-player-support">
          Welcome to GameGem Player Support
        </h1>
        <hr />
        <p></p>
      </center>

      <p></p>
      <h2 id="ios-145">iOS 14.5</h2>
      <p>
        Recently, Apple released a new operating system that is designed to give
        its users more control over data privacy. For all Apple devices on iOS
        14.5, apps are now required to ask the user if they will opt-in to app
        app tracking. Devices on earlier iOS versions only require users to
        opt-out.
      </p>
      <p>
        See <span @click="clickHandler(1)">here</span> for more information
        about these changes.
      </p>
      <hr />
      <h2 id="player-support">Player Support</h2>
      <p>
        GameGem is committed to your experience and offers customer support to our
        end users for missing rewards for the offers you’ve completed.
      </p>
      <p>
        Look <span @click="clickHandler(2)">here</span> for more information
        contacting the Player Support Team.
      </p>
      <hr />
      <h2 id="user-terms-of-service">User Terms of Service</h2>
      <p>
        User terms of service agreement for Users of the GameGem Customer Support,
        GameGem advertising products (the GameGem Offer Wall) and advertising offers
        powered by GameGem.
      </p>
      <p>
        Click <span @click="clickHandler(3)">here</span> for user terms of
        service.
      </p>
    </article>
  </el-row>
</template>

<script>
export default {
  name: 'One',
  methods: {
    clickHandler: function (type) {
      console.info(type)
      // todo
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/support-content.scss';
</style>
