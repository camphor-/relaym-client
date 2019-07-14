<template>
  <div class="container-root">
    <template v-if="trackList">
      <div class="list-root">
        <track-list
          :played-tracks="getPlayedTracks"
          :playing-track="getPlayingTrack"
          :waiting-tracks="getWaitingTracks"
        />
      </div>
    </template>
    <template v-else>
      <track-list-place-holder />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState, mapActions, mapGetters } from 'vuex'
import TrackListPlaceHolder from '@/components/molecules/TrackListPlaceHolder.vue'
import TrackList from '@/components/molecules/TrackList.vue'
import Track from '@/models/Track'

@Component({
  components: { TrackList, TrackListPlaceHolder },
  methods: {
    ...mapActions('tracklist', ['fetchTrackList'])
  },
  computed: {
    ...mapState('tracklist', ['trackList']),
    ...mapGetters('tracklist', [
      'getPlayedTracks',
      'getPlayingTrack',
      'getWaitingTracks'
    ])
  }
})
export default class extends Vue {
  private fetchTrackList!: (payload: {}) => void
  private getPlayedTracks!: (payload: {}) => Track[]
  private getPlayingTrack!: (payload: {}) => Track
  private getWaitingTracks!: (payload: {}) => Track[]
  mounted() {
    this.fetchTrackList({})
  }
  // playedTracks = this.getPlayedTracks({})
  // playingTrack = this.getPlayingTrack({})
  // waitingTracks = this.getWaitingTracks({})
}
</script>

<style lang="scss" scoped>
.container-root {
  height: 100%;
}
.list-root {
  max-height: 100%;
  overflow-y: auto;
}
</style>
