<template>
  <v-list v-if="items" two-line class="result-list">
    <template v-for="(item, index) in items">
      <v-list-tile :key="index">
        <v-list-tile-avatar tile class="artwork">
          <img
            v-if="item.album.images[2]"
            :src="item.album.images[2].url"
            :width="item.album.images[2].width"
            :height="item.album.images[2].height"
          />
          <v-icon v-else>album</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          <v-list-tile-sub-title>
            {{ getArtistNames(item.artists) }} -
            {{ item.album.name }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon @click="clickItem(item)">
            <v-icon color="primary">add_circle</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider v-if="index + 1 < items.length" :key="'d' + index"></v-divider>
    </template>
  </v-list>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { Artist, Track } from '@/lib/api/v3/types'
import { getArtistNames } from '@/lib/artist'

@Component({
  components: {}
})
export default class extends Vue {
  @Prop({ default: null }) readonly items!: Track[] | null

  @Emit()
  clickItem(track: Track) {
    return track
  }

  getArtistNames(artists: Artist[]) {
    getArtistNames(artists)
  }
}
</script>

<style lang="scss" scoped>
.v-avatar img {
  height: 100%;
  width: 100%;
}
.v-list__tile__avatar {
  min-width: 40px;
}
.artwork {
  margin-right: 8px;
}
</style>
