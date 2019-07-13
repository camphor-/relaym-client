<template>
  <div class="page-root hide-overflow">
    <place-toolbar />

    <div class="list-container">
      <track-list-container />
    </div>

    <v-btn fixed fab bottom right dark color="pink">
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PlaceToolbar from '@/molecules/PlaceToolbar.vue'
import TrackListContainer from '@/organisms/TrackListContainer.vue'

@Component({
  components: { TrackListContainer, PlaceToolbar }
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.page-root {
  position: relative;
  height: calc(100vh - 56px);
}

.list-container {
  height: calc(100vh - 56px);
  overflow-y: auto;
}
</style>
