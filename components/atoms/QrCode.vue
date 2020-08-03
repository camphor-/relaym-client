<template>
  <img class="qrcode" alt="QRコード" :src="qrSvg" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import QRCode from 'qrcode-svg'

@Component({
  name: 'QrCode'
})
export default class extends Vue {
  @Prop({ default: '' }) content!: string
  private qrSvg: string = ''

  @Watch('content', { immediate: true })
  onChangeContent() {
    const imgSource = new QRCode({
      content: this.content,
      join: true,
      container: 'svg-viewbox'
    }).svg()
    this.qrSvg = `data:image/svg+xml,${encodeURIComponent(imgSource)}`
  }
}
</script>

<style lang="scss" scoped>
.qrcode {
  max-height: 40vh;
}
</style>
