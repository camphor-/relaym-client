<template>
  <v-container class="page-root">
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
    <search-result-list :items="result" @click-item="finish" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState, mapActions } from 'vuex'
import SearchResultList from '@/components/molecules/SearchResultList.vue'

@Component({
  components: { SearchResultList },
  computed: {
    ...mapState('search', ['result'])
  },
  methods: {
    ...mapActions('search', ['fetchSearchResult'])
  }
})
export default class extends Vue {
  private fetchSearchResult!: (payload: string) => void
  q: string = ''

  search() {
    this.fetchSearchResult(this.q)
  }

  finish(id: string) {
    const redirectPath: string | null = <string | null>(
      this.$route.query.redirect_to
    )
    this.$router.push({
      path: redirectPath || '/',
      query: { add_track: id }
    })
  }
}
</script>

<style lang="scss" scoped>
.page-root {
  padding: 0;
}

.searchbox {
  padding: 0 16px;
  margin-bottom: 16px;
}
</style>
