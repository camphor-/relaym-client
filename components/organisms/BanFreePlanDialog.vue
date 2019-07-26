<template>
  <v-dialog v-model="dialog" v-slot:activator="on" width="800" @input="input">
    <v-card>
      <v-card-title primary-title>
        Need Spotify Premium to Start/Pause Playback!
      </v-card-title>

      <v-card-text>
        <p>
          Oops! Spotify Free Plan can not start/resume playback. Upgrade Spotify
          Premium.
        </p>
        <v-card-actions>
          <v-btn color="primary" @click="dialog = false"
            >Upgrade Spotify Premium</v-btn
          >
          <v-btn color="primary" @click="closeDialog">Dismiss now</v-btn>
        </v-card-actions>
        <p><a href="#">Any other problem?</a></p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import User from '@/models/User'

@Component({
  components: {}
})
export default class extends Vue {}
</script>

<style lang="scss" scoped></style>
