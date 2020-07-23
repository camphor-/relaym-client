<template>
  <div>
    <v-container d-flex>
      <v-flex align-center column>
        <toppage-logo />

        <h1 class="top-page-title">Relaym</h1>

        <div class="action-button">
          <v-btn
            v-if="isLoggedIn"
            class="new-session-btn"
            round
            large
            color="secondary"
            @click="openNewSessionDialog"
            >New Session</v-btn
          >
          <login-button v-else />
        </div>
      </v-flex>
    </v-container>
    <img class="wave" src="../assets/images/wave.svg" alt="wave" />
    <div class="login-button-wrapper">
      <!--  TODO: セッション参加者は、URLをもらう説明を書く    -->
    </div>

    <new-session-dialog
      v-model="isNewSessionDialogOpen"
      @create-session="createSession"
    />
    <ban-free-plan-dialog v-model="isBanDialogOpen" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters, mapState } from 'vuex'
import ToppageLogo from '@/components/molecules/ToppageLogo.vue'
import NewSessionDialog from '@/components/organisms/NewSessionDialog.vue'
import LoginButton from '@/components/organisms/LoginButton.vue'
import BanFreePlanDialog from '@/components/organisms/BanFreePlanDialog.vue'
import { createSession } from '@/api/v3/session'
import { User } from '@/api/v3/types'
import { MessageType, SnackbarPayload } from '@/store/snackbar'

@Component({
  components: {
    ToppageLogo,
    NewSessionDialog,
    LoginButton,
    BanFreePlanDialog
  },
  layout: 'toppage',
  computed: {
    ...mapState('user', ['me']),
    ...mapGetters('user', ['isLoggedIn'])
  },
  methods: {
    ...mapActions('snackbar', ['showServerErrorSnackbar', 'showSnackbar'])
  }
})
export default class Index extends Vue {
  private readonly me!: User | null

  private isLoggedIn!: () => boolean

  private showServerErrorSnackbar!: () => void
  private showSnackbar!: (payload: SnackbarPayload) => void

  private isBanDialogOpen: boolean = false
  private isNewSessionDialogOpen: boolean = false

  openNewSessionDialog() {
    if (this.me && !this.me.is_premium) {
      this.isBanDialogOpen = true
      return
    }
    this.isNewSessionDialogOpen = true
  }

  async createSession(payload: { name: string }) {
    try {
      const newSession = await createSession({
        name: payload.name
      })
      this.$router.push({ path: `/sessions/${newSession.id}` })
    } catch (e) {
      if (e.response?.status === 400) {
        this.showSnackbar({
          messageType: MessageType.info,
          message: 'セッション名は必須です。'
        })
        return
      }
      console.error(e)
      this.showServerErrorSnackbar()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  height: unquote('min(75vh, 600px)');
  text-align: center;
}

.top-page-title {
  font-family: Roboto, 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  font-size: 48px;
  color: $primary-color;
  font-weight: normal;
}

button {
  display: block;
  margin: auto;
}

.action-button {
  margin-top: 64px;
}
.new-session-btn {
  font-size: 18px;
}

.links {
  padding-top: 15px;
}

.wave {
  display: block;
  width: 100%;
  height: 10vh;
}

.login-button-wrapper {
  margin-top: -1px;
  background-color: $primary-color;
  height: unquote('min(15vh, 101px)');
}
</style>
