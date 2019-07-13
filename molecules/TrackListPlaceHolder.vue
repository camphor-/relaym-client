<template>
  <v-layout class="list-placeholder" align-center justify-center fill-height>
    新しい曲を入れてね！
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class extends Vue {
  @Prop() readonly
}
</script>

<style lang="scss" scoped>
.list-placeholder {
  vertical-align: middle;
  height: 100%;
}
</style>
