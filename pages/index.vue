<template>
  <v-container>
    <v-flex align-center>
      <div class="logo">
        <a href="/">
          <img src="~assets/images/logo_toppage.svg" />
        </a>
      </div>

      <add-place-card />

      <v-card class="places_list">
        <v-card-title>
          <span class="card_title">周りの場所</span>
        </v-card-title>
        <v-list>
          <template v-for="(place, index) in places">
            <v-list-title :key="place.name">
              <v-list-tile-content class="place_name">
                <v-list-tile-title>{{ place.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-title>
            <v-divider :key="index"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AddPlaceCard from '@/components/organisms/AddPlaceCard.vue'

interface Place {
  name: string
}

@Component({
  components: { AddPlaceCard },
  layout: 'toppage'
})
export default class Index extends Vue {
  places: Place[] = [{ name: 'CAMPHOR- HOUSE' }, { name: 'Kyoto University' }]
}
</script>

<style lang="scss" scoped>
.logo {
  font-size: 3rem;
}

.white_text {
  color: white;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;

  .places_list {
    padding: 10px;
    .place_name {
      font-size: 1.2rem;
      padding: 10px;
    }
  }
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
