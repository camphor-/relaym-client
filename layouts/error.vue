<template>
  <v-container>
    <toppage-logo />
    <h1 class="error-page-title">Relaym</h1>
    <p>{{ error.message }}</p>
    <div class="home-button-wrapper">
      <v-btn round color="secondary" class="home" href="/"
        >Return to Top Page</v-btn
      >
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ToppageLogo from '@/components/molecules/ToppageLogo.vue'

@Component({
  components: {
    ToppageLogo
  },
  // nuxt-property-decoratorを使うと、謎のVuexの型エラーが出るので使っていない
  head() {
    return {
      title: 'Error'
    }
  }
})
export default class Error extends Vue {
  @Prop({ default: {} }) readonly error!: any
  private message = '404'
}
</script>

<style lang="scss" scoped>
.error-page-title {
  color: $primary-color;
}

.home-button-wrapper {
  margin-top: 30px;
  text-align: center;
}
</style>
