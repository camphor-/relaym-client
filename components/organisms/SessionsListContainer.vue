<template>
  <v-container v-if="loaded">
    <sessions-list
      v-if="currentSession"
      :title="'Current Session'"
      :sessions="[currentSession]"
    />
    <sessions-list
      v-if="mySessions"
      :title="'Recent Sessions'"
      :sessions="mySessions"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters, mapState, mapActions } from 'vuex'
import User from '@/models/User'
import ApiV2 from '@/api/v2'
import SessionsList from '@/components/molecules/SessionsList.vue'
import Session, { CurrentSession } from '@/models/Session'

@Component({
  components: { SessionsList },
  methods: {
    ...mapActions('currentSession', ['fetchCurrentSession'])
  },
  computed: {
    ...mapState('user', ['me']),
    ...mapGetters('user', ['isLoggedIn'])
  }
})
export default class SessionsListContainer extends Vue {
  me?: User
  mySessions?: Session[]
  loaded = false
  currentSession?: CurrentSession

  private fetchCurrentSession!: () => void

  async created() {
    try {
      this.currentSession = await ApiV2.sessions.current.getCurrentSession()
    } catch (e) {
      if (e.statusCode === 404) {
        console.log('not belong to any session')
      } else {
        console.error(e)
      }
    }
    this.mySessions = (await ApiV2.sessions.getSessions()).sessions
    this.loaded = true
  }
}
</script>

<style scoped></style>
