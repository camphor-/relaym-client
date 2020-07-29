<template>
  <div class="session-archived-header">
    このセッションはアーカイブ済みです
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'SessionArchivedHeader'
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.session-archived-header {
  padding: 4px;
  background-color: #424242;
  color: #fff;
  font-weight: bold;
  text-align: center;
}
</style>
