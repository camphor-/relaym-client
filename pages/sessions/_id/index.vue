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

      <ban-free-plan-dialog v-model="isBanDialogOpen" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapActions, mapState } from 'vuex'
import SlideMenu from '@/components/organisms/SlideMenu.vue'
import User from '@/models/User'
import SessionToolbar from '@/components/molecules/SessionToolbar.vue'
import TrackListContainer from '@/components/organisms/TrackListContainer.vue'
import DeviceSelectDialog from '@/components/organisms/DeviceSelectDialog.vue'
import BottomController from '@/components/organisms/BottomController.vue'
import Device from '@/models/Device'
import BanFreePlanDialog from '@/components/organisms/BanFreePlanDialog.vue'
import ApiV2 from '@/api/v2'

@Component({
  components: {
    DeviceSelectDialog,
    TrackListContainer,
    BottomController,
    SessionToolbar,
    SlideMenu,
    BanFreePlanDialog
  },
  computed: {
    ...mapState('user', ['me']),
    ...mapState('currentSession', ['id'])
  },
  methods: {
    ...mapActions('currentSession', [
      'setDevice',
      'addTrack',
      'fetchCurrentSession'
    ])
  }
})
export default class extends Vue {
  private readonly me: User | null
  private readonly id: string | null
  private addTrack!: (payload: string) => void
  private setDevice!: (payload: string) => void
  private fetchCurrentSession!: () => void
  private isDeviceSelectDialogOpen: boolean = false
  private pageRoot: any
  private isBanDialogOpen: boolean = false
  private isShowSlideMenu: boolean = false

  // スラグのセッションid
  private pathId = ''

  async mounted() {
    this.pathId = this.$route.path.split('/').slice(-1)[0]
    await this.fetchCurrentSession()

    // 参加しているセッションがない場合
    if (!this.id) {
      try {
        // スラグのidのセッションに参加を試みる
        await ApiV2.sessions.joinSession(this.pathId)
      } catch (e) {
        this.$router.push('/')
      }

      // 参加しているセッションがスラグのセッションidと異なる場合
    } else if (this.id !== this.pathId) {
      try {
        // スラグのidのセッションが進行中か確認
        const pathIdSession = await ApiV2.sessions.getSession(this.pathId)
        if (pathIdSession.session.is_progressing) {
          // 現在のセッションから退出して新しいセッションに参加
          await ApiV2.sessions.leaveSession(this.id)
          await ApiV2.sessions.joinSession(this.pathId)
        }
      } catch (e) {
        this.$router.push(`/sessions/${this.id}`)
      }
    }

    if ('add_track' in this.$route.query) {
      const trackURI: string = this.$route.query.add_track as string
      this.addTrack(trackURI)
    }
    this.pageRoot = document.getElementsByClassName('page-root')[0]
    this.pageRoot.style.transition = '0.2s cubic-bezier(0.4, 0, 0.2, 1)'

    if (this.me && !this.me.is_premium) {
      this.isBanDialogOpen = true
    }
  }

  async onSelectDevice(device: Device) {
    await this.setDevice(device.id)
    await this.fetchCurrentSession()
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
