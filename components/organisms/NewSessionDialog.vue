<template>
  <v-dialog :value="value" width="500" @input="input">
    <v-card>
      <v-card-title>New Session</v-card-title>
      <v-card-text>
        <v-checkbox
          v-model="isPublic"
          color="primary"
          label="public"
        ></v-checkbox>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" depressed @click="createNewSession()"
          >作成
        </v-btn>
        <v-btn flat color="primary" @click="closeDialog()">
          キャンセル
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import ApiV2 from '@/api/v2'
import Session from '@/models/Session'

@Component({})
export default class extends Vue {
  @Prop({ default: false }) readonly value!: boolean

  private isPublic: boolean = false

  @Emit()
  input(isOpen: boolean) {
    return isOpen
  }

  closeDialog() {
    this.input(false)
  }

  async createNewSession() {
    const newSession: Session = (await ApiV2.sessions.createSession({
      is_public: this.isPublic
    })).session
    this.$router.push({ path: `/sessions/${newSession.id}` })
  }
}
</script>

<style scoped></style>
