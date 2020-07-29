<template>
  <div class="hide-overflow">
    <slide-menu v-model="isShowSlideMenu" />
    <div class="page-root hide-overflow">
      <session-toolbar
        :session-name="sessionName"
        @open-slider-menu="showSliderMenu"
      />

      <div class="list-container">
        <session-archived-header
          v-if="isSessionArchived"
          class="archived-header"
        />
        <track-list-container />
      </div>

      <bottom-controller
        @open-device-select-dialog="openDeviceSelectDialog"
        @open-active-device-not-found-dialog="openActiveDeviceNotFoundDialog"
      />

      <interrupt-detected-dialog
        :value="isInterruptDetectedDialogOpen"
        @input="closeInterruptDetectedDialog"
      ></interrupt-detected-dialog>

      <device-select-dialog
        v-model="isDeviceSelectDialogOpen"
        @select-device="onSelectDevice"
      />

      <active-device-not-found-dialog
        :value="isActiveDeviceNotFoundDialogOpen"
        @input="closeActiveDeviceNotFoundDialog"
        @open-spotify="openSpotify"
      ></active-device-not-found-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapActions, mapState, mapGetters } from 'vuex'
import SlideMenu from '@/components/organisms/SlideMenu.vue'
import SessionToolbar from '@/components/molecules/SessionToolbar.vue'
import TrackListContainer from '@/components/organisms/TrackListContainer.vue'
import DeviceSelectDialog from '@/components/organisms/DeviceSelectDialog.vue'
import BottomController from '@/components/organisms/BottomController.vue'
import InterruptDetectedDialog from '@/components/organisms/InterruptDetectedDialog.vue'
import { Device } from '@/api/v3/types'
import ActiveDeviceNotFoundDialog from '@/components/organisms/ActiveDeviceNotFoundDialog.vue'
import SessionArchivedHeader from '@/components/atoms/SessionArchivedHeader.vue'

@Component({
  components: {
    SessionArchivedHeader,
    ActiveDeviceNotFoundDialog,
    DeviceSelectDialog,
    TrackListContainer,
    BottomController,
    SessionToolbar,
    SlideMenu,
    InterruptDetectedDialog
  },
  computed: {
    ...mapState('pages/sessions/detail', ['isInterruptDetectedDialogOpen']),
    ...mapGetters('pages/sessions/detail', ['sessionName', 'isSessionArchived'])
  },
  methods: {
    ...mapActions('pages/sessions/detail', [
      'setSessionId',
      'fetchSession',
      'setDevice',
      'connectWebSocket',
      'disconnectWebSocket',
      'clearProgressTimer',
      'setIsInterruptDetectedDialogOpen',
      'controlState'
    ])
  }
})
export default class extends Vue {
  private setSessionId!: (id: string) => Promise<void>
  private fetchSession!: () => Promise<void>
  private setDevice!: (deviceId: string) => void
  private connectWebSocket!: () => void
  private disconnectWebSocket!: () => void
  private clearProgressTimer!: () => void
  private setIsInterruptDetectedDialogOpen!: (isOpen: boolean) => void
  private controlState!: (req: { state: 'PLAY' | 'PAUSE' }) => Promise<void>

  private isDeviceSelectDialogOpen: boolean = false
  private pageRoot: any
  private isShowSlideMenu: boolean = false
  private readonly isInterruptDetectedDialogOpen!: boolean
  private isActiveDeviceNotFoundDialogOpen: boolean = false
  private isOpeningSpotify: boolean = false

  @Watch('$route.params.id', { immediate: true })
  async onPathIdChanged() {
    try {
      await this.setSessionId(this.$route.params.id)
    } catch (e) {
      this.$router.push({ name: 'error' })
    }
    this.connectWebSocket()
  }

  mounted() {
    this.pageRoot = document.getElementsByClassName('page-root')[0]
    this.pageRoot.style.transition = '0.2s cubic-bezier(0.4, 0, 0.2, 1)'
    document.addEventListener('visibilitychange', this.onVisibilityChange)
  }

  destroyed() {
    this.disconnectWebSocket()
    this.clearProgressTimer()
    document.removeEventListener('visibilitychange', this.onVisibilityChange)
  }

  async onSelectDevice(device: Device) {
    await this.setDevice(device.id)
  }

  openDeviceSelectDialog() {
    this.isDeviceSelectDialogOpen = true
  }

  showSliderMenu() {
    this.isShowSlideMenu = true
  }

  closeInterruptDetectedDialog() {
    this.setIsInterruptDetectedDialogOpen(false)
  }

  openActiveDeviceNotFoundDialog() {
    this.isActiveDeviceNotFoundDialogOpen = true
  }

  closeActiveDeviceNotFoundDialog() {
    this.isActiveDeviceNotFoundDialogOpen = false
  }

  openSpotify() {
    this.isOpeningSpotify = true
  }

  async handleReturnFromSpotify() {
    if (this.isOpeningSpotify) {
      try {
        await this.controlState({ state: 'PLAY' })
      } catch (e) {
        this.openActiveDeviceNotFoundDialog()
      }
      this.isOpeningSpotify = false
    }
  }

  @Watch('isShowSlideMenu')
  onIsShowSliderMenuChanged(newValue: boolean) {
    if (newValue) {
      this.pageRoot.style.transform = 'translateX(300px)'
    } else {
      this.pageRoot.style.transform = ''
    }
  }

  async onVisibilityChange() {
    if (document.hidden) {
      this.onChangeToHidden()
    } else {
      await this.onChangeToPassive()
    }
  }

  onChangeToHidden() {
    this.clearProgressTimer()
  }

  onChangeToPassive() {
    this.handleReturnFromSpotify()
    this.fetchSession()
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  padding-top: 56px;
  position: relative;
}

.archived-header {
  position: fixed;
  left: 0;
  right: 0;
}
</style>
