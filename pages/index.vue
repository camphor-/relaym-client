<template>
  <v-container>
    <div class="logo">Here Songs</div>
    <v-card class="new_place">
      <v-card-title>
        <span>新しい場所を追加する</span>
      </v-card-title>
      <v-form>
        <v-text-field label="place id"></v-text-field>
        <v-text-field label="Name"></v-text-field>
      </v-form>
    </v-card>
    <div class="places_list">
      <v-list>
        <template v-for="place in places">
          <v-list-title :key="place.name">
            <v-list-tile-content>
              <v-list-tile-title>{{ place.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-title>
        </template>
      </v-list>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Logo from '~/components/Logo.vue'

interface Place {
  name: string
}

@Component({
  components: {
    Logo
  }
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
    margin: 2rem;
    max-width: 500px;
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
