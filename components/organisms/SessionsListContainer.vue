<template>
  <v-container>
    <sessions-list :title="'Current Session'" :sessions="[currentSession]" />
    <sessions-list :title="'Resent Sessions'" :sessions="mySessions" />
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
    name: 'Session 1',
    is_public: false,
    is_progressing: true
  }

  mySessions: Session[] = [
    {
      id: 'xxxxx',
      name: 'Session 2',
      is_public: false,
      is_progressing: false
    },
    {
      id: 'xxxxx',
      name: 'Session 3',
      is_public: true,
      is_progressing: false
    }
  ]
}
</script>

<style scoped></style>
