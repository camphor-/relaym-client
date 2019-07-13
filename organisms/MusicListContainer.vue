<template>
  <div class="list-container">
    <MusicListPlaceHolder />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MusicListPlaceHolder from '@/molecules/MusicListPlaceHolder.vue'

@Component({
  components: { MusicListPlaceHolder }
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.list-container {
  height: 100%;
}
</style>
