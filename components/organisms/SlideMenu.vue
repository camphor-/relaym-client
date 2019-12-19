<template>
  <div>
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
      />
    </v-navigation-drawer>
    <snackbar v-model="showSnackbar" :text="snackbarText" />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import ConfirmTerminateSessionDialog from '@/components/molecules/ConfirmTerminateSessionDialog.vue'
import ApiV2 from '@/api/v2'
import Snackbar from '@/components/molecules/Snackbar.vue'

@Component({
  components: { ConfirmTerminateSessionDialog, Snackbar },
  computed: {
    ...mapState('currentSession', ['id'])
  }
})
export default class extends Vue {
  private isOpenConfirmTerminateSessionDialog = false
  private id: string | null
  private showSnackbar = false
  private snackbarText = ''

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

  async exitSession() {
    if (this.id) {
      try {
        await ApiV2.sessions.leaveSession(this.id)
        this.showSnackbar = true
        this.$router.push({ path: '/' })
        this.snackbarText = 'セッションから退出しました。'
      } catch (e) {
        if (e.statusCode === 400) {
          this.showSnackbar = true
          this.snackbarText = 'セッションの作成者は退出できません。'
        } else {
          console.error(e)
        }
      }
    }
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
