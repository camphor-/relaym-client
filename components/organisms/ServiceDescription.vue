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

      <div class="features">
        <service-feature :icon-src="require('~/assets/images/feature1.svg')">
          <template v-slot:header
            >Spotify Premiumユーザーが<br />
            1人いればOK</template
          >
          <template v-slot:body
            ><p class="feature-description">
              再生する人だけがSpotify
              Premiumに加入していれば大丈夫。その他の参加者は、登録もログインも一切不要です。
            </p></template
          >
        </service-feature>

        <!-- TODO: 画像を差し替える-->
        <service-feature :icon-src="require('~/assets/images/feature1.svg')">
          <template v-slot:header>曲の追加が自分のスマホで完結</template>
          <template v-slot:body
            ><p class="feature-description">
              「あの曲が聴きたいな…」と思ったとき、もう再生する人に頼む必要はありません。自分のスマホから、いつでも好きな曲を追加できます。
            </p></template
          >
        </service-feature>

        <!-- TODO: 画像を差し替える-->
        <service-feature :icon-src="require('~/assets/images/feature1.svg')">
          <template v-slot:header>QRコードやURLで<br />らくらくシェア</template>
          <template v-slot:body
            ><p class="feature-description">
              Relaymはブラウザで動くので、面倒なインストールは一切不要。URLをシェアすれば、誰でもすぐ使い始めることができます。
            </p></template
          >
        </service-feature>
      </div>
    </section>

    <section>
      <service-description-header>使い方</service-description-header>

      <div class="howto-steps">
        <div>
          <howto-step-header class="step-header" num="1"
            >セッションに招待する</howto-step-header
          >
          <img src="~/assets/images/step1.png" />
        </div>

        <div>
          <howto-step-header class="step-header" num="2"
            >曲をキューに追加する</howto-step-header
          >
          <img src="~/assets/images/step2.png" />
        </div>

        <div>
          <howto-step-header class="step-header" num="3"
            >セッションを再生する</howto-step-header
          >
          <img src="~/assets/images/step3.png" />
        </div>
      </div>
    </section>

    <section v-if="isShowLoginButton" class="login-button">
      <login-button />
    </section>

    <section>
      <div class="share-text">＼このサービスをシェア／</div>
      <share-buttons />
    </section>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ServiceDescriptionHeader from '@/components/atoms/ServiceDescriptionHeader.vue'
import ServiceFeature from '@/components/atoms/ServiceFeature.vue'
import HowtoStepHeader from '@/components/atoms/HowtoStepHeader.vue'
import LoginButton from '@/components/atoms/LoginButton.vue'
import ShareButtons from '@/components/atoms/ShareButtons.vue'

@Component({
  name: 'ServiceDescription',
  components: {
    ShareButtons,
    HowtoStepHeader,
    ServiceFeature,
    ServiceDescriptionHeader,
    LoginButton
  }
})
export default class extends Vue {
  @Prop({ default: true }) readonly isShowLoginButton!: boolean
}
</script>

<style lang="scss" scoped>
.service-description {
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 24px;

  > section {
    margin-bottom: 48px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.features {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, auto);
  grid-gap: 24px 48px;

  @media screen and (min-width: 960px) {
    grid-template-columns: repeat(3, auto);
    grid-template-rows: 1fr;
  }
}

.feature-description {
  margin-bottom: 0;
}

.howto-steps {
  > div {
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  img {
    margin-top: 8px;
    max-width: 100%;
  }

  @media screen and (min-width: 960px) {
    > div {
      display: flex;
      align-items: flex-start;
    }
    img {
      margin-top: 0;
      max-width: 500px;
    }
    .step-header {
      margin-top: 16px;
      flex-grow: 1;
    }
  }
}

.login-button {
  margin: 32px 0;
}

.share-text {
  margin-bottom: 8px;
  font-weight: bold;
  text-align: center;
}
</style>
