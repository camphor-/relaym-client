<template>
  <div class="container">
    <div class="invite_description">リンクを共有して楽しもう🎧</div>
    <qr-code :content="inviteUrl" />
    <v-layout row align-center justify-center>
      <v-btn
        v-if="isAllowPublicShare"
        flat
        icon
        color="#1da1f2"
        @click="handleClickTwitterShare"
      >
        <v-icon>fab fa-twitter</v-icon>
      </v-btn>
      <v-btn flat icon color="#00B900" @click="handleClickLineShare">
        <v-icon>fab fa-line</v-icon>
      </v-btn>
      <v-btn v-if="canShare" flat icon @click="handleClickWebShare">
        <v-icon>fas fa-share-alt</v-icon>
      </v-btn>
      <v-btn depressed @click="handleClickCopy">コピー</v-btn>
    </v-layout>
    <v-layout
      v-if="!isAllowPublicShare"
      align-start
      class="attention accent--text"
    >
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
import { getLineUrl, getTwitterUrl } from '@/lib/share'

@Component({
  name: 'InviteLinkBox',
  components: { QrCode },
  methods: {
    ...mapActions('snackbar', ['showSnackbar'])
  }
})
export default class extends Vue {
  @Prop({ required: true }) readonly sessionId!: string | null
  @Prop({ default: false }) readonly isAllowPublicShare!: boolean
  private showSnackbar!: (payload: SnackbarPayload) => void

  get inviteUrl() {
    if (!this.sessionId) return ''
    return `${location.origin}/sessions/${this.sessionId}`
  }

  get canShare(): boolean {
    return !!navigator.share
  }

  handleClickTwitterShare() {
    const twitterShareUrl = getTwitterUrl(
      'Relaymで一緒にセッションを楽しもう！',
      this.inviteUrl
    )
    window.open(twitterShareUrl)
  }

  handleClickLineShare() {
    const lineShareUrl = getLineUrl(this.inviteUrl)
    window.open(lineShareUrl)
  }

  async handleClickWebShare() {
    const shareData: ShareData = {
      title: 'Relaym',
      text: 'Relaymで一緒にセッションを楽しもう！',
      url: this.inviteUrl
    }
    await navigator.share(shareData)
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
