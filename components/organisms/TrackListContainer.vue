<template>
  <div id="track-list-container-root">
    <template v-if="queue.tracks.length > 0">
      <track-list :queue="queue" :playback="playback" class="track-list" />
    </template>
    <template v-else>
      <track-list-place-holder />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import TrackListPlaceHolder from '@/components/molecules/TrackListPlaceHolder.vue'
import TrackList from '@/components/molecules/TrackList.vue'
import { Playback, Session, Queue } from '@/api/v3/types'

@Component({
  components: { TrackList, TrackListPlaceHolder },
  computed: {
    ...mapState('pages/sessions/detail', ['session'])
  }
})
export default class extends Vue {
  private session!: Session | null

  get queue(): Queue {
    if (!this.session) return { head: 0, tracks: [] }
    return this.session.queue
  }

  get playback(): Playback {
    if (!this.session) {
      return {
        state: { type: 'STOP' },
        device: null
      }
    }

    return this.session.playback
  }
}
</script>

<style lang="scss" scoped>
#track-list-container-root {
  padding-top: 56px;
}
.track-list {
  padding-bottom: calc(6vmin + 56px);
  background-color: $bg-color;
}
</style>
