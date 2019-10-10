<template>
  <div class="hide-overflow">
    <slide-menu v-model="isShowSlideMenu" />
    <div class="page-root hide-overflow">
      <session-toolbar @open-slider-menu="showSliderMenu" />

      <div class="list-container">
        <track-list-container />
      </div>

      <bottom-controller @open-device-select-dialog="openDeviceSelectDialog" />

      <device-select-dialog
        v-model="isDeviceSelectDialogOpen"
        @select-device="onSelectDevice"
      />

      <ban-free-plan-dialog v-model="isBanDialogOpen" @ />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapActions } from 'vuex'
import SessionToolbar from '@/components/molecules/SessionToolbar.vue'
import TrackListContainer from '@/components/organisms/TrackListContainer.vue'
import DeviceSelectDialog from '@/components/organisms/DeviceSelectDialog.vue'
import BottomController from '@/components/organisms/BottomController.vue'
import Device from '@/models/Device'
import SlideMenu from '@/components/molecules/SlideMenu.vue'
import BanFreePlanDialog from '@/components/organisms/BanFreePlanDialog.vue'

@Component({
  components: {
    DeviceSelectDialog,
    TrackListContainer,
    BottomController,
    SessionToolbar,
    SlideMenu,
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
  private pageRoot: any
  private isBanDialogOpen: boolean = false
  private isShowSlideMenu: boolean = false

  mounted() {
    this.getStatus()
    if ('add_track' in this.$route.query) {
      const trackURI: string = this.$route.query.add_track as string
      this.addTrack(trackURI)
    }
    this.pageRoot = document.getElementsByClassName('page-root')[0]
    this.pageRoot.style.transition = '0.2s cubic-bezier(0.4, 0, 0.2, 1)'
    this.isBanDialogOpen = true
  }

  onSelectDevice(device: Device) {
    this.play(device)
  }

  openDeviceSelectDialog() {
    this.isDeviceSelectDialogOpen = true
  }

  showSliderMenu() {
    this.isShowSlideMenu = true
  }

  @Watch('isShowSlideMenu')
  onIsShowSliderMenuChanged(newValue: boolean) {
    if (newValue) {
      this.pageRoot.style.transform = 'translateX(300px)'
    } else {
      this.pageRoot.style.transform = ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
