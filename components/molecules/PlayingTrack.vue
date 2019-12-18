<template>
  <div class="playing">
    <div class="track-container">
      <img :src="playingTrack.album.images[1].url" />
      <div class="track-info">
        <v-list-tile-title>{{ playingTrack.name }}</v-list-tile-title>
        <v-list-tile-sub-title
          >{{ playingTrack.album.name }} -
          {{ playingTrack.artists[0].name }}
        </v-list-tile-sub-title>
      </div>
    </div>

    <seekbar
      :length="playback.length"
      :progress="playback.progress"
      :remaining="playback.remaining"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Seekbar from '@/components/atoms/Seekbar.vue'
import { Playback } from '@/store/currentSession'
import Track from '@/models/Track'

@Component({
  name: 'PlayingTrack',
  components: { Seekbar }
})
export default class extends Vue {
  @Prop({ required: true }) readonly playback!: Playback
  @Prop({ required: true }) readonly playingTrack!: Track
}
</script>

<style lang="scss" scoped>
.playing {
  background-color: #ffffff;
  margin: 12px;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.16);

  .track-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;

    img {
      width: 64px;
      height: 64px;
      object-fit: contain;
      margin-right: 12px;
    }
    .track-info {
      flex-grow: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
