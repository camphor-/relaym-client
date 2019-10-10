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
import Session, { CurrentSession } from '@/models/Session'
import SessionsList from '@/components/molecules/SessionsList.vue'

@Component({
  components: { SessionsList }
})
export default class extends Vue {
  // TODO: storeからセッションの情報を取ってくる
  currentSession: CurrentSession = {
    id: 'xxxxx',
    name: 'Session created at 2019-07-24 16:30',
    is_public: false,
    is_progressing: true
  }

  mySessions: Session[] = [
    {
      id: 'xxxxx',
      name: 'Session created at 2019-07-24 12:30',
      is_public: false,
      is_progressing: false
    },
    {
      id: 'xxxxx',
      name: 'Session created at 2019-07-24 10:30',
      is_public: true,
      is_progressing: false
    }
  ]
}
</script>

<style scoped></style>
