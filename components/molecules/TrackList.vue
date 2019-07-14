<template>
  <v-list two-line>
    <v-subheader v-if="playedTracks.length > 0">再生済み</v-subheader>
    <template v-for="item in playedTracks">
      <v-list-tile
        :key="item.title"
        :href="trackHref + item.id"
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
      <v-divider :key="item"></v-divider>
    </template>
    <div id="windowWrapper">
      <div v-if="playingTrack" class="playing">
        <v-subheader id="playingSubHeader">再生中</v-subheader>
        <v-list-tile :href="trackHref + playingTrack.id" target="_blank">
          <v-list-tile-avatar tile>
            <img :src="playingTrack.album.images[1].url" />
          </v-list-tile-avatar>
          <v-list-tile-content v-if="playingTrack">
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
        <v-subheader>再生待ち</v-subheader>
        <template v-for="(item, index) in waitingTracks">
          <v-list-tile
            :key="item.title"
            :href="trackHref + item.id"
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
          <v-divider :key="item"></v-divider>
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

  trackHref = 'https://open.spotify.com/track/'

  updated() {
    this.$el.getElementsByClassName('playing')[0].scrollIntoView()
  }
}
</script>

<style lang="scss" scoped>
#windowWrapper {
  min-height: calc(100vh - 150px);
}

.playing {
  padding-top: 1rem;
  background-color: #bdcce5;
}

.v-subheader {
  font-size: 1.5rem;
}
</style>
