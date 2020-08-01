<template>
  <div>
    <v-container d-flex align-center>
      <v-flex>
        <toppage-logo class="logo" />

        <img class="text-logo" src="~assets/images/text_logo.svg" />

        <div class="action-button">
          <!--  TODO: セッション参加者は、URLをもらう説明を書く    -->
          <div v-if="loadingState === 'loading'">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
          <template v-if="loadingState === 'loaded'">
            <new-session-button
              v-if="isLoggedIn"
              @click="openNewSessionDialog"
            />
            <login-button v-else />
          </template>
          <p v-if="loadingState === 'error'">
            エラーが発生しました。<br />しばらく経ってから再度お試しください。
          </p>
        </div>
      </v-flex>
    </v-container>
    <img class="wave" src="../assets/images/wave.svg" alt="wave" />
    <div class="scroll-guide">
      <span class="scroll-text">Scroll</span>
      <img src="../assets/images/scroll_arrow.svg" />
    </div>
    <service-description :is-show-login-button="!isLoggedIn" />

    <new-session-dialog
      v-model="isNewSessionDialogOpen"
      @create-session="createSession"
    />
    <ban-free-plan-dialog v-model="isBanDialogOpen" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapActions, mapGetters, mapState } from 'vuex'
import ToppageLogo from '@/components/molecules/ToppageLogo.vue'
import NewSessionDialog from '@/components/organisms/NewSessionDialog.vue'
import LoginButton from '@/components/atoms/LoginButton.vue'
import BanFreePlanDialog from '@/components/organisms/BanFreePlanDialog.vue'
import { createSession } from '@/lib/api/v3/session'
import { User } from '@/lib/api/v3/types'
import { MessageType, SnackbarPayload } from '@/store/snackbar'
import NewSessionButton from '@/components/atoms/NewSessionButton.vue'
import ServiceDescription from '@/components/organisms/ServiceDescription.vue'
import { LoadingState } from '~/store/user'

@Component({
  components: {
    ServiceDescription,
    NewSessionButton,
    ToppageLogo,
    NewSessionDialog,
    LoginButton,
    BanFreePlanDialog
  },
  layout: 'toppage',
  computed: {
    ...mapState('user', ['me', 'loadingState']),
    ...mapGetters('user', ['isLoggedIn'])
  },
  methods: {
    ...mapActions('snackbar', ['showServerErrorSnackbar', 'showSnackbar']),
    ...mapActions('user', ['fetchMyUserInfo'])
  }
})
export default class Index extends Vue {
  private readonly me!: User | null
  private readonly loadingState!: LoadingState
  private fetchMyUserInfo!: () => Promise<void>

  private isLoggedIn!: () => boolean

  private showServerErrorSnackbar!: () => void
  private showSnackbar!: (payload: SnackbarPayload) => void

  private isBanDialogOpen: boolean = false
  private isNewSessionDialogOpen: boolean = false

  async mounted() {
    await this.fetchMyUserInfo()
  }

  openNewSessionDialog() {
    if (this.me && !this.me.is_premium) {
      this.isBanDialogOpen = true
      return
    }
    this.isNewSessionDialogOpen = true
  }

  async createSession(payload: {
    name: string
    allowToControlByOthers: boolean
  }) {
    try {
      const newSession = await createSession(payload)
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

  head() {
    return {
      titleTemplate:
        'Relaym - Spotifyの楽曲を1つのスピーカーで楽しめるWebアプリ'
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  height: unquote('min(70vh, 500px)');
  text-align: center;
  padding: 16px 16px 0;
}

.logo {
  margin: 0 auto 32px;
}
.text-logo {
  width: auto;
  height: 48px;
}

button {
  display: block;
  margin: auto;
}

.action-button {
  margin-top: 32px;
  height: 108px;
}

.links {
  padding-top: 15px;
}

.wave {
  display: block;
  width: 100%;
  height: 10vh;
}

.scroll-guide {
  margin-top: -1px;
  background-color: $primary-color;
  padding: 0 16px 16px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.scroll-text {
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-bottom: 8px;
}
</style>
