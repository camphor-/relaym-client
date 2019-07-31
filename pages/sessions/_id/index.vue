<template>
  <div class="page-root hide-overflow">
    <place-toolbar class="toolbar" />

    <div class="list-container">
      <track-list-container />
    </div>

    <bottom-controller v-model="isDeviceSelectDialogOpen" />

    <device-select-dialog
      v-model="isDeviceSelectDialogOpen"
      @select-device="onSelectDevice"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'
import PlaceToolbar from '@/components/molecules/PlaceToolbar.vue'
import TrackListContainer from '@/components/organisms/TrackListContainer.vue'
import DeviceSelectDialog from '@/components/organisms/DeviceSelectDialog.vue'
import BottomController from '@/components/organisms/BottomController.vue'
import Device from '@/models/Device'

@Component({
  components: {
    DeviceSelectDialog,
    TrackListContainer,
    PlaceToolbar,
    BottomController
  },
  methods: {
    ...mapActions('tracklist', ['play', 'addTrack', 'getStatus'])
  }
})
export default class extends Vue {
  private addTrack!: (payload: string) => void
  private getStatus!: () => void
  private play!: (payload: Device) => void

  private isDeviceSelectDialogOpen: boolean = false
  private $route: any

  mounted() {
    this.getStatus()
    if ('add_track' in this.$route.query) {
      const trackURI: string = this.$route.query.add_track as string
      this.addTrack(trackURI)
    }
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
</style>
