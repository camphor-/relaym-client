<template>
  <v-card class="places_list">
    <v-card-title>
      <span class="card_title">Places near You</span>
    </v-card-title>
    <v-list>
      <v-list-tile v-for="place in places" :key="place.id" :href="loginUrl">
        <v-list-tile-content>
          <v-list-tile-title v-text="place.name"></v-list-tile-title>
          <v-divider :key="place.id"></v-divider>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import Place from '@/models/Place'

@Component({
  components: {}
})
export default class extends Vue {
  @Prop({ default: [] }) readonly places!: Place[]
  private loginUrl: string = ''

  mounted(): void {
    // create login URL
    const authScopes = [
      'user-read-playback-state',
      'user-read-currently-playing',
      'user-modify-playback-state',
      'playlist-read-private',
      'playlist-modify-private'
    ]
    const loginUrl = `https://accounts.spotify.com/authorize?client_id=${
      process.env.CLIENT_ID
    }&response_type=code&redirect_uri=${encodeURIComponent(
      process.env.BASE_URL + '/callback'
    )}&scope=${authScopes.join(',')}`
    this.loginUrl = loginUrl
  }

  @Emit()
  click(id: string) {
    return id
  }
}
</script>
<style lang="scss" scoped>
.card_title {
  font-size: 1.5rem;
  font-family: 'Pacifico';
  color: #0d47a1;
}

.places_list {
  padding: 10px;
  .place_name {
    font-size: 1.2rem;
    padding: 10px;
  }
}
</style>
