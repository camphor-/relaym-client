<template>
  <v-container>
    <v-flex align-center>
      <div class="logo">
        <a href="/">
          <img src="~assets/images/logo_toppage.svg" />
        </a>
      </div>

      <add-place-card />
      <places-list :places="places" />
    </v-flex>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AddPlaceCard from '@/components/organisms/AddPlaceCard.vue'
import PlacesList from '@/components/organisms/PlacesList.vue'

@Component({
  components: { AddPlaceCard, PlacesList },
  layout: 'toppage'
})
export default class Index extends Vue {
  places = [
    { id: 'camphor-', name: 'CAMPHOR- HOUSE' },
    { id: 'ku', name: 'Kyoto University' }
  ]
}
</script>

<style lang="scss" scoped>
.logo {
  font-size: 3rem;
  a img {
    max-width: 500px;
  }
}

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
