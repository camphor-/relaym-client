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

      <device-select-dialog
        v-model="isDeviceSelectDialogOpen"
        @select-device="onSelectDevice"
      />
    </div>
    <snackbar v-model="showSnackbar" :text="snackbarText" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapActions, mapState, mapGetters } from 'vuex'
import SlideMenu from '@/components/organisms/SlideMenu.vue'
import User from '@/models/User'
import SessionToolbar from '@/components/molecules/SessionToolbar.vue'
import TrackListContainer from '@/components/organisms/TrackListContainer.vue'
import DeviceSelectDialog from '@/components/organisms/DeviceSelectDialog.vue'
import BottomController from '@/components/organisms/BottomController.vue'
import Device from '@/models/Device'
import Snackbar from '@/components/molecules/Snackbar.vue'

@Component({
  components: {
    DeviceSelectDialog,
    TrackListContainer,
    BottomController,
    SessionToolbar,
    SlideMenu,
    Snackbar
  },
  computed: {
    ...mapState('user', ['me']),
    ...mapGetters('pages/sessions/detail', ['sessionName'])
  },
  methods: {
    ...mapActions('pages/sessions/detail', [
      'setSessionId',
      'setDevice',
      'connectWebSocket',
      'disconnectWebSocket'
    ])
  }
})
export default class extends Vue {
  private readonly me!: User | null
  private setSessionId!: (id: string) => void
  private setDevice!: (deviceId: string) => void
  private connectWebSocket!: () => void
  private disconnectWebSocket!: () => void

  private isDeviceSelectDialogOpen: boolean = false
  private pageRoot: any
  private isShowSlideMenu: boolean = false
  private showSnackbar = false
  private snackbarText = ''

  @Watch('$route.params.id', { immediate: true })
  onPathIdChanged() {
    this.setSessionId(this.$route.params.id)
    this.connectWebSocket()
  }

  mounted() {
    this.pageRoot = document.getElementsByClassName('page-root')[0]
    this.pageRoot.style.transition = '0.2s cubic-bezier(0.4, 0, 0.2, 1)'
  }

  destroyed() {
    this.disconnectWebSocket()
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
