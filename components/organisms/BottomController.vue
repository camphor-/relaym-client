<template>
  <div class="bottom-controller-wrapper">
    <div v-if="showController" class="bottom-controller elevation-5">
      <v-layout align-center justify-space-around>
        <v-btn
          icon
          large
          :disabled="!hasPermissionToControlPlayback"
          @click="openDeviceSelectDialog"
        >
          <v-icon>devices</v-icon>
        </v-btn>
        <v-btn icon :disabled="!canControlState" @click="togglePlayback">
          <v-icon v-if="paused" color="accent" x-large class="play-icon">
            play_arrow
          </v-icon>
          <v-icon v-else color="accent" x-large>pause</v-icon>
        </v-btn>
        <v-btn
          icon
          large
          nuxt
          :to="searchPageUrl"
          :disabled="isSessionArchived"
        >
          <v-icon>playlist_add</v-icon>
        </v-btn>
      </v-layout>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'
import { mapActions, mapState, mapGetters } from 'vuex'
import { Session } from '@/api/v3/types'
import { MessageType, SnackbarPayload } from '@/store/snackbar'
import ActiveDeviceNotFoundDialog from '@/components/organisms/ActiveDeviceNotFoundDialog.vue'

@Component({
  components: { ActiveDeviceNotFoundDialog },
  methods: {
    ...mapActions('pages/sessions/detail', ['controlState']),
    ...mapActions('snackbar', ['showSnackbar'])
  },
  computed: {
    ...mapState('pages/sessions/detail', ['session']),
    ...mapGetters('pages/sessions/detail', [
      'hasPermissionToControlPlayback',
      'canControlState',
      'isSessionArchived'
    ])
  }
})
export default class extends Vue {
  private readonly session!: Session | null
  private readonly canControlPlayback!: boolean
  private controlState!: (req: { state: 'PLAY' | 'PAUSE' }) => Promise<void>
  private showController = true
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

  async togglePlayback() {
    if (!this.session) return

    try {
      if (this.session.playback.state.type === 'PLAY') {
        await this.controlState({ state: 'PAUSE' })
      } else if (this.playable) {
        await this.controlState({ state: 'PLAY' })
      }
    } catch (e) {
      this.$emit('open-active-device-not-found-dialog')
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
