<template>
  <div class="service-feature">
    <div class="feature-icon">
      <img src="" />
    </div>
    <h3 class="feature-header"><slot name="header" /></h3>
    <div class="feature-body"><slot name="body" /></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'ServiceFeature'
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.feature-icon {
  margin: 0 auto;
  width: 128px;
  height: 128px;
  padding: 16px;
  background-color: rgba(248, 219, 223, 0.25);
  border-radius: 100%;

  > img {
    width: 100%;
    height: 100%;
  }
}
.feature-header {
  text-align: center;
  margin: 16px 0;
}
</style>
