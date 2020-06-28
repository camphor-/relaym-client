<template>
  <v-snackbar
    :value="isOpen"
    bottom
    :timeout="3000"
    :color="color"
    @input="setIsOpen"
  >
    {{ message }}
    <v-btn color="white" flat @click="closeSnackbar">
      Close
    </v-btn>
  </v-snackbar>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapState, mapActions } from 'vuex'
import { MessageType } from '@/store/snackbar'

@Component({
  components: {},
  computed: {
    ...mapState('snackbar', ['isOpen', 'message', 'messageType'])
  },
  methods: {
    ...mapActions('snackbar', ['closeSnackbar', 'setIsOpen'])
  }
})
export default class Snackbar extends Vue {
  messageType!: MessageType
  message!: string
  isOpen!: boolean
  closeSnackbar!: () => void
  value = false

  // 3000ms後にstoreでも閉じた状態にする
  @Watch('value')
  timeSpent() {
    if (this.value) return
    this.closeSnackbar()
  }

  get color() {
    return this.messageType === MessageType.info ? 'primary' : 'error'
  }
}
</script>
<style lang="scss" scoped></style>
