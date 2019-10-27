<template>
  <v-container v-if="loaded">
    <sessions-list
      v-if="session"
      :title="'Current Session'"
      :sessions="[session]"
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
import { mapState, mapActions, mapGetters } from 'vuex'
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
    ...mapState('currentSession', ['session']),
    ...mapGetters('user', ['isLoggedIn'])
  }
})
export default class extends Vue {
  me?: User
  session?: CurrentSession
  mySessions?: Session[]
  loaded = false

  private fetchCurrentSession!: () => void

  async created() {
    this.mySessions = (await ApiV2.sessions.getSessions()).sessions
    await this.fetchCurrentSession()
    this.loaded = true
  }
}
</script>

<style scoped></style>
