<template>
  <v-list id="track-list-root" two-line>
    <template v-for="(item, index) in playedTracks">
      <v-list-tile
        :key="`first-${index}`"
        :href="item.external_urls.spotify"
        target="_blank"
      >
        <v-list-tile-avatar tile>
          <img :src="item.album.images[1].url" />
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          <v-list-tile-sub-title
            >{{ item.album.name }} - {{ item.artists[0].name }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider :key="`second-${index}`"></v-divider>
    </template>
    <div id="windowWrapper">
      <div v-if="playingTrack" ref="playing" class="playing">
        <v-list-tile :href="playingTrack.external_urls.spotify" target="_blank">
          <v-list-tile-avatar tile>
            <img :src="playingTrack.album.images[1].url" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ playingTrack.name }}</v-list-tile-title>
            <v-list-tile-sub-title
              >{{ playingTrack.album.name }} -
              {{ playingTrack.artists[0].name }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </div>
      <v-divider></v-divider>
      <div v-if="waitingTracks.length > 0">
        <v-subheader>Up Next…</v-subheader>
        <template v-for="(item, index) in waitingTracks">
          <v-list-tile
            :key="`third-${index}`"
            :href="item.external_urls.spotify"
            target="_blank"
          >
            <v-list-tile-avatar tile>
              <img :src="item.album.images[1].url" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              <v-list-tile-sub-title
                >{{ item.album.name }} - {{ item.artists[0].name }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider :key="`fourth-${index}`"></v-divider>
        </template>
      </div>
    </div>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Track from '@/models/Track'
import { Playback } from '@/store/currentSession'

@Component({
  components: {}
})
export default class extends Vue {
  @Prop({ default: [] }) readonly tracks!: Track[]
  @Prop({ default: null }) readonly playback!: Playback

  get playedTracks(): Track[] {
    if (this.playback.head < 0) return []

    const endIndex =
      this.tracks[this.playback.head].uri === this.playback.track.uri
        ? this.playback.head
        : this.playback.head + 1
    return this.tracks.slice(0, endIndex)
  }
  get playingTrack(): Track | null {
    return this.playback.track
  }
  get waitingTracks(): Track[] {
    if (this.playback.head < 0) return this.tracks
    return this.tracks.slice(this.playback.head + 1)
  }

  // TODO: DOMの生成とタイミングが合わない？
  @Watch('playingTrack.uri', { immediate: true })
  onHeadTrackChanged() {
    if (this.playingTrack) {
      const playingElement = this.$refs.playing as Element
      if (playingElement) {
        const playingPos = playingElement.getBoundingClientRect()
        document.scrollingElement.scrollTop = playingPos.top
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#track-list-root {
  padding: 0;
}
#windowWrapper {
  min-height: calc(100vh - 56px);
}

.playing {
  background-color: #ffffff;
  margin: 12px;
  border: 2px solid #707070;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.16);
}

.v-subheader {
  font-size: 1.5rem;
  color: #333333;
  background-color: $bg-color;
  padding-top: 8px;
}
</style>
