<template>
  <v-navigation-drawer :value="value" @input="input" fixed temporary>
    <div id="logo">
      <nuxt-link to="/">Relaym</nuxt-link>
    </div>
    <v-list>
      <v-list-tile v-for="item in items" :key="item.title" :to="item.to" nuxt>
        <v-list-tile-avatar>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile class="bottom-btn" @click="terminateSession">
        <v-list-tile-avatar>
          <v-icon>archive</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>Terminate and Archive</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class extends Vue {
  private items = [
    { title: 'Home', icon: 'home', to: '/' },
    { title: 'Exit', icon: 'exit_to_app', to: '/' }
  ]

  @Prop({ default: false }) readonly value!: boolean

  @Emit()
  input(isOpen: boolean) {
    return isOpen
  }

  terminateSession() {
    // セッションを終了させる処理
  }
}
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
  max-height: 100vh;
}
a {
  text-decoration: none;
  color: $primary-color;
}
#logo {
  text-align: center;
  margin: 1rem 0;
  font-size: 2rem;
}
.bottom-btn {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
