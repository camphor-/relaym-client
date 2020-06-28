<template>
  <div class="container">
    <div class="invite_description">リンクを共有して楽しもう🎧</div>
    <qr-code :content="inviteUrl" />
    <v-layout row align-center justify-center>
      <v-btn flat icon color="#00B900" @click="handleClickLineShare">
        <v-icon>fab fa-line</v-icon>
      </v-btn>
      <v-btn flat icon @click="handleClickWebShare">
        <v-icon>fas fa-share-alt</v-icon>
      </v-btn>
      <v-btn depressed>コピー</v-btn>
    </v-layout>
    <v-layout align-start class="attention accent--text">
      <v-icon color="accent">warning</v-icon>
      <span>このリンクは不特定多数の人に共有しないでください</span>
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

  handleClickLineShare() {
    const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURI(
      this.inviteUrl
    )}`
    window.open(lineShareUrl)
  }

  async handleClickWebShare() {
    const shareData: ShareData = {
      title: 'Relaym',
      text: 'Relaymで一緒にセッションを楽しもう！',
      url: this.inviteUrl
    }
    try {
      await navigator.share(shareData)
    } catch (e) {
      // TODO: エラー処理
      console.error(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 16px;
}

.invite_description {
  font-weight: bold;
  text-align: center;
}

.attention {
  margin-top: 16px;
  > span {
    margin-left: 8px;
  }
}
</style>
