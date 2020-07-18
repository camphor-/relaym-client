<template>
  <div class="seekbar">
    <span class="progress">{{ progress | timeFormat }}</span>
    <v-progress-linear class="progress-bar" :value="progressPercent" />
    <span class="length">{{ length | timeFormat }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'Seekbar',
  filters: {
    timeFormat(val) {
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

  get progressPercent() {
    if (this.length === 0) return 0
    return (this.progress / this.length) * 100
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
