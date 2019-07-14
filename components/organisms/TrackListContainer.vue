<template>
  <div class="container-root">
    <template v-if="trackList">
      <div class="list-root">
        <track-list :items="trackList" />
      </div>
    </template>
    <template v-else>
      <track-list-place-holder />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState, mapActions } from 'vuex'
import TrackListPlaceHolder from '@/components/molecules/TrackListPlaceHolder.vue'
import TrackList from '@/components/molecules/TrackList.vue'

@Component({
  components: { TrackList, TrackListPlaceHolder },
  methods: {
    ...mapActions('tracklist', ['fetchTrackList'])
  },
  computed: {
    ...mapState('tracklist', ['trackList'])
  }
})
export default class extends Vue {
  private fetchTrackList!: (payload: {}) => void
  mounted() {
    this.fetchTrackList({})
  }
}
</script>

<style lang="scss" scoped>
.container-root {
  height: 100%;
}
.list-root {
  max-height: 100%;
  overflow-y: auto;
}
</style>
