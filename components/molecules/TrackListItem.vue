<template>
  <v-list-tile class="list-item">
    <v-list-tile-avatar tile>
      <img :src="track.album.images[1].url" alt="カバー画像" />
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>{{ track.name }}</v-list-tile-title>
      <v-list-tile-sub-title>
        {{ artistNames }} -
        {{ track.album.name }}
      </v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Track } from '@/lib/api/v3/types'
import { getArtistNames } from '~/lib/artist'

@Component({
  name: 'TrackListItem',
  components: {}
})
export default class extends Vue {
  @Prop({ required: true }) readonly track!: Track

  get artistNames() {
    return getArtistNames(this.track.artists)
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  background-color: #ffffff;
}
</style>
