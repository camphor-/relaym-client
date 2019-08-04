<template>
  <div class="toolbar">
    <v-btn icon>
      <v-icon>menu</v-icon>
    </v-btn>
    <span class="title">CAMPHOR- HOUSE</span>
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
.toolbar {
  display: flex;
  justify-content: space-around;
  height: 56px;
  background: $primary-color;
  .title {
    color: white;
  }
}
</style>
