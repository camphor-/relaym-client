<template>
  <v-dialog :value="value" width="500" @input="input">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        再生デバイスの選択
      </v-card-title>

      <v-card-text>
        <device-list :items="playableDevices" @click-item="selectDevice" />
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="closeDialog()">
          キャンセル
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'
import DeviceList from '@/components/molecules/DeviceList.vue'
import { Device } from '@/api/v3/types'

@Component({
  components: { DeviceList },
  computed: {
    ...mapGetters('pages/sessions/detail', ['playableDevices'])
  },
  methods: {
    ...mapActions('pages/sessions/detail', ['fetchAvailableDevices'])
  }
})
export default class extends Vue {
  @Prop({ default: false }) readonly value!: boolean
  private fetchAvailableDevices!: () => void

  @Emit()
  input(isOpen: boolean) {
    return isOpen
  }

  @Watch('value', { immediate: true })
  onValueChange(val: boolean) {
    if (!val) return
    this.fetchAvailableDevices()
  }

  closeDialog() {
    this.input(false)
  }

  @Emit()
  selectDevice(device: Device) {
    this.closeDialog()
    return device
  }
}
</script>

<style lang="scss" scoped></style>
