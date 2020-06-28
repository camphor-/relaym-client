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
    <search-result-list :items="result" @click-item="selectTrack" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapActions, mapState } from 'vuex'
import SearchResultList from '@/components/molecules/SearchResultList.vue'
import Snackbar from '@/components/organisms/Snackbar.vue'
import { Track } from '@/api/v3/types'
import { MessageType, SnackbarPayload } from '@/store/snackbar'

const SEARCH_INTERVAL = 1000

@Component({
  components: { SearchResultList, Snackbar },
  computed: {
    ...mapState('pages/sessions/search', ['result'])
  },
  methods: {
    ...mapActions('pages/sessions/search', [
      'setSessionId',
      'fetchSearchResult',
      'enqueueTrack'
    ]),
    ...mapActions('snackbar', ['showSnackbar'])
  }
})
export default class Search extends Vue {
  private setSessionId!: (payload: string) => void
  private fetchSearchResult!: (payload: string) => void
  private enqueueTrack!: (payload: string) => void
  private q: string = ''
  private lastSearchTime = Date.now()
  private showSnackbar!: (payload: SnackbarPayload) => void

  private searchTimeoutId: number | null = null

  @Watch('$route.params.id', { immediate: true })
  onPathIdChanged() {
    this.setSessionId(this.$route.params.id)
  }

  @Watch('q')
  search() {
    if (!this.q) return

    // searchInterval以上経っていたら検索
    if (this.lastSearchTime + SEARCH_INTERVAL < Date.now()) {
      this.lastSearchTime = Date.now()
      this.fetchSearchResult(this.q)
    }

    // searchInterval以上経って変化がなかったら検索
    const lastQ = this.q
    if (typeof this.searchTimeoutId === 'number') {
      clearTimeout(this.searchTimeoutId)
      this.searchTimeoutId = null
    }
    this.searchTimeoutId = window.setTimeout(() => {
      if (lastQ === this.q) {
        this.fetchSearchResult(this.q)
      }
    }, SEARCH_INTERVAL)
  }

  selectTrack(track: Track) {
    this.enqueueTrack(track.uri)
    this.showSnackbar({
      message: `${track.name} を追加しました`,
      messageType: MessageType.info
    })
  }

  backToTrackList() {
    this.$router.push(`/sessions/${this.$route.params.id}`)
  }

  beforeDestroy() {
    if (typeof this.searchTimeoutId === 'number') {
      clearTimeout(this.searchTimeoutId)
    }
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
