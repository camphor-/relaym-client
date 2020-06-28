<template>
  <div class="bottom-controller-wrapper">
    <div v-if="showController" class="bottom-controller elevation-5">
      <v-layout align-center justify-space-around>
        <v-btn icon large @click="openDeviceSelectDialog">
          <v-icon>devices</v-icon>
        </v-btn>
        <v-btn icon @click="togglePlayback">
          <v-icon v-if="paused" color="accent" x-large class="play-icon">
            play_arrow
          </v-icon>
          <v-icon v-else color="accent" x-large>pause</v-icon>
        </v-btn>
        <nuxt-link :to="searchPageUrl">
          <v-btn icon large>
            <v-icon>playlist_add</v-icon>
          </v-btn>
        </nuxt-link>
      </v-layout>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'
import { mapActions, mapState } from 'vuex'
import { Session } from '@/api/v3/types'
import { MessageType, SnackbarPayload } from '@/store/snackbar'

@Component({
  methods: {
    ...mapActions('pages/sessions/detail', ['controlPlayback'])
  },
  computed: {
    ...mapState('pages/sessions/detail', ['session']),
    ...mapActions('snackbar', ['showSnackbar'])
  }
})
export default class extends Vue {
  private readonly session!: Session | null
  private controlPlayback!: (req: { state: 'PLAY' | 'PAUSE' }) => void
  private showSnackbar!: (payload: SnackbarPayload) => void

  @Emit()
  openDeviceSelectDialog() {}

  get playable(): boolean {
    if (!this.session) return false

    // 再生可能な曲があるか確認
    if (this.session.queue.head >= this.session.queue.tracks.length) {
      this.showSnackbar({
        message: '曲を追加してください。',
        messageType: MessageType.info
      })
      return false
    }

    return true
  }

  get paused(): boolean {
    if (!this.session) return true
    return this.session.playback.state.type !== 'PLAY'
  }

  get searchPageUrl(): string {
    return `/sessions/${this.session?.id}/search`
  }

  togglePlayback() {
    if (!this.session) return

    if (this.session.playback.state.type === 'PLAY') {
      this.controlPlayback({ state: 'PAUSE' })
    } else {
      this.controlPlayback({ state: 'PLAY' })
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.bottom-controller-wrapper {
  z-index: 1;
  width: 100%;
  position: fixed;
  bottom: 0;
  .bottom-controller {
    margin: 3vmin auto;
    border-radius: 10px;
    background: #fff;
    width: 94vw;
    max-width: 800px;
    .play-icon {
      position: absolute;
    }
  }
}
</style>
