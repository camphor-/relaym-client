<template>
  <div id="track-list-container-root">
    <template v-if="session && session.queue.tracks.length > 0">
      <track-list
        :played-tracks="getPlayedTracks"
        :playing-track="getPlayingTrack"
        :waiting-tracks="getWaitingTracks"
      />
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
import { CurrentSession } from '@/models/Session'

@Component({
  components: { TrackList, TrackListPlaceHolder },
  methods: {
    ...mapActions('currentSession', ['fetchCurrentSession'])
  },
  computed: {
    ...mapState('currentSession', ['session']),
    ...mapGetters('currentSession', [
      'getPlayedTracks',
      'getPlayingTrack',
      'getWaitingTracks'
    ])
  }
})
export default class extends Vue {
  private fetchCurrentSession!: () => void
  private getPlayedTracks!: (payload: {}) => Track[]
  private getPlayingTrack!: (payload: {}) => Track
  private getWaitingTracks!: (payload: {}) => Track[]

  private session: CurrentSession

  mounted() {
    this.fetchCurrentSession()
  }
}
</script>

<style lang="scss" scoped>
#track-list-container-root {
  padding-top: 56px;
  padding-bottom: calc(6vmin + 56px);
}
</style>
