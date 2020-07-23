<template>
  <div class="service-feature">
    <div class="feature-icon">
      <img :src="iconSrc" />
    </div>
    <h3 class="feature-header"><slot name="header" /></h3>
    <div class="feature-body"><slot name="body" /></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'ServiceFeature'
})
export default class extends Vue {
  @Prop({ required: true }) readonly iconSrc!: string
}
</script>

<style lang="scss" scoped>
.feature-icon {
  margin: 0 auto;
  width: 144px;
  height: 144px;
  padding: 24px;
  background-color: rgba(248, 219, 223, 0.25);
  border-radius: 100%;

  > img {
    width: 100%;
    height: 100%;
  }
}
.feature-header {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 8px 0;
  height: 3em;
}
</style>
