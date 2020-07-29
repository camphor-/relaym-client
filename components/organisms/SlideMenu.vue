<template>
  <div>
    <v-navigation-drawer :value="value" fixed temporary @input="input">
      <div id="logo">
        <nuxt-link to="/">Relaym</nuxt-link>
      </div>
      <v-list>
        <v-list-tile to="/" nuxt>
          <v-list-tile-avatar>
            <v-icon>home</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <invite-link-box
          class="invite-link-box"
          :session-id="sessionId"
          :is-show-share-warning="allowToControlByOthers"
        />
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import InviteLinkBox from '@/components/molecules/InviteLinkBox.vue'
import { Session } from '@/api/v3/types'

@Component({
  components: { InviteLinkBox },
  computed: {
    ...mapState('pages/sessions/detail', ['sessionId', 'session'])
  }
})
export default class extends Vue {
  @Prop({ default: false }) readonly value!: boolean
  private readonly sessionid!: string | null
  private readonly session!: Session | null

  @Emit()
  input(isOpen: boolean) {
    return isOpen
  }

  get allowToControlByOthers(): boolean {
    // eslint-disable-next-line camelcase
    return this.session?.allow_to_control_by_others ?? true
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
.invite-link-box {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
