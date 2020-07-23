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
          <h2 class="dialog-headline">再生デバイスが存在しません</h2>
          <img src="@/assets/images/ohno.svg" />
        </v-layout>
        <p class="description">
          Spotifyで適当な曲の再生を開始し、<br />再度Relaymを開いてください。
        </p>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="openSpotify"
            >Spotifyアプリを開く</v-btn
          >
          <v-btn flat @click="closeDialog">閉じる</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
  @Prop({ default: false }) readonly value!: boolean

  @Emit()
  input(newValue) {
    return newValue
  }

  closeDialog() {
    this.input(false)
  }

  openSpotify() {
    this.closeDialog()
    this.$emit('open-spotify')
    window.location.href = 'spotify://'
  }
}
</script>

<style lang="scss" scoped>
.headline-wrapper {
  margin-top: 16px;
  margin-bottom: 16px;
}

.dialog-headline {
  color: $primary-color;
  font-weight: bold;
  font-size: 1.5rem;
}

img {
  max-width: 25%;
}

.description {
  font-size: 0.9rem;
}
</style>
