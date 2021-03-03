<template>
  <div class="wrap">
    4234234
    {{val}}
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'app',
  setup() {
    const val = ref(123)
    return {
      val
    }
  }
}
</script>

<style>

</style>
