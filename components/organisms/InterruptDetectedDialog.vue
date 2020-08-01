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
          <h2 class="dialog-headline">Spotifyとの同期に<br />失敗しました</h2>
          <img src="@/assets/images/ohno.svg" />
        </v-layout>
        <p>
          Spotifyアプリとの同期に失敗しました。
          もう一度再生ボタンを押すことで再生が開始されます。
        </p>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class extends Vue {
  @Prop({ default: false }) readonly value!: boolean

  @Emit()
  input(newValue: boolean) {
    return newValue
  }

  closeDialog() {
    this.input(false)
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
</style>
