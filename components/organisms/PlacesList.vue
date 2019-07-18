<template>
  <v-card class="places_list">
    <v-card-title>
      <span class="card_title">Places near You</span>
    </v-card-title>
    <v-list>
      <v-list-tile v-for="place in places" :key="place.id" :href="login_url">
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

  loginUrl = `https://accounts.spotify.com/authorize?client_id=2d41ee0f36664938a4669dcf5e81a43f&response_type=code&redirect_uri=https%3A%2F%2Fhere-songs.tomoyat1.com%2Fcallback&scope=user-read-playback-state,user-read-currently-playing,user-modify-playback-state,playlist-read-private,playlist-modify-private`

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
