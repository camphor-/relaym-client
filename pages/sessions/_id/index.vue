<template>
  <div class="page-root hide-overflow">
    <place-toolbar class="toolbar" />

    <div class="list-container">
      <track-list-container />
    </div>

    <bottom-controller
      v-on:open-device-select-dialog="openDeviceSelectDialog"
    />

    <device-select-dialog
      v-model="isDeviceSelectDialogOpen"
      @select-device="onSelectDevice"
    />

    <ban-free-plan-dialog v-model="isBanDialogOpen" @ />
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
import BanFreePlanDialog from '@/components/organisms/BanFreePlanDialog.vue'

@Component({
  components: {
    DeviceSelectDialog,
    TrackListContainer,
    PlaceToolbar,
    BottomController,
    BanFreePlanDialog
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
  private isBanDialogOpen: boolean = false

  mounted() {
    this.getStatus()
    if ('add_track' in this.$route.query) {
      const trackURI: string = this.$route.query.add_track as string
      this.addTrack(trackURI)
    }
    this.isBanDialogOpen = true
  }

  onSelectDevice(device: Device) {
    this.play(device)
  }

  openDeviceSelectDialog() {
    this.isDeviceSelectDialogOpen = true
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
}
</style>
