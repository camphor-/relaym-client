<template>
  <div>
    <v-navigation-drawer :value="value" fixed temporary @input="input">
      <img class="text-logo" src="~assets/images/text_logo.svg" alt="Relaym" />
      <v-list>
        <v-list-tile to="/" nuxt>
          <v-list-tile-avatar>
            <v-icon>home</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <template v-if="isMyOwnSession">
          <v-list-tile v-if="isSessionArchived" @click="unarchiveSession">
            <v-list-tile-avatar>
              <v-icon>unarchive</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Unarchive</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-else @click="archiveSession">
            <v-list-tile-avatar>
              <v-icon>archive</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Archive</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <invite-link-box
          class="invite-link-box"
          :session-id="sessionId"
          :session-name="sessionName"
          :is-allow-public-share="!allowToControlByOthers"
        />
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { mapState, mapActions, mapGetters } from 'vuex'
import InviteLinkBox from '@/components/molecules/InviteLinkBox.vue'
import { Session } from '@/lib/api/v3/types'
import { PlaybackStates } from '@/lib/api/v3/session'

@Component({
  components: { InviteLinkBox },
  computed: {
    ...mapState('pages/sessions/detail', ['sessionId', 'session']),
    ...mapGetters('pages/sessions/detail', [
      'sessionName',
      'isMyOwnSession',
      'isSessionArchived'
    ])
  },
  methods: {
    ...mapActions('pages/sessions/detail', ['controlState'])
  }
})
export default class extends Vue {
  @Prop({ default: false }) readonly value!: boolean
  private readonly sessionId!: string | null
  private readonly session!: Session | null
  private readonly sessionName!: string
  private readonly isMyOwnSession!: boolean
  private readonly isSessionArchived!: boolean

  private controlState!: (req: { state: PlaybackStates }) => Promise<void>

  @Emit()
  input(isOpen: boolean) {
    return isOpen
  }

  get allowToControlByOthers(): boolean {
    // eslint-disable-next-line camelcase
    return this.session?.allow_to_control_by_others ?? false
  }

  archiveSession() {
    this.controlState({ state: 'ARCHIVED' })
  }

  unarchiveSession() {
    this.controlState({ state: 'STOP' })
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
.text-logo {
  height: 2rem;
  display: block;
  margin: 16px auto;
}
.invite-link-box {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
