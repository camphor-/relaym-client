<template>
  <v-container>
    <v-flex align-center>
      <div class="logo">
        <h1>Here Songs</h1>
      </div>

      <v-card class="new_place">
        <v-card-title>
          <span class="card_title">新しい場所を追加する</span>
        </v-card-title>
        <v-form>
          <v-text-field label="place id"></v-text-field>
          <v-text-field label="Name"></v-text-field>
        </v-form>
      </v-card>

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

interface Place {
  name: string
}

@Component({
  components: {},
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

.container {
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
  .new_place {
    margin-bottom: 20px;
    padding: 1rem;
  }
  .places_list {
    padding: 10px;
    .place_name {
      font-size: 1.2rem;
      padding: 10px;
    }
  }
}

.card_title {
  font-size: 1.5rem;
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
