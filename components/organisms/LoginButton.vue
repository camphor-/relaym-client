<template>
  <div class="login-button-container">
    <v-btn round color="white" @click="login">Login to Spotify</v-btn>
    <div class="login-description">Spotifyにログインしてセッションを表示</div>
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
    margin-bottom: 30px;
  }
}

.login-description {
  color: white;
  font-size: 13px;
}
</style>
