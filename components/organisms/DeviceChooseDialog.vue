<template>
  <v-dialog v-model="isOpen" width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        再生デバイスの選択
      </v-card-title>

      <v-card-text>
        <device-list :items="getPlayableDevices" @click-item="selectDevice" />
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
import { mapGetters, mapActions } from 'vuex'
import DeviceList from '@/components/molecules/DeviceList.vue'
import Device from '@/models/Device'

@Component({
  components: { DeviceList },
  computed: {
    ...mapGetters('devices', ['getPlayableDevices']),
    isOpen: {
      // getter 関数
      get: function() {
        // eslint-disable-next-line
        return this.value
      },
      // setter 関数
      set: function(newValue) {
        this.input(newValue)
      }
    }
  },
  methods: {
    ...mapActions('devices', ['fetchAvailableDevices'])
  }
})
export default class extends Vue {
  @Prop({ default: false }) readonly value!: boolean
  private fetchAvailableDevices: () => void

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
