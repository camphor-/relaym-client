<template>
  <div id="page-container">
    <slide-menu v-model="isShowSlideMenu" />
    <div class="page-root hide-overflow">
      <session-toolbar @open-slider-menu="showSliderMenu" />

      <div class="list-container">
        <track-list-container />
      </div>

      <div class="fabs">
        <v-btn v-if="playable" fab dark color="primary" @click="togglePlayback">
          <v-icon v-if="paused">play_arrow</v-icon>
          <v-icon v-else>pause</v-icon>
        </v-btn>
        <nuxt-link
          :to="{ path: '/search', query: { redirect_to: $route.path } }"
        >
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapState, mapActions, mapGetters } from 'vuex'
import SessionToolbar from '@/components/molecules/SessionToolbar.vue'
import TrackListContainer from '@/components/organisms/TrackListContainer.vue'
import DeviceChooseDialog from '@/components/organisms/DeviceChooseDialog.vue'
import Device from '@/models/Device'
import SlideMenu from '@/components/molecules/SlideMenu.vue'

@Component({
  components: {
    DeviceChooseDialog,
    TrackListContainer,
    SessionToolbar,
    SlideMenu
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

  private isDialogOpen: boolean = false
  private isShowSlideMenu: boolean = false
  private positionXOfPageRoot: number = 0
  private pageRoot: any

  mounted() {
    this.getStatus()
    if ('add_track' in this.$route.query) {
      const trackURI: string = this.$route.query.add_track as string
      this.addTrack(trackURI)
    }
    this.pageRoot = document.getElementsByClassName('page-root')[0]
    this.pageRoot.style.transition = '0.2s cubic-bezier(0.4, 0, 0.2, 1)'
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
    this.isDialogOpen = true
  }

  onSelectDevice(device: Device) {
    this.play(device)
  }

  showSliderMenu() {
    this.isShowSlideMenu = true
  }

  @Watch('isShowSlideMenu')
  onIsShowSliderMenuChanged(newValue: boolean) {
    if (newValue) {
      this.pageRoot.style.transform = 'translateX(300px)'
    } else {
      this.pageRoot.style.transform = 'translateX(0)'
    }
  }
}
</script>

<style lang="scss" scoped>
.page-root {
  > .fabs {
    position: fixed;
    right: 32px;
    bottom: 32px;

    a {
      text-decoration: none;
    }
  }
}
</style>
