import { MessageType } from '@/models/MessageType'
<template>
  <v-snackbar v-model="showSnackbar" bottom timeout="3000" :color="color">
    {{ text }}
    <v-btn color="white" flat @click="snackbar = false">
      Close
    </v-btn>
  </v-snackbar>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import MessageType from '@/models/MessageType'

@Component({
  components: {}
})
export default class extends Vue {
  @Prop({ default: '' }) readonly text!: string
  @Prop({ default: false }) showSnackbar!: boolean
  @Prop({ default: MessageType.info }) type!: MessageType

  get color() {
    return this.type === MessageType.info ? 'primary' : 'error'
  }
}
</script>
<style lang="scss" scoped></style>
