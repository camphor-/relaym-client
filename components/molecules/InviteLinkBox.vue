<template>
  <div class="container">
    <div class="invite_description">リンクを共有して楽しもう🎧</div>
    <qr-code :content="inviteUrl" />
    <v-layout row align-center justify-center>
      <v-btn flat icon color="#00B900">
        <v-icon>fab fa-line</v-icon>
      </v-btn>
      <v-btn flat icon>
        <v-icon>fas fa-share-alt</v-icon>
      </v-btn>
      <v-btn depressed>コピー</v-btn>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import QrCode from '@/components/atoms/QrCode.vue'

@Component({
  name: 'InviteLinkBox',
  components: { QrCode }
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

.invite_description {
  font-weight: bold;
  text-align: center;
}
</style>
