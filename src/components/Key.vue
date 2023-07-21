<script setup lang="ts">
import { toRefs, computed } from 'vue'

const props = defineProps<{
  pitch: number
  color: string
  visible: string
  isPressed: boolean
}>()

const { isPressed } = toRefs(props)
const pressed = computed(() => {
  return isPressed.value ? 'pressed' : ''
})
</script>

<template>
  <div :class="visible">
    <div :class="[color, pressed]"></div>
  </div>
</template>

<style scoped>
@tailwind components;
@layer components {
  .key {
    @apply border-4 border-black box-border duration-100 bg-gradient-to-b;
  }
}

.black {
  @apply key w-[44px] h-[130px];
  @apply from-black via-black to-gray-700;
}

.white {
  @apply key w-[50px] h-[200px];
  @apply from-white via-white to-gray-200;
}

.pressed {
  @apply brightness-200;
}
</style>
