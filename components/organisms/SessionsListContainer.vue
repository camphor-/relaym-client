<template>
  <v-container>
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
import { mapState, mapActions, mapGetters } from 'vuex'
import User from '../../models/User'
import ApiV2 from '../../api/v2'
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
  private me?: User
  private session?: CurrentSession
  private mySessions?: Session[]

  private fetchCurrentSession!: () => void

  async asyncData() {
    const mySessions = (await ApiV2.sessions.getSessions()).sessions
    await this.fetchCurrentSession()

    return {
      mySessions: mySessions
    }
  }
}
</script>

<style scoped></style>
