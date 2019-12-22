<template>
  <div class="bottom-controller-wrapper">
    <div class="bottom-controller elevation-5">
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
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'
import { mapActions, mapState } from 'vuex'
import { Playback } from '@/store/currentSession'
import Track from '../../models/Track'
import User from '../../models/User'

@Component({
  methods: {
    ...mapActions('currentSession', ['pause', 'play', 'fetchCurrentSession']),
    ...mapActions('devices', ['fetchAvailableDevices'])
  },
  computed: {
    ...mapState('currentSession', ['playback', 'id', 'delegate', 'tracks']),
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

  @Emit()
  openDeviceSelectDialog() {}

  playable(): boolean {
    // セッションに参加していない
    if (this.id === null) {
      this.$router.push('/')
      return false
    }

    // 再生デバイスが指定されていない
    if (!this.delegate) {
      return false
    }
    return this.playback.head < this.tracks.length
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
