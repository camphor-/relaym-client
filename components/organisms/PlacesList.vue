<template>
  <v-card class="places_list">
    <v-card-title>
      <span class="card_title">周りの場所</span>
    </v-card-title>
    <v-list>
      <template v-for="(place, index) in places">
        <v-list-title :key="place.name">
          <v-list-tile-content class="place_name">
            <v-list-tile-title>{{ place.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-title>
        <v-divider :key="index"></v-divider>
      </template>
    </v-list>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Place from '@/models/Place'

@Component({
  components: {}
})
export default class extends Vue {
  @Prop({ default: [] }) readonly places!: Place[]
}
</script>
<style lang="scss" scoped>
.card_title {
  font-size: 1.5rem;
}
.places_list {
  padding: 10px;
  .place_name {
    font-size: 1.2rem;
    padding: 10px;
  }
}
</style>
