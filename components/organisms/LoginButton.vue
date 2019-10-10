<template>
  <div class="login-button-container">
    <v-btn round color="white">Login</v-btn>
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
.login-button-container {
  text-align: center;
}
</style>
