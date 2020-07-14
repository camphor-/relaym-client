<template>
  <div class="hide-overflow">
    <slide-menu v-model="isShowSlideMenu" />
    <div class="page-root hide-overflow">
      <session-toolbar
        :session-name="sessionName"
        @open-slider-menu="showSliderMenu"
      />

      <div class="list-container">
        <track-list-container />
      </div>

      <bottom-controller @open-device-select-dialog="openDeviceSelectDialog" />

      <interrupt-detected-dialog
        :value="isInterruptDetectedDialogOpen"
        @input="closeInterruptDetectedDialog"
      ></interrupt-detected-dialog>

      <device-select-dialog
        v-model="isDeviceSelectDialogOpen"
        @select-device="onSelectDevice"
      />
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

@Component({
  components: {
    DeviceSelectDialog,
    TrackListContainer,
    BottomController,
    SessionToolbar,
    SlideMenu,
    InterruptDetectedDialog
  },
  computed: {
    ...mapState('pages/sessions/detail', ['isInterruptDetectedDialogOpen']),
    ...mapGetters('pages/sessions/detail', ['sessionName'])
  },
  methods: {
    ...mapActions('pages/sessions/detail', [
      'setSessionId',
      'fetchSession',
      'setDevice',
      'connectWebSocket',
      'disconnectWebSocket',
      'clearProgressTimer',
      'setIsInterruptDetectedDialogOpen'
    ])
  }
})
export default class extends Vue {
  private setSessionId!: (id: string) => void
  private fetchSession!: () => Promise<void>
  private setDevice!: (deviceId: string) => void
  private connectWebSocket!: () => void
  private disconnectWebSocket!: () => void
  private clearProgressTimer!: () => void
  private setIsInterruptDetectedDialogOpen!: (isOpen: boolean) => void

  private isDeviceSelectDialogOpen: boolean = false
  private pageRoot: any
  private isShowSlideMenu: boolean = false
  private readonly isInterruptDetectedDialogOpen!: boolean

  @Watch('$route.params.id')
  async onPathIdChanged() {
    await this.setSessionId(this.$route.params.id)
    this.connectWebSocket()
  }

  // Watchと同じ処理をしているが、404の場合にエラーページに飛ばすには、
  // ライフサイクル系の関数の中でエラーをthrowする必要があるので処理を分けている
  async created() {
    await this.setSessionId(this.$route.params.id)
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

  @Watch('isShowSlideMenu')
  onIsShowSliderMenuChanged(newValue: boolean) {
    if (newValue) {
      this.pageRoot.style.transform = 'translateX(300px)'
    } else {
      this.pageRoot.style.transform = ''
    }
  }

  onVisibilityChange() {
    if (document.hidden) {
      this.onChangeToHidden()
    } else {
      this.onChangeToPassive()
    }
  }

  onChangeToHidden() {
    this.clearProgressTimer()
  }

  onChangeToPassive() {
    this.fetchSession()
  }
}
</script>

<style lang="scss" scoped></style>
