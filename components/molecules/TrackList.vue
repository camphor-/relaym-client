<template>
  <v-list two-line>
    <v-subheader v-if="playedTracks.length > 0">Played</v-subheader>
    <template v-for="(item, index) in playedTracks">
      <v-list-tile
        :key="`first-${index}`"
        :href="item.external_urls.spotify"
        target="_blank"
      >
        <v-list-tile-avatar tile>
          <img :src="item.album.images[1].url" />
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          <v-list-tile-sub-title
            >{{ item.album.name }} - {{ item.artists[0].name }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider :key="`second-${index}`"></v-divider>
    </template>
    <div id="windowWrapper">
      <div v-if="playingTrack" class="playing">
        <v-subheader id="playingSubHeader">Now Playing ...</v-subheader>
        <v-list-tile :href="playingTrack.external_urls.spotify" target="_blank">
          <v-list-tile-avatar tile>
            <img :src="playingTrack.album.images[1].url" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ playingTrack.name }}</v-list-tile-title>
            <v-list-tile-sub-title
              >{{ playingTrack.album.name }} -
              {{ playingTrack.artists[0].name }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </div>
      <v-divider></v-divider>
      <div v-if="waitingTracks.length > 0">
        <v-subheader>Next Tracks</v-subheader>
        <template v-for="(item, index) in waitingTracks">
          <v-list-tile
            :key="`third-${index}`"
            :href="item.external_urls.spotify"
            target="_blank"
          >
            <v-list-tile-avatar tile>
              <img :src="item.album.images[1].url" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title
                >{{ index }}. {{ item.name }}</v-list-tile-title
              >
              <v-list-tile-sub-title
                >{{ item.album.name }} - {{ item.artists[0].name }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider :key="`fourth-${index}`"></v-divider>
        </template>
      </div>
    </div>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Track from '@/models/Track'

@Component({
  components: {}
})
export default class extends Vue {
  @Prop({ default: [] }) readonly playedTracks!: Track[]
  @Prop({ default: null }) readonly playingTrack!: Track | null
  @Prop({ default: [] }) readonly waitingTracks!: Track[]

  updated() {
    if (this.playingTrack) {
      this.$el.getElementsByClassName('playing')[0].scrollIntoView()
    }
  }
}
</script>

<style lang="scss" scoped>
#windowWrapper {
  min-height: calc(100vh - 150px);
}

.playing {
  padding-top: 1rem;
  background-color: #f8dce3;
  .v-subheader {
    color: #da4167;
  }
}

.v-subheader {
  font-size: 1.5rem;
  font-family: 'Pacifico';
  color: #0d47a1;
}
</style>
