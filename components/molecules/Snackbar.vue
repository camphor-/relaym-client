<template>
  <v-snackbar v-model="value" bottom :timeout="3000" :color="color">
    {{ message }}
    <v-btn color="white" flat @click="close">
      Close
    </v-btn>
  </v-snackbar>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapState, mapActions } from 'vuex'
import MessageType from '@/models/MessageType'

@Component({
  components: {},
  computed: {
    ...mapState('snackbar', ['isOpen', 'message', 'messageType'])
  },
  methods: {
    ...mapActions('snackbar', ['showSnackbar', 'closeSnackbar'])
  }
})
export default class Snackbar extends Vue {
  messageType!: MessageType
  message!: string
  isOpen!: boolean
  showSnackbar: () => void
  closeSnackbar: () => void

  value = false

  // 3000ms後にstoreでも閉じた状態にする
  @Watch('value')
  timeSpent() {
    if (this.value) return
    this.closeSnackbar()
  }

  // storeの状態と同期
  @Watch('isOpen')
  syncValue() {
    this.value = this.isOpen
  }

  get color() {
    return this.messageType === MessageType.info ? 'primary' : 'error'
  }
}
</script>
<style lang="scss" scoped></style>
