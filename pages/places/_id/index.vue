<template>
  <div class="page-root hide-overflow">
    <place-toolbar class="toolbar" />

    <div class="list-container">
      <track-list-container />
    </div>

    <div class="fabs">
      <v-btn fab dark color="primary" @click="togglePlayback">
        <v-icon v-if="paused">play_arrow</v-icon>
        <v-icon v-else>pause</v-icon>
      </v-btn>
      <nuxt-link :to="{ path: '/search', query: { redirect_to: $route.path } }">
        <v-btn fab dark color="accent">
          <v-icon>add</v-icon>
        </v-btn>
      </nuxt-link>
    </div>

    <device-choose-dialog
      v-model="isDialogOpen"
      @select-device="onSelectDevice"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState, mapActions } from 'vuex'
import PlaceToolbar from '@/components/molecules/PlaceToolbar.vue'
import TrackListContainer from '@/components/organisms/TrackListContainer.vue'
import DeviceChooseDialog from '@/components/organisms/DeviceChooseDialog.vue'
import Device from '@/models/Device'

@Component({
  components: { DeviceChooseDialog, TrackListContainer, PlaceToolbar },
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
    ...mapState('tracklist', ['paused'])
  }
})
export default class extends Vue {
  private addTrack!: (payload: string) => void
  private play!: (payload: Device) => void
  private pause!: () => void
  private resume!: () => void
  private getStatus!: () => void

  private isDialogOpen: boolean = false

  mounted() {
    this.getStatus()
    console.log(this.$store.state.tracklist)
    if ('add_track' in this.$route.query) {
      const trackURI: string = this.$route.query.add_track as string
      this.addTrack(trackURI)
    }
  }

  async togglePlayback() {
    await this.getStatus()
    console.log(this.$store.state.tracklist)
    // pause
    if (!this.$store.state.tracklist.paused) {
      this.pause()
      return
    }
    // resume
    if (this.$store.state.tracklist.device) {
      this.resume()
      return
    }
    // play
    this.isDialogOpen = true
  }

  onSelectDevice(device: Device) {
    this.play(device)
  }
}
</script>

<style lang="scss" scoped>
.page-root {
  position: relative;
  height: calc(100vh - #{$header-logo-height});
  display: grid;
  grid-template:
    'toolbar' auto
    'list' 1fr
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
</style>
