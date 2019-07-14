<template>
  <v-toolbar color="elevation-0 primary" dark>
    <v-toolbar-title>CAMPHOR- HOUSE</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 8px;
  border-bottom: 1px solid #ccc;
}
</style>
