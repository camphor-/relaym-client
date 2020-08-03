<template>
  <div class="share-buttons">
    <v-btn
      class="fa-icon-button"
      fab
      dark
      icon
      color="#1da1f2"
      :href="twitterUrl"
      aria-label="Twitterでシェア"
    >
      <v-icon>fab fa-twitter</v-icon>
    </v-btn>
    <v-btn
      class="fa-icon-button"
      fab
      dark
      icon
      color="#1877f2"
      :href="facebookUrl"
      aria-label="Facebookでシェア"
    >
      <v-icon>fab fa-facebook-f</v-icon>
    </v-btn>
    <v-btn
      class="fa-icon-button"
      fab
      dark
      icon
      color="#00B900"
      :href="lineUrl"
      aria-label="LINEでシェア"
    >
      <v-icon>fab fa-line</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getTwitterUrl, getFacebookUrl, getLineUrl } from '@/lib/share'

@Component({
  name: 'ShareButtons'
})
export default class extends Vue {
  private shareUrl: string = location.origin

  get twitterUrl() {
    return getTwitterUrl(
      'Relaym - Spotifyの楽曲を1つのスピーカーで楽しめるWebアプリ',
      this.shareUrl
    )
  }

  get facebookUrl() {
    return getFacebookUrl(this.shareUrl)
  }

  get lineUrl() {
    return getLineUrl(this.shareUrl)
  }
}
</script>

<style lang="scss" scoped>
.share-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
.fa-icon-button i {
  display: flex;
}
</style>
