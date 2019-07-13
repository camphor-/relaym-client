<template>
  <div class="page-root hide-overflow">
    <place-toolbar class="toolbar" />

    <div class="list-container">
      <track-list-container />
    </div>

    <nuxt-link :to="{ path: '/search', query: { redirect_to: $route.path } }">
      <v-btn fixed fab bottom right dark color="pink">
        <v-icon>add</v-icon>
      </v-btn>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PlaceToolbar from '@/components/molecules/PlaceToolbar.vue'
import TrackListContainer from '@/components/organisms/TrackListContainer.vue'

@Component({
  components: { TrackListContainer, PlaceToolbar }
})
export default class extends Vue {
  mounted() {
    if ('add_track' in this.$route.query) {
      console.log(`add track ${this.$route.query.add_track}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-root {
  position: relative;
  height: calc(100vh - #{$header-logo-height});
  display: grid;
  grid-template:
    'toolbar' auto
    'list' 1fr
    / 1fr;

  > .toolbar {
    grid-area: toolbar;
  }

  > .list-container {
    grid-area: list;
    overflow-y: auto;
  }
}
</style>
