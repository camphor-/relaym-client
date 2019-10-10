<template>
  <div class="sessions-list-root">
    <h1 class="sessions-list-title">{{ title }}</h1>
    <v-card
      v-for="(session, index) of sessions"
      :key="index"
      class="session-holder"
      :href="`/sessions/${session.id}`"
    >
      <v-layout row align-center>
        <v-flex>
          <v-card-title>{{ session.name }}</v-card-title>
        </v-flex>
        <v-btn icon class="open-icon">
          <v-icon>open_in_new</v-icon>
        </v-btn>
      </v-layout>
    </v-card>
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
.sessions-list-root {
  max-width: 500px;
  margin: 0 auto;
}

.sessions-list-title {
  font-weight: lighter;
  color: #fff;
  text-align: left;
}

.session-holder {
  margin-bottom: 40px;
  border-radius: 14px;
}

.open-icon {
  width: 36px;
}
</style>
