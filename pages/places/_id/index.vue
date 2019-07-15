<template>
  <div class="page-root hide-overflow">
    <place-toolbar class="toolbar" />

    <div class="list-container">
      <track-list-container />
    </div>

    <div class="fabs">
      <v-btn fab dark color="primary" @click="togglePlayback()">
        <v-icon v-if="playing">pause</v-icon>
        <v-icon v-else>play_arrow</v-icon>
      </v-btn>
      <nuxt-link :to="{ path: '/search', query: { redirect_to: $route.path } }">
        <v-btn fab dark color="accent">
          <v-icon>add</v-icon>
        </v-btn>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState, mapActions } from 'vuex'
import PlaceToolbar from '@/components/molecules/PlaceToolbar.vue'
import TrackListContainer from '@/components/organisms/TrackListContainer.vue'

@Component({
  components: { TrackListContainer, PlaceToolbar },
  methods: {
    ...mapActions('tracklist', ['togglePlayback', 'addTrack'])
  },
  computed: {
    ...mapState('tracklist', ['playing'])
  }
})
export default class extends Vue {
  private togglePlayback!: (payload: {}) => void
  private addTrack!: (payload: string) => void
  mounted() {
    if ('add_track' in this.$route.query) {
      const trackURI: string = this.$route.query.add_track as string
      console.log(`add track ${trackURI}`)
      this.addTrack(trackURI)
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

  > .fabs {
    position: absolute;
    right: 32px;
    bottom: 32px;

    a {
      text-decoration: none;
    }
  }
}
</style>
