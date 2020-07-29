<template>
  <v-dialog :value="value" width="500" @input="input">
    <v-card>
      <v-card-title>New Session</v-card-title>
      <v-card-text>
        <v-text-field v-model="sessionName" label="セッション名" />
        <v-switch
          v-model="allowToControlByOthers"
          label="他の人に再生/一時停止を許可"
        />
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
  private allowToControlByOthers: boolean = false

  @Emit()
  input(isOpen: boolean) {
    return isOpen
  }

  closeDialog() {
    this.input(false)
  }

  @Emit()
  createSession() {
    return {
      name: this.sessionName,
      allowToControlByOthers: this.allowToControlByOthers
    }
  }
}
</script>

<style scoped></style>
