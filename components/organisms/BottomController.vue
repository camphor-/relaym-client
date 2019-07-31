<template>
  <div class="bottom-controller-wrapper">
    <div class="bottom-controller elevation-5">
      <v-layout align-center justify-space-around>
        <v-btn icon large @click="selectDevice">
          <v-icon>devices</v-icon>
        </v-btn>
        <v-btn v-if="playable" icon large @click="togglePlayback">
          <v-icon v-if="paused">play_arrow</v-icon>
          <v-icon v-else>pause</v-icon>
        </v-btn>
        <nuxt-link
          :to="{ path: '/search', query: { redirect_to: $route.path } }"
        >
          <v-btn icon large>
            <v-icon>playlist_add</v-icon>
          </v-btn>
        </nuxt-link>
      </v-layout>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters, mapState } from 'vuex'
import Device from '@/models/Device'

@Component({
  methods: {
    ...mapActions('tracklist', ['pause', 'resume', 'getStatus'])
  },
  computed: {
    ...mapState('tracklist', ['paused', 'device']),
    ...mapGetters('tracklist', ['playable'])
  }
})
export default class extends Vue {
  @Prop({ default: false }) readonly value!: boolean

  private pause!: () => void
  private resume!: () => void
  private getStatus!: () => void

  private paused!: () => boolean
  private device!: () => Device

  private playable!: () => boolean

  @Emit()
  input(isOpen: boolean) {
    return isOpen
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
    this.selectDevice()
  }

  selectDevice() {
    this.input(true)
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.bottom-controller-wrapper {
  width: 100%;
  position: fixed;
  bottom: 0;
  .bottom-controller {
    margin: 3vmin auto;
    border-radius: 10px;
    background: #fff;
    width: 94vw;
    max-width: 800px;
  }
}
</style>
