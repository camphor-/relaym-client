<template>
  <div class="share-buttons">
    <v-btn
      class="fa-icon-button"
      fab
      dark
      icon
      color="#1da1f2"
      :href="twitterUrl"
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
    >
      <v-icon>fab fa-facebook-f</v-icon>
    </v-btn>
    <v-btn class="fa-icon-button" fab dark icon color="#00B900" :href="lineUrl">
      <v-icon>fab fa-line</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const TWITTER_ID = 'CamphorKyoto'
function getTwitterUrl(title: string, url: string): string {
  return `https://twitter.com/share?url=${encodeURI(
    url
  )}&related=${TWITTER_ID}&text=${encodeURI(title)}`
}
function getFacebookUrl(url: string): string {
  return `http://www.facebook.com/share.php?u=${encodeURI(url)}`
}
function getLineUrl(url: string): string {
  return `https://social-plugins.line.me/lineit/share?url=${encodeURI(url)}`
}

@Component({
  name: 'ShareButtons'
})
export default class extends Vue {
  private shareUrl: string = location.origin

  get twitterUrl() {
    return getTwitterUrl('Relaym', this.shareUrl)
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
