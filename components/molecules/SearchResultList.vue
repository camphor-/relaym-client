<template>
  <v-list v-if="items" two-line class="result-list">
    <template v-for="(item, index) in items">
      <v-list-tile :key="item.title">
        <v-list-tile-avatar tile>
          <a :href="item.external_urls.spotify">
            <img
              :src="item.album.images[2].url"
              :width="item.album.images[2].width"
              :height="item.album.images[2].height"
            />
          </a>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          <v-list-tile-sub-title>
            {{ item.album.name }} - {{ item.artists[0].name }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon @click="clickItem(item)">
            <v-icon color="primary">add_circle</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider
        v-if="index + 1 < items.length"
        :key="`divider-${index}`"
      ></v-divider>
    </template>
  </v-list>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import Track from '@/models/Track'

@Component({
  components: {}
})
export default class extends Vue {
  @Prop({ default: null }) readonly items!: Track[] | null

  @Emit()
  clickItem(track: Track) {
    return track
  }
}
</script>

<style lang="scss" scoped>
.v-avatar img {
  height: 100%;
  width: 100%;
}
.v-list {
  border-bottom: solid 1px #fafafa;
}
</style>
