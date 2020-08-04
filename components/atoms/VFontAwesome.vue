<template>
  <font-awesome-icon
    class="v-font-awesome"
    :class="{ left: left !== false, right: right !== false }"
    :icon="icon"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'VFontAwesome'
})
export default class extends Vue {
  @Prop({ default: false }) readonly left!: boolean
  @Prop({ default: false }) readonly right!: boolean
  @Prop({ required: true }) readonly icon!: string | string[]
}
</script>

<style lang="scss" scoped>
.v-font-awesome {
  font-size: 24px;

  &.left {
    margin-right: 16px;
  }
  &.right {
    margin-left: 16px;
  }
}
</style>
