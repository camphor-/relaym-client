<template>
  <v-dialog :value="value" width="600" @input="input">
    <v-card>
      <v-card-text>
        <img src="@/assets/images/banfreelogo.svg" />
        <p>
          Spotify Free Plan can not start/resume playback. Need to upgrade
          Spotify Premium to start/pause playtrack.
        </p>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="jumpToSpotifyWebsite"
            >Upgrade</v-btn
          >
          <v-btn color="primary" flat @click="closeDialog">Dismiss</v-btn>
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
  width: 100%;
  text-align: center;
}
</style>
