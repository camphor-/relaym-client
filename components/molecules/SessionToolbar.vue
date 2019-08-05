<template>
  <div class="session-toolbar">
    <v-btn icon>
      <v-icon color="white">menu</v-icon>
    </v-btn>
    <span class="session-name">CAMPHOR- HOUSE</span>
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
.session-toolbar {
  z-index: 1;
  position: fixed;
  width: 100vw;
  display: flex;
  align-items: center;
  height: 56px;
  background: $primary-color;
  padding-right: 44px;
  .session-name {
    margin: 0 auto;
    color: white;
    font-size: 1.5rem;
  }
}
</style>
