<template>
  <div class="header-logo">
    <img src="@/assets/images/logo.svg" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.header-logo {
  text-align: center;
  img {
    height: $header-logo-height;
  }
}
</style>
