<template>
  <v-app>
    <v-content>
      <header-logo />
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import HeaderLogo from '@/components/molecules/HeaderLogo'
@Component({
  components: { HeaderLogo }
})
export default class extends Vue {}
</script>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
