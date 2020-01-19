<template>
  <div class="seekbar">
    <span class="progress">{{ estimateProgress | timeFormat }}</span>
    <v-progress-linear class="progress-bar" :value="progressPercent" />
    <span class="length">{{ length | timeFormat }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'Seekbar',
  components: {},
  computed: {
    progressPercent() {
      if (this.length === 0) return 0
      return (this.estimateProgress / this.length) * 100
    }
  },
  filters: {
    timeFormat: function(val) {
      const lengthSec = Math.round(val / 1000)
      const min = Math.floor(lengthSec / 60)
      const sec = lengthSec % 60
      return `${min}:${`0${sec}`.slice(-2)}`
    }
  }
})
export default class extends Vue {
  @Prop({ required: true }) readonly length!: number
  @Prop({ required: true }) readonly progress!: number
  @Prop({ required: true }) readonly remaining!: number

  progressTimer: number | null = null
  estimateProgress = 0

  @Watch('progress')
  onProgressChanged(val: number) {
    this.estimateProgress = val
    this.setProgressTimer()
  }

  destroyed() {
    if (this.progressTimer) clearInterval(this.progressTimer)
  }

  setProgressTimer() {
    if (this.progressTimer) clearInterval(this.progressTimer)
    this.progressTimer = window.setInterval(
      () => (this.estimateProgress += 1000),
      1000
    )
  }
}
</script>

<style lang="scss" scoped>
.seekbar {
  display: flex;
  flex-direction: row;
  align-items: center;

  .progress,
  .length {
    color: #707070;
    font-size: 0.8rem;
  }
  .progress {
    margin-right: 8px;
  }
  .length {
    margin-left: 8px;
  }
  .progress-bar {
    flex-grow: 1;
    margin: 0;
  }
}
</style>
