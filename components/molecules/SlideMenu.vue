<template>
  <v-navigation-drawer :value="value" @input="input" absolute temporary>
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
      </v-list-item-avatar>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class extends Vue {
  @Prop({ default: false }) readonly value!: boolean

  @Emit()
  input(isOpen: boolean) {
    return isOpen
  }
}
</script>

<style lang="scss" scoped></style>
