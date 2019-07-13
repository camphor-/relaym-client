<template>
  <v-list two-line>
    <template v-for="(item, index) in items">
      <v-list-tile :key="item.title">
        <v-list-tile-content>
          <v-list-tile-title>{{ index }}. {{ item.name }}</v-list-tile-title>
          <v-list-tile-sub-title
            >{{ item.album.name }} - {{ item.artists[0].name }}
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
