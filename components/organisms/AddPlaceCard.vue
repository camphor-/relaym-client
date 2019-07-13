<template>
  <v-card class="new_place">
    <v-card-title>
      <span class="card_title">新しい場所を追加する</span>
    </v-card-title>
    <v-form>
      <v-text-field label="place id"></v-text-field>
      <v-text-field label="Name"></v-text-field>
      <div class="text-xs-right">
        <v-btn round color="#0D47A1" class="white_text">追加</v-btn>
      </div>
    </v-form>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.card_title {
  font-size: 1.5rem;
}

.new_place {
  margin-bottom: 20px;
  padding: 1rem;
}
</style>
