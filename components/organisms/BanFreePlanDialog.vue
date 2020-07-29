<template>
  <v-dialog :value="value" width="600" @input="input">
    <v-card>
      <v-card-text>
        <v-layout
          row
          align-center
          justify-space-around
          class="headline-wrapper"
        >
          <h2 class="dialog-headline">
            Spotifyプレミアムが必要です
          </h2>
          <img src="@/assets/images/ohno.svg" />
        </v-layout>
        <p>
          無料プランではRelaymを使うことが出来ません。プレミアムプランにアップグレードする必要があります。
        </p>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="jumpToSpotifyWebsite"
            >アップグレード</v-btn
          >
          <v-btn color="primary" flat @click="closeDialog">閉じる</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component({ components: {} })
export default class extends Vue {
  @Prop({ default: false }) readonly value!: boolean

  @Emit()
  input(newValue) {
    return newValue
  }

  closeDialog() {
    this.input(false)
  }

  jumpToSpotifyWebsite() {
    this.input(false)
    location.href = 'https://www.spotify.com/jp/premium/'
  }
}
</script>

<style lang="scss" scoped>
img {
  max-width: 25%;
}

.dialog-headline {
  color: $primary-color;
  font-weight: bold;
  font-size: 1.5rem;
}

.headline-wrapper {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
