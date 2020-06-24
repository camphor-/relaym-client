<template>
  <v-list-tile
    :href="track.external_url"
    target="_blank"
    rel="noopener noreferrer"
    class="list-item"
  >
    <v-list-tile-avatar tile>
      <img :src="track.album.images[1].url" />
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>{{ track.name }}</v-list-tile-title>
      <v-list-tile-sub-title
        >{{ track.album.name }} - {{ track.artists[0].name }}
      </v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Track } from '@/api/v3/types'

@Component({
  name: 'TrackListItem',
  components: {}
})
export default class extends Vue {
  @Prop({ required: true }) readonly track!: Track
}
</script>

<style lang="scss" scoped>
.list-item {
  background-color: #ffffff;
}
</style>
