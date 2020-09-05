<template>
  <div class="share-buttons">
    <v-btn
      fab
      dark
      icon
      color="#1da1f2"
      :href="twitterUrl"
      aria-label="Twitterでシェア"
    >
      <v-font-awesome :icon="['fab', 'twitter']" />
    </v-btn>
    <v-btn
      fab
      dark
      icon
      color="#1877f2"
      :href="facebookUrl"
      aria-label="Facebookでシェア"
    >
      <v-font-awesome :icon="['fab', 'facebook']" />
    </v-btn>
    <v-btn
      fab
      dark
      icon
      color="#00B900"
      :href="lineUrl"
      aria-label="LINEでシェア"
    >
      <v-font-awesome :icon="['fab', 'line']" />
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getTwitterUrl, getFacebookUrl, getLineUrl } from '@/lib/share'
import VFontAwesome from '~/components/atoms/VFontAwesome.vue'

@Component({
  name: 'ShareButtons',
  components: { VFontAwesome }
})
export default class extends Vue {
  private shareUrl: string = process.server
    ? process.env.BASE_URL
    : location.origin

  get twitterUrl() {
    return getTwitterUrl(
      'Relaym - Spotifyの楽曲を1つのスピーカーで楽しめるWebアプリ',
      this.shareUrl,
      ['Relaym']
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
</style>
