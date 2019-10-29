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
        ></v-text-field>
      </v-flex>
    </v-layout>
    <search-result-list :items="result.items" @click-item="selectTrack" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
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
  lastSearchTime = Date.now()
  searchInterval = 1000

  @Watch('q')
  search() {
    if (!this.q) return

    // searchInterval以上経っていたら検索
    if (this.lastSearchTime + this.searchInterval < Date.now()) {
      this.lastSearchTime = Date.now()
      this.fetchSearchResult(this.q)
    }

    // searchInterval以上経って変化がなかったら検索
    const lastQ = this.q
    setTimeout(() => {
      if (lastQ === this.q) {
        this.fetchSearchResult(this.q)
      }
    }, this.searchInterval)
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
