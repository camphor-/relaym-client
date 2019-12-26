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
        <nuxt-link
          :to="{ path: '/search', query: { redirect_to: $route.path } }"
        >
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
import { Playback } from '@/store/currentSession'
import Track from '@/models/Track'
import User from '@/models/User'
import Snackbar from '@/components/molecules/Snackbar.vue'
import Device from '@/models/Device'

@Component({
  components: { Snackbar },
  methods: {
    ...mapActions('currentSession', ['pause', 'play', 'fetchCurrentSession']),
    ...mapActions('devices', ['fetchAvailableDevices'])
  },
  computed: {
    ...mapState('currentSession', ['playback', 'id', 'delegate', 'tracks']),
    ...mapState('devices', ['availableDevices']),
    paused() {
      return this.playback.paused
    }
  }
})
export default class extends Vue {
  private pause!: () => void
  private play!: () => void
  private fetchCurrentSession!: () => void
  private fetchAvailableDevices!: () => void

  private playback!: Playback

  private id: string | null
  private delegate?: User | null
  private tracks: Track[]
  private availableDevices: Device[]

  private showSnackbar = false
  private snackbarText = ''
  private showController = true

  @Emit()
  openDeviceSelectDialog() {}

  playable(): boolean {
    // セッションに参加していない
    if (this.id === null) {
      this.showController = false
      return false
    }

    // 再生可能なデバイスがない
    if (this.availableDevices.length === 0) {
      this.snackbarText = 'デバイスが見つかりません。'
      this.showSnackbar = true
      return false
    }

    // デバイスを選択する必要がある
    if (!this.delegate) {
      this.snackbarText = 'デバイスを選択してください。'
      this.showSnackbar = true
      return false
    }

    // 再生可能な曲があるか確認
    if (this.playback.head >= this.tracks.length) {
      this.snackbarText = '曲を追加してください。'
      this.showSnackbar = true
      return false
    }

    return true
  }

  async togglePlayback() {
    await this.fetchCurrentSession()
    await this.fetchAvailableDevices()

    if (this.playback.paused && this.playable()) {
      this.play()
    } else {
      this.pause()
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.bottom-controller-wrapper {
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
