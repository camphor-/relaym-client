<template>
  <v-layout class="container">
    <v-layout row align-center>
      <v-btn flat icon color="#00B900">
        <v-icon>fab fa-line</v-icon>
      </v-btn>
      <v-btn flat icon>
        <v-icon>fas fa-share-alt</v-icon>
      </v-btn>
      <v-btn depressed>コピー</v-btn>
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'InviteLinkBox'
})
export default class extends Vue {
  @Prop({ required: true }) readonly sessionId!: string | null

  get inviteUrl() {
    if (!this.sessionId) return ''
    return `${location.origin}/sessions/${this.sessionId}`
  }
}
</script>

<style scoped>
.container {
  padding: 16px;
}
</style>
