<template>
  <v-container class="page-root">
    <v-layout row wrap>
      <v-flex xs1>
        <v-btn flat icon class="page-back-btn" @click="backToTrackList">
          <v-icon large color="primary">chevron_left</v-icon>
        </v-btn>
      </v-flex>
      <v-flex>
        <v-text-field
          v-model="q"
          class="searchbox"
          hide-details
          prepend-icon="search"
          single-line
          clearable
          placeholder="曲名, アルバム名, アーティスト名"
          @keydown.enter="search"
        />
      </v-flex>
    </v-layout>
    <search-result-list :items="result.items" @click-item="selectTrack" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapState } from 'vuex'
import SearchResultList from '@/components/molecules/SearchResultList.vue'
import Snackbar from '@/components/molecules/Snackbar.vue'
import Track from '@/models/Track'
import SnackbarPayload from '@/models/SnackbarPayload'

@Component({
  components: { SearchResultList, Snackbar },
  computed: {
    ...mapState('search', ['result'])
  },
  methods: {
    ...mapActions('search', ['fetchSearchResult']),
    ...mapActions('currentSession', ['addTrack']),
    ...mapActions('snackbar', ['showSnackbar'])
  }
})
export default class Search extends Vue {
  private fetchSearchResult!: (payload: string) => void
  private addTrack!: (payload: Track) => void
  showSnackbar: (payload: SnackbarPayload) => void
  q: string = ''

  search() {
    this.fetchSearchResult(this.q)
  }

  selectTrack(track: Track) {
    this.addTrack(track)
  }

  backToTrackList() {
    const redirectPath: string | null = <string | null>(
      this.$route.query.redirect_to
    )
    this.$router.push({
      path: redirectPath || '/'
    })
  }
}
</script>

<style lang="scss" scoped>
.page-root {
  padding: 0;
}

.page-back-btn {
}

.searchbox {
  padding: 5px 16px 0 0;
}
</style>
