<template>
  <div id="track-list-container-root">
    <template v-if="tracks.length > 0">
      <track-list :tracks="tracks" :playback="playback" />
    </template>
    <template v-else>
      <track-list-place-holder />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState, mapActions } from 'vuex'
import { Playback } from '@/store/currentSession'
import Track from '@/models/Track'
import TrackListPlaceHolder from '@/components/molecules/TrackListPlaceHolder.vue'
import TrackList from '@/components/molecules/TrackList.vue'

@Component({
  components: { TrackList, TrackListPlaceHolder },
  methods: {
    ...mapActions('currentSession', ['fetchCurrentSession'])
  },
  computed: {
    ...mapState('currentSession', ['tracks', 'playback'])
  }
})
export default class extends Vue {
  private fetchCurrentSession!: () => void
  private tracks!: Track[]
  private playback!: Playback
}
</script>

<style lang="scss" scoped>
#track-list-container-root {
  padding-top: 56px;
  padding-bottom: calc(6vmin + 56px);
  background-color: $bg-color;
}
</style>
