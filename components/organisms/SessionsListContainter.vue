<template>
  <v-container>
    <!--TODO: add <sessions-list>-->
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Session, { CurrentSession } from '@/models/Session'
import ApiV2 from '@/api/v2'

@Component
export default class extends Vue {
  getCurrentSession(): CurrentSession {
    return ApiV2.sessions.current.getCurrentSession()
  }

  getMySessions(): Session[] {
    return ApiV2.sessions.getSessions()
  }
}
</script>

<style scoped></style>
