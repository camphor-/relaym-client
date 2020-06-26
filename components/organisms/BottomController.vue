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
    <snackbar v-model="showSnackbar" :text="snackbarText" />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'
import { mapActions, mapState } from 'vuex'
import Snackbar from '@/components/molecules/Snackbar.vue'
import { Session } from '@/api/v3/types'

@Component({
  components: { Snackbar },
  methods: {
    ...mapActions('pages/sessions/detail', ['fetchSession'])
  },
  computed: {
    ...mapState('pages/sessions/detail', ['session']),
    ...mapState('devices', ['availableDevices'])
  }
})
export default class extends Vue {
  private pause!: () => void
  private play!: () => void
  private fetchSession!: () => void

  private readonly session!: Session | null

  private showSnackbar = false
  private snackbarText = ''
  private showController = true

  @Emit()
  openDeviceSelectDialog() {}

  get playable(): boolean {
    if (!this.session) return false

    // 再生可能な曲があるか確認
    if (this.session.queue.head >= this.session.queue.tracks.length) {
      this.snackbarText = '曲を追加してください。'
      this.showSnackbar = true
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
    await this.fetchSession()
    if (!this.session) return

    if (this.session.playback.state.type === 'PLAY') {
      this.pause()
    } else {
      this.play()
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
