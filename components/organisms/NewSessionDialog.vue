<template>
  <v-dialog :value="value" width="500" @input="input">
    <v-card>
      <v-card-title>New Session</v-card-title>
      <v-card-text>
        <v-checkbox label="public" color="primary"></v-checkbox>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" depressed>作成</v-btn>
        <v-btn color="primary" flat @click="closeDialog()">
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

  @Emit()
  input(isOpen: boolean) {
    return isOpen
  }

  closeDialog() {
    this.input(false)
  }
}
</script>

<style scoped></style>
