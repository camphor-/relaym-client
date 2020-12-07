<template>
  <v-layout class="service-description" column>
    <section>
      <service-description-header>Relaymとは</service-description-header>
      <p>
        Relaym（リレイム）は、それぞれが聴きたいSpotifyの楽曲を1つのスピーカーで楽しめるWebアプリです。
      </p>

      <h3 class="usecase-header">こんな時にRelaym!</h3>
      <div class="usecases">
        <div>
          <div class="usecase-icon">
            <v-icon color="white" x-large>drive_eta</v-icon>
          </div>
          友人同士でドライブに行くとき
        </div>
        <div>
          <div class="usecase-icon">
            <v-icon color="white" x-large>headset</v-icon>
          </div>
          SNS上で作業用BGMを募集したいとき
        </div>
      </div>
    </section>

    <section>
      <service-description-header>特徴</service-description-header>

      <div class="features">
        <service-feature
          :icon-src="require('~/assets/images/spotify_premium.svg')"
        >
          <template #header
            >Spotify Premiumユーザーが<br />
            1人いればOK</template
          >
          <template #body
            ><p class="feature-description">
              再生する人だけがSpotify
              Premiumに加入していれば大丈夫。その他の参加者は、登録もログインも一切不要です。
            </p></template
          >
        </service-feature>

        <service-feature :icon-src="require('~/assets/images/add.svg')">
          <template #header>曲の追加が自分のスマホで完結</template>
          <template #body
            ><p class="feature-description">
              「あの曲が聴きたいな…」と思ったとき、もう再生する人に頼む必要はありません。自分のスマホから、いつでも好きな曲を追加できます。
            </p></template
          >
        </service-feature>

        <service-feature :icon-src="require('~/assets/images/share.svg')">
          <template #header>QRコードやURLで<br />らくらくシェア</template>
          <template #body
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
          <img
            src="~/assets/images/step1.png"
            alt="サイドメニューを開くと、セッションのQRコードやURLを共有することができます。"
          />
        </div>

        <div>
          <howto-step-header class="step-header" num="2"
            >曲をキューに追加する</howto-step-header
          >
          <img
            src="~/assets/images/step2.png"
            alt="セッションページ下部の＋ボタンを押すと、検索画面に移ります。曲名やアーティスト名などを入力して、追加したい曲の横にある＋ボタンをタップしましょう。"
          />
        </div>

        <div>
          <howto-step-header class="step-header" num="3"
            >セッションを再生する</howto-step-header
          >
          <img
            src="~/assets/images/step3.png"
            alt="セッションページ下部の再生ボタンを押すと、再生が始まります。"
          />
        </div>
      </div>
    </section>

    <section v-if="isShowLoginButton" class="login-button">
      <login-button />
    </section>

    <section>
      <div class="share-text">＼このサービスをシェア／</div>
      <share-buttons />

      <div class="github-buttons">
        <v-btn
          color="#333"
          class="white--text"
          href="https://github.com/camphor-/relaym-client"
          round
        >
          <v-font-awesome :icon="['fab', 'github']" left />
          relaym-client
        </v-btn>
        <v-btn
          color="#333"
          class="white--text"
          href="https://github.com/camphor-/relaym-server"
          round
        >
          <v-font-awesome :icon="['fab', 'github']" left />
          relaym-server
        </v-btn>
      </div>
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
import VFontAwesome from '~/components/atoms/VFontAwesome.vue'

@Component({
  name: 'ServiceDescription',
  components: {
    VFontAwesome,
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

.usecase-header {
  display: flex;
  align-items: center;
  margin: 32px 0 16px;

  &::before,
  &::after {
    content: '';
    display: block;
    border-top: 1px solid #ccc;
    flex-grow: 1;
  }
}
.usecases {
  display: grid;
  grid-gap: 16px;
  grid-template-rows: auto auto;
  grid-template-columns: auto;
  > div {
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: 960px) {
    grid-template-rows: auto;
    grid-template-columns: auto auto;
    margin: 0 32px;
  }
}
.usecase-icon {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  margin-right: 16px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #616161;
  user-select: none;
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

.github-buttons {
  margin: 16px auto 0;
  text-align: center;
}
</style>
