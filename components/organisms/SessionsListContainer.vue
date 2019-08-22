<template>
  <v-container>
    <sessions-list :title="title" :sessions="[currentSession]" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Session, { CurrentSession } from '@/models/Session'
import ApiV2 from '@/api/v2'
import SessionsList from '@/components/molecules/SessionsList.vue'

@Component({
  components: { SessionsList }
})
export default class extends Vue {
  private currentSession: CurrentSession = {}
  private mySessions: Session[] = []
  title = 'Current Session'

  mounted() {
    // this.fetchCurrentSession()
    // this.fetchMySessions()
  }

  fetchCurrentSession(): void {
    this.currentSession = ApiV2.sessions.current.getCurrentSession()
  }

  fetchMySessions(): void {
    this.mySessions = ApiV2.sessions.getSessions()
  }
}
</script>

<style scoped></style>
