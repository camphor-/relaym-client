<template>
  <div class="login-button-container">
    <v-btn large round outline @click="login">Login to Spotify</v-btn>
    <p class="terms-agreement">
      ログインすることで、<nuxt-link to="/terms">利用規約</nuxt-link>に<br
        class="hidden-md-and-up"
      />同意したものとみなされます。
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getLoginUrl } from '@/api/v3/auth'

@Component({
  name: 'LoginButton',
  components: {}
})
export default class extends Vue {
  login() {
    location.href = getLoginUrl(location.origin)
  }
}
</script>

<style lang="scss" scoped>
.login-button-container {
  text-align: center;
}

.terms-agreement {
  font-size: 12px;
  margin-top: 16px;
  a {
    color: inherit;
  }
}
</style>
