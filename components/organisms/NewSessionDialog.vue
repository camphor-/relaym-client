<template>
  <v-dialog :value="value" width="500" @input="input">
    <v-card>
      <v-card-title>New Session</v-card-title>
      <v-card-text>
        <v-text-field v-model="sessionName" label="セッション名" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :disabled="sessionName === ''"
          depressed
          @click="createSession()"
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

@Component({})
export default class extends Vue {
  @Prop({ default: false }) readonly value!: boolean

  private sessionName: string = ''

  @Emit()
  input(isOpen: boolean) {
    return isOpen
  }

  closeDialog() {
    this.input(false)
  }

  @Emit()
  createSession() {
    return { name: this.sessionName }
  }
}
</script>

<style scoped></style>
