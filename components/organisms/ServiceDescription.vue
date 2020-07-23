<template>
  <v-layout class="service-description" pa-4 column>
    <section>
      <service-description-header>Relaymとは</service-description-header>
      <p>
        Relaym（リレイム）は、それぞれが聴きたいSpotifyの楽曲を1つのスピーカーで楽しめるWebアプリです。
      </p>
    </section>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ServiceDescriptionHeader from '@/components/atoms/ServiceDescriptionHeader.vue'

@Component({
  name: 'ServiceDescription',
  components: { ServiceDescriptionHeader }
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.service-description section {
  margin-bottom: 48px;
}
</style>
