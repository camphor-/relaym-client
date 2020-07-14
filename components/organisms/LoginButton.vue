<template>
  <div class="login-button-container">
    <v-btn round color="white" @click="login">Login to Spotify</v-btn>
    <p class="terms-agreement">
      <nuxt-link to="/terms">利用規約</nuxt-link>に同意する必要があります。
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getLoginUrl } from '@/api/v3/auth'

@Component({
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
  > button {
    margin-bottom: 16px;
  }
}

.terms-agreement {
  color: white;
  font-size: 13px;
  a {
    color: white;
  }
}
</style>
