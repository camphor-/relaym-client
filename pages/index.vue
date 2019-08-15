<template>
  <v-container>
    <v-flex align-center column>
      <toppage-logo />

      <h1 class="top-page-title">Relaym</h1>
      <v-btn round outline small color="primary" class="about-relaym-btn"
        >About Relaym</v-btn
      >
      <v-btn round color="secondary" class="new-session-btn">New Session</v-btn>
    </v-flex>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PlacesList from '@/components/organisms/PlacesList.vue'
import ToppageLogo from '@/components/molecules/ToppageLogo'
import auth from '@/api/auth'

@Component({
  components: { PlacesList, ToppageLogo },
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

.top-page-title {
  font-family: Roboto, 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  font-size: 48px;
  color: $primary-color;
  font-weight: normal;
}

button {
  display: block;
  margin: auto;
}

.about-relaym-btn {
  font-size: 12px;
}

.new-session-btn {
  margin-top: 4rem;
  font-size: 18px;
}

.links {
  padding-top: 15px;
}
</style>
