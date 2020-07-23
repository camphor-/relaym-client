<template>
  <v-layout class="service-description" column>
    <section>
      <service-description-header>Relaymとは</service-description-header>
      <p>
        Relaym（リレイム）は、それぞれが聴きたいSpotifyの楽曲を1つのスピーカーで楽しめるWebアプリです。
      </p>
    </section>

    <section>
      <service-description-header>特徴</service-description-header>
      <service-feature>
        <template v-slot:header
          >Spotify Premiumユーザーが<br />
          1人いればOK</template
        >
        <template v-slot:body
          ><p>
            再生する人だけがSpotify
            Premiumに加入していれば大丈夫。その他の参加者は、登録もログインも一切不要です。
          </p></template
        >
      </service-feature>
    </section>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ServiceDescriptionHeader from '@/components/atoms/ServiceDescriptionHeader.vue'
import ServiceFeature from '@/components/atoms/ServiceFeature.vue'

@Component({
  name: 'ServiceDescription',
  components: { ServiceFeature, ServiceDescriptionHeader }
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.service-description {
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 24px;

  > section {
    margin-bottom: 48px;
  }
}
</style>
