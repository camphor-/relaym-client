<template>
  <v-layout class="list-placeholder" align-center justify-center fill-height>
    Add New Track!
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
  height: 100%;
  font-family: 'Paficifo';
  color: #0d47a1;
}
</style>
