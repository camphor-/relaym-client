<template>
  <v-list>
    <v-list-tile
      v-for="item in items"
      :key="item.id"
      avatar
      @click="clickItem(item)"
    >
      <v-list-tile-avatar>
        <v-icon class="grey lighten-1 white--text">devices</v-icon>
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title v-text="item.name"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { Device } from '@/api/v3/types'

@Component({
  components: {}
})
export default class extends Vue {
  @Prop({ default: [] }) readonly items!: Device[]

  @Emit()
  clickItem(item: Device) {
    return item
  }
}
</script>

<style lang="scss" scoped></style>
