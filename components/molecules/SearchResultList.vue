<template>
  <v-list two-line class="result-list">
    <template v-for="item in items">
      <v-list-tile :key="item.title" avatar>
        <v-list-tile-avatar tile>
          <img
            :src="item.album.images[2].url"
            :width="item.album.images[2].width"
            :height="item.album.images[2].height"
          />
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          <v-list-tile-sub-title>
            {{ item.album.name }} - {{ item.artists[0].name }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Track from '@/models/Track'

@Component({
  components: {}
})
export default class extends Vue {
  @Prop({ default: [] }) readonly items!: Track[]
}
</script>

<style lang="scss" scoped></style>
