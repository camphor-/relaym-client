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
      <v-btn depressed @click="handleClickCopy">コピー</v-btn>
    </v-layout>
    <v-layout align-start class="attention accent--text">
      <v-icon color="accent">warning</v-icon>
      <span>このリンクは不特定多数の人に共有しないでください</span>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'
import * as copy from 'copy-to-clipboard'
import QrCode from '@/components/atoms/QrCode.vue'
import { MessageType, SnackbarPayload } from '@/store/snackbar'

@Component({
  name: 'InviteLinkBox',
  components: { QrCode },
  methods: {
    ...mapActions('snackbar', ['showSnackbar'])
  }
})
export default class extends Vue {
  @Prop({ required: true }) readonly sessionId!: string | null
  private showSnackbar!: (payload: SnackbarPayload) => void

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
      this.showSnackbar({
        message: 'シェアに失敗しました',
        messageType: MessageType.error
      })
    }
  }

  handleClickCopy() {
    copy(this.inviteUrl)
    this.showSnackbar({
      message: 'コピーしました',
      messageType: MessageType.info
    })
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
