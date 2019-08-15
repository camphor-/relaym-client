<template>
  <v-container>
    <v-flex align-center>
      <toppage-logo />

      <add-place-card />
      <!-- TODO: セッションリストを作る -->
      <places-list :places="places" @click="goSession" />
    </v-flex>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AddPlaceCard from '@/components/organisms/AddPlaceCard.vue'
import PlacesList from '@/components/organisms/PlacesList.vue'
import ToppageLogo from '@/components/molecules/ToppageLogo'
import auth from '@/api/auth'

@Component({
  components: { AddPlaceCard, PlacesList, ToppageLogo },
  layout: 'toppage'
})
export default class Index extends Vue {
  places = [{ id: 'camphor-', name: 'CAMPHOR-' }]

  goSession() {
    // this.$router.push({ path: `/sessions/${id}` })
    location.href = auth.getLoginUrl()
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
}

// Example of Media Query Mixin
@include mq(md) {
  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
