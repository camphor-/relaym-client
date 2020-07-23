<template>
  <div class="howto-step-header">
    <div class="step-num">{{ num }}</div>
    <h3><slot /></h3>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'HowtoStepHeader'
})
export default class extends Vue {
  @Prop({ default: 1 }) readonly num!: number
}
</script>

<style lang="scss" scoped>
.howto-step-header {
  display: flex;
  align-items: center;
}
.step-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2em;
  height: 2em;
  margin-right: 12px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: $primary-color;
  border-radius: 100%;
}
h3 {
  flex-grow: 1;
}
</style>
