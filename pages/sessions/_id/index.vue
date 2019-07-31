<template>
  <div class="page-root hide-overflow">
    <place-toolbar class="toolbar" />

    <div class="list-container">
      <track-list-container />
    </div>

    <div class="bottom-controller-wrapper">
      <div class="bottom-controller elevation-5">
        <v-layout align-center justify-space-around>
          <v-btn icon large>
            <v-icon>devices</v-icon>
          </v-btn>
          <v-btn v-if="playable" icon large @click="togglePlayback">
            <v-icon v-if="paused">play_arrow</v-icon>
            <v-icon v-else>pause</v-icon>
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

    <device-choose-dialog
      v-model="isDeviceSelectDialogOpen"
      @select-device="onSelectDevice"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters, mapState } from 'vuex'
import PlaceToolbar from '@/components/molecules/PlaceToolbar.vue'
import TrackListContainer from '@/components/organisms/TrackListContainer.vue'
import DeviceChooseDialog from '@/components/organisms/DeviceChooseDialog.vue'
import Device from '@/models/Device'

@Component({
  components: {
    DeviceChooseDialog,
    TrackListContainer,
    PlaceToolbar
  },
  methods: {
    ...mapActions('tracklist', [
      'play',
      'pause',
      'resume',
      'addTrack',
      'getStatus'
    ])
  },
  computed: {
    ...mapState('tracklist', ['paused', 'device']),
    ...mapGetters('tracklist', ['playable'])
  }
})
export default class extends Vue {
  private addTrack!: (payload: string) => void
  private play!: (payload: Device) => void
  private pause!: () => void
  private resume!: () => void
  private getStatus!: () => void
  private paused!: () => boolean
  private playable!: () => boolean
  private device!: () => Device

  private isDeviceSelectDialogOpen: boolean = false

  mounted() {
    this.getStatus()
    if ('add_track' in this.$route.query) {
      const trackURI: string = this.$route.query.add_track as string
      this.addTrack(trackURI)
    }
  }

  async togglePlayback() {
    await this.getStatus()
    // pause
    if (!this.paused) {
      this.pause()
      return
    }
    if (!this.playable) {
      return
    }
    // resume
    if (this.device) {
      this.resume()
      return
    }
    // play
    this.isDeviceSelectDialogOpen = true
  }

  onSelectDevice(device: Device) {
    this.play(device)
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.page-root {
  position: relative;
  height: calc(100vh - #{$header-logo-height});
  display: grid;
  grid-template:
    'toolbar' auto 'list' 1fr
    / 1fr;

  > .toolbar {
    grid-area: toolbar;
  }

  > .list-container {
    grid-area: list;
    overflow-y: auto;
  }

  > .fabs {
    position: absolute;
    right: 32px;
    bottom: 32px;

    a {
      text-decoration: none;
    }
  }
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
  }
}
</style>
