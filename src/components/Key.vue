<script setup lang="ts">
import { toRefs, computed } from 'vue'

const props = defineProps<{
  color: string
  visible: string
  isPressed: boolean
  letter: string
}>()

const { isPressed } = toRefs(props)
const pressed = computed(() => {
  return isPressed.value ? 'pressed' : ''
})
</script>

<template>
  <div :class="visible">
    <div :class="[color, pressed]"></div>
    <div class="letter text-gray-400">{{ letter }}</div>
  </div>
</template>

<style scoped>
@tailwind components;
@layer components {
  .key {
    @apply border-[5px] border-black box-border duration-100 bg-gradient-to-b rounded-md rounded-t-sm;
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

.letter {
  position: relative;
  top: -30px;
  left: 40%;
  margin-bottom: -24px;
  z-index: 1;
}
</style>
