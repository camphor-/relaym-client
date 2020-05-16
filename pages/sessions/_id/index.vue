<template>
  <div class="hide-overflow">
    <slide-menu v-model="isShowSlideMenu" />
    <div class="page-root hide-overflow">
      <session-toolbar
        :session-name="name"
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

      <ban-free-plan-dialog v-model="isBanDialogOpen" />
    </div>
    <snackbar v-model="showSnackbar" :text="snackbarText" />
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
import Snackbar from '@/components/molecules/Snackbar.vue'

@Component({
  components: {
    DeviceSelectDialog,
    TrackListContainer,
    BottomController,
    SessionToolbar,
    SlideMenu,
    BanFreePlanDialog,
    Snackbar
  },
  computed: {
    ...mapState('user', ['me']),
    ...mapState('currentSession', ['id', 'name'])
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
  private readonly me!: User | null
  private readonly id!: string | null
  private readonly name!: string | null
  private addTrack!: (payload: string) => void
  private setDevice!: (payload: string) => void
  private fetchCurrentSession!: () => void
  private isDeviceSelectDialogOpen: boolean = false
  private pageRoot: any
  private isBanDialogOpen: boolean = false
  private isShowSlideMenu: boolean = false
  private showSnackbar = false
  private snackbarText = ''

  // スラグのセッションid
  private pathId = ''

  async mounted() {
    this.pageRoot = document.getElementsByClassName('page-root')[0]
    this.pageRoot.style.transition = '0.2s cubic-bezier(0.4, 0, 0.2, 1)'

    if (this.me && !this.me.is_premium) {
      this.isBanDialogOpen = true
    }

    this.pathId = this.$route.path.split('/').slice(-1)[0]
    await this.fetchCurrentSession()

    // 参加しているセッションと一致する場合
    if (this.id === this.pathId) return

    try {
      // スラグのidのセッションが進行中か確認
      const pathIdSession = await ApiV2.sessions.getSession(this.pathId)
      if (!pathIdSession.is_progressing) {
        this.$router.push('/')
        return
      }
    } catch (e) {
      console.error(e)
      this.$router.push('/')
      return
    }

    // 別のセッションに参加している場合
    if (this.id) {
      try {
        // 現在のセッションから退出して新しいセッションに参加
        await ApiV2.sessions.leaveSession(this.id)
      } catch (e) {
        if (
          e.statusCode === 400 &&
          e.msg.msg === 'creator cannot be removed from session'
        ) {
          this.snackbarText = 'セッションの作成者は退出できません。'
          this.showSnackbar = true
        } else {
          this.$router.push(`/sessions/${this.id}`)
        }
        console.error(e)
        return
      }
    }

    try {
      // スラグのidのセッションに参加を試みる
      await ApiV2.sessions.joinSession(this.pathId)
    } catch (e) {
      this.$router.push('/')
      return
    }

    // 参加セッションが変わったので再度取得
    await this.fetchCurrentSession()
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
