<template>
  <v-snackbar v-model="showSnackbar" bottom :timeout="3000" color="primary">
    {{ text }}
    <v-btn color="white" flat @click="showSnackbar = false">
      Close
    </v-btn>
  </v-snackbar>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class Snackbar extends Vue {
  @Prop({ default: '' }) readonly text!: string
  @Prop({ default: false }) value!: boolean

  showSnackbar = false

  @Watch('value')
  onChangeValue() {
    if (!this.value) return
    this.showSnackbar = true
  }

  @Watch('showSnackbar')
  onChangeShowSnackbar() {
    if (this.showSnackbar) return
    this.input(false)
  }

  @Emit()
  input(isOpen: boolean) {
    return isOpen
  }
}
</script>
<style lang="scss" scoped></style>
