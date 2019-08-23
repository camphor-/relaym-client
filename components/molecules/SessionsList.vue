<template>
  <div class="session-list-root">
    <h1>{{ title }}</h1>
    <div
      v-for="(session, index) of sessions"
      :key="index"
      class="session-holder"
    >
      <h2>{{ session.name }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Session from '@/models/Session'

@Component({
  components: {}
})
export default class extends Vue {
  @Prop({ default: '' }) readonly title!: String
  @Prop({ default: [] }) readonly sessions!: Session[]
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: left;
  color: white;
  font-weight: lighter;
}

.session-holder {
  background: white;
}
</style>
