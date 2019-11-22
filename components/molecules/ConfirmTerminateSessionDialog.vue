<template>
  <v-dialog :value="value" width="600" @input="input">
    <v-card>
      <v-card-title class="headline"
        >え、もうセッション終了しちゃっていいの?</v-card-title
      >
      <v-card-text>
        セッションを終了すると誰も曲を追加できなくなります。これまでに再生された曲のリストは削除されません。
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="nickel" flat @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" flat @click="onClickDelete">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class extends Vue {
  @Prop({ default: false }) readonly value!: boolean

  @Emit()
  input(newValue) {
    return newValue
  }

  closeDialog() {
    this.input(false)
  }

  @Emit()
  onClickDelete() {
    this.closeDialog()
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  text-align: center;
}
</style>
