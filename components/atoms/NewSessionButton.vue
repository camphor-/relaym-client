<template>
  <v-btn
    class="new-session-btn"
    round
    large
    color="secondary"
    @click="handleClick"
    >New Session</v-btn
  >
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
  @Emit('click')
  handleClick(e: Event) {
    return e
  }
}
</script>

<style lang="scss" scoped>
.new-session-btn {
  font-size: 18px;
}
</style>
