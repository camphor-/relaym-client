<template>
  <v-snackbar
    :value="value"
    bottom
    :timeout="3000"
    :color="color"
    @input="input"
  >
    {{ text }}
    <v-btn color="white" flat @click="input">
      Close
    </v-btn>
  </v-snackbar>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import MessageType from '@/models/MessageType'

@Component({
  components: {}
})
export default class extends Vue {
  @Prop({ default: '' }) readonly text!: string
  @Prop({ default: false }) value!: boolean
  @Prop({ default: MessageType.info }) type!: MessageType

  get color() {
    return this.type === MessageType.info ? 'primary' : 'error'
  }

  @Emit()
  input() {
    return false
  }
}
</script>
<style lang="scss" scoped></style>
