<template>
  <v-dialog :value="value" @input="input" width="500">
    <v-card>
      <v-card-title>New Session</v-card-title>
      <v-card-text>
        <v-checkbox
          color="primary"
          label="public"
          v-model="isPublic"
        ></v-checkbox>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="createNewSession()" color="primary" depressed
          >作成
        </v-btn>
        <v-btn @click="closeDialog()" color="primary" flat>
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

  async createNewSession(): void {
    const newSession: Session = await ApiV2.sessions.createSession({
      is_public: this.isPublic
    }).session
    console.log(newSession)
    this.$router.push({ path: `/sessions/${newSession.id}` })
  }
}
</script>

<style scoped></style>
