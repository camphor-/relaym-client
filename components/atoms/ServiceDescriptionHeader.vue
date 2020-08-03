<template>
  <div class="service-description-header">
    <h2><slot /></h2>
    <span class="dots" />
    <img class="note-icon" src="../../assets/images/note_icon.svg" alt="" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'ServiceDescriptionHeader'
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.service-description-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.dots {
  margin: 0 8px;
  flex-grow: 1;
  border-top: 4px dotted $primary-color;
}
.note-icon {
  width: auto;
  height: 100%;
}
</style>
