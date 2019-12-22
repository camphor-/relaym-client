<template>
  <div>
    <v-container>
      <v-flex align-center column>
        <toppage-logo />

        <h1 class="top-page-title">Relaym</h1>
        <v-btn
          round
          outline
          small
          color="primary"
          class="about-relaym-btn"
          href="#"
          >About Relaym</v-btn
        >
        <v-btn
          round
          color="secondary"
          class="new-session-btn"
          @click="openNewSessionDialog"
          >New Session</v-btn
        >
      </v-flex>
      <new-session-dialog
        v-model="isNewSessionDialogOpen"
        @create-session="createSession"
      />
    </v-container>
    <img class="wave" src="../assets/images/wave.svg" alt="wave" />
    <div class="sessions-list-container">
      <sessions-list-container v-if="isLoggedIn" />
      <login-button v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState, mapGetters } from 'vuex'
import ToppageLogo from '@/components/molecules/ToppageLogo'
import NewSessionDialog from '@/components/organisms/NewSessionDialog.vue'
import SessionsListContainer from '@/components/organisms/SessionsListContainer.vue'
import LoginButton from '@/components/organisms/LoginButton.vue'
import ApiV2 from '@/api/v2'
import Session from '@/models/Session'

@Component({
  components: {
    ToppageLogo,
    NewSessionDialog,
    SessionsListContainer,
    LoginButton
  },
  layout: 'toppage',
  computed: {
    ...mapState('user', ['me']),
    ...mapGetters('user', ['isLoggedIn'])
  }
})
export default class Index extends Vue {
  private isLoggedIn: () => boolean

  private isNewSessionDialogOpen: boolean = false

  openNewSessionDialog() {
    this.isNewSessionDialogOpen = true
  }

  async createSession(payload: { name: string }) {
    const newSession: Session = (await ApiV2.sessions.createSession({
      is_public: true,
      name: payload.name
    })).session
    this.$router.push({ path: `/sessions/${newSession.id}` })
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 70vh;
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

.about-relaym-btn {
  font-size: 12px;
}

.new-session-btn {
  margin-top: 4rem;
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

.sessions-list-container {
  background-color: $primary-color;
  min-height: 20vh;
}
</style>
