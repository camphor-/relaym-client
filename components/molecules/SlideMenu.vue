<template>
  <v-navigation-drawer :value="value" fixed temporary @input="input">
    <div id="logo">
      <nuxt-link to="/">Relaym</nuxt-link>
    </div>
    <v-list>
      <v-list-tile to="/" nuxt>
        <v-list-tile-avatar>
          <v-icon>home</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile @click="exitSession">
        <v-list-tile-avatar>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>Exit</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile
        class="bottom-btn"
        @click="openConfirmTerminateSessionDialog"
      >
        <v-list-tile-avatar>
          <v-icon>archive</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>Terminate and Archive</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <confirm-terminate-session-dialog
      v-model="isOpenConfirmTerminateSessionDialog"
      @on-click-delete="terminateSession"
    ></confirm-terminate-session-dialog>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { CurrentSession } from '../../models/Session'
import ConfirmTerminateSessionDialog from './ConfirmTerminateSessionDialog.vue'
import ApiV2 from '@/api/v2'

@Component({
  components: { ConfirmTerminateSessionDialog },
  computed: {
    ...mapState('currentSession', ['session'])
  }
})
export default class extends Vue {
  private isOpenConfirmTerminateSessionDialog = false

  session: CurrentSession | null

  @Prop({ default: false }) readonly value!: boolean

  @Emit()
  input(isOpen: boolean) {
    return isOpen
  }

  openConfirmTerminateSessionDialog() {
    this.isOpenConfirmTerminateSessionDialog = true
  }

  terminateSession() {
    ApiV2.sessions.current.controlPlayback({ state: 'STOP' })
  }

  exitSession() {
    if (this.session) {
      ApiV2.sessions.leaveSession(this.session.id)
    }
    this.$router.push({ path: '/' })
  }
}
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
  max-height: 100vh;
}
a {
  text-decoration: none;
  color: $primary-color;
}
#logo {
  text-align: center;
  margin: 1rem 0;
  font-size: 2rem;
}
.bottom-btn {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
