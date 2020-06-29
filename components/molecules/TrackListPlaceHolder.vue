<template>
  <v-layout class="list-placeholder" justify-center>
    <h3 class="guidance">
      曲を追加しよう！
      <v-icon color="secondary">south_east</v-icon>
    </h3>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.list-placeholder {
  vertical-align: middle;
  color: $secondary-color;
  height: 100vh;
}

.guidance {
  margin: 8px 0;
  position: fixed;
  bottom: 12vh;
}
</style>
