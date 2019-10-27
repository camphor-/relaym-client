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

  @Watch('value')
  timeSpent() {
    if (this.value) return
    this.close()
  }

  close() {
    this.closeSnackbar()
  }

  @Watch('isOpen')
  open() {
    if (!this.isOpen) return
    this.value = true
  }

  get color() {
    return this.messageType === MessageType.info ? 'primary' : 'error'
  }
}
</script>
<style lang="scss" scoped></style>
