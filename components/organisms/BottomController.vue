<template>
  <div class="bottom-controller-wrapper">
    <div class="bottom-controller elevation-5">
      <v-layout align-center justify-space-around>
        <v-btn icon large @click="openDeviceSelectDialog">
          <v-icon>devices</v-icon>
        </v-btn>
        <v-btn v-if="playable" icon @click="togglePlayback">
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
import { mapActions, mapGetters, mapState } from 'vuex'
import { CurrentSession } from '../../models/Session'

@Component({
  methods: {
    ...mapActions('currentSession', ['pause', 'play', 'fetchCurrentSession'])
  },
  computed: {
    ...mapState('currentSession', ['session']),
    ...mapGetters('currentSession', ['playable']),
    paused() {
      if (!('playback' in this.session)) return true
      return this.session.playback.paused
    }
  }
})
export default class extends Vue {
  private pause!: () => void
  private play!: () => void
  private fetchCurrentSession!: () => void

  private session!: CurrentSession
  private playable!: boolean

  @Emit()
  openDeviceSelectDialog() {}

  async togglePlayback() {
    await this.fetchCurrentSession()

    if ('playback' in this.session) {
      if (this.session.playback.paused) {
        this.play()
      } else {
        this.pause()
      }
    } else if (this.playable) {
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
