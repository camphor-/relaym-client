<template>
  <div class="session-toolbar">
    <v-btn icon>
      <v-icon color="white">menu</v-icon>
    </v-btn>
    <span class="session-name">CAMPHOR- HOUSE</span>
    <span class="toolbar-spacer"></span>
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
  justify-content: space-between;
  align-items: center;
  height: 56px;
  background: $primary-color;
  .session-name {
    color: white;
    font-size: 1.5rem;
  }
  .toolbar-spacer {
    width: 36px;
  }
}
</style>
