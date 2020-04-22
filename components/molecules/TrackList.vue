<template>
  <v-list id="track-list-root" two-line>
    <template v-for="(item, index) in playedTracks">
      <track-list-item :key="`first-${index}`" :track="item" />
      <v-divider :key="`second-${index}`"></v-divider>
    </template>
    <div id="windowWrapper">
      <playing-track
        v-if="playingTrack"
        ref="playing"
        :playback="playback"
        :playing-track="playingTrack"
      />
      <div v-if="waitingTracks.length > 0">
        <v-subheader>Up Next…</v-subheader>
        <template v-for="(item, index) in waitingTracks">
          <track-list-item :key="`third-${index}`" :track="item" />
          <v-divider :key="`fourth-${index}`"></v-divider>
        </template>
      </div>
    </div>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import TrackListItem from './TrackListItem.vue'
import PlayingTrack from './PlayingTrack'
import Track from '@/models/Track'
import { Playback } from '@/store/currentSession'

@Component({
  components: { TrackListItem, PlayingTrack }
})
export default class extends Vue {
  @Prop({ default: [] }) readonly tracks!: Track[]
  @Prop({ default: null }) readonly playback!: Playback

  get playedTracks(): Track[] {
    return this.tracks.slice(0, this.playback.head)
  }
  get playingTrack(): Track | null {
    return this.playback.finished ? null : this.tracks[this.playback.head]
  }
  get waitingTracks(): Track[] {
    return this.tracks.slice(this.playback.head + 1)
  }

  @Watch('playingTrack.uri', { immediate: true })
  async onHeadTrackChanged() {
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (this.playingTrack) {
      const playingElement = this.$refs.playing as Vue
      if (playingElement) {
        document.scrollingElement.scrollTop = playingElement.$el.offsetTop - 64
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#track-list-root {
  padding: 0;
  background-color: $bg-color;
}
#windowWrapper {
  min-height: calc(100vh - 56px);
}

.v-subheader {
  font-size: 1.5rem;
  color: #333333;
  padding-top: 8px;
}
</style>
