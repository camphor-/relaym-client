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
      <div v-if="waitingTracks.length > 0" class="waiting-tracks">
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
import PlayingTrack from './PlayingTrack.vue'
import { Queue, Track, Playback } from '@/lib/api/v3/types'

@Component({
  components: { TrackListItem, PlayingTrack }
})
export default class extends Vue {
  @Prop({ required: true }) readonly queue!: Queue
  @Prop({ required: true }) readonly playback!: Playback

  get playedTracks(): Track[] {
    return this.queue.tracks.slice(0, this.queue.head)
  }

  get playingTrack(): Track | null {
    return this.playback.state.type !== 'STOP'
      ? this.queue.tracks[this.queue.head]
      : null
  }

  get waitingTracks(): Track[] {
    return this.playback.state.type === 'STOP'
      ? this.queue.tracks.slice(this.queue.head)
      : this.queue.tracks.slice(this.queue.head + 1)
  }

  @Watch('queue.head', { immediate: true })
  async onHeadTrackChanged() {
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (this.playingTrack) {
      const playingElement = this.$refs.playing as Vue
      if (playingElement && document.scrollingElement) {
        document.scrollingElement.scrollTop =
          (playingElement.$el as HTMLElement).offsetTop - 64
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
  // 56px: Toolbar
  // 12px: 再生中の曲の上margin
  min-height: calc(100vh - 56px - 12px);
}

.v-subheader {
  font-size: 1.5rem;
  color: #333333;
  padding-top: 8px;
}

.waiting-tracks {
  margin-bottom: 72px;
}
</style>
