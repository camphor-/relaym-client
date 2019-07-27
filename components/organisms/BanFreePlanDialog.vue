<template>
  <v-dialog :value="value" width="600">
    <v-card>
      <v-card-text>
        <img src="@/assets/images/banfreelogo.svg" />
        <p>
          Spotify Free Plan can not start/resume playback. Need to upgrade
          Spotify Premium to start/pause playtrack.
          <a href="#">Any other problem?</a>
        </p>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="value = false"
            >Upgrade Spotify Premium</v-btn
          >
          <v-btn color="primary" @click="value = false">Dismiss now</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
// import User from '@/models/User'

@Component({
  components: {}
})
export default class extends Vue {
  @Prop() readonly value!: boolean
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  text-align: center;
}
</style>
