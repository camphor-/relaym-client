<template>
  <div class="page-root">
    <place-toolbar />
    <div class="list-root">
      <music-list-container />
    </div>

    <v-btn fixed fab bottom right dark color="pink">
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PlaceToolbar from '@/molecules/PlaceToolbar.vue'
import MusicListContainer from '@/organisms/MusicListContainer.vue'

@Component({
  components: { MusicListContainer, PlaceToolbar }
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.page-root {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.list-root {
  flex-grow: 1;
}
</style>
