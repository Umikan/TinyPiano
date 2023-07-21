<script setup lang="ts">
import Key from './Key.vue'
import { ref } from 'vue'

const whitekeys = [0, 2, 4, 5, 7, 9, 11]
const blackkeys = [1, 3, -1, 6, 8, 10]

const wkeyMapping = 'asdfghj'
const bkeyMapping = 'we-tyu'
const whiteKeyState = ref(Array(7).fill(false))
const blackKeyState = ref(Array(7).fill(false))

const keyEvent = (value: boolean) => (e: KeyboardEvent) => {
  var idx: number = wkeyMapping.indexOf(e.key)
  if (idx != -1) {
    whiteKeyState.value[idx] = value
    return
  }

  idx = bkeyMapping.indexOf(e.key)
  if (idx != -1) {
    blackKeyState.value[idx] = value
    return
  }
}

const onKeyDown = keyEvent(true)
const onKeyUp = keyEvent(false)
</script>

<style scoped>
.black {
  position: relative;
  top: -200px;
  left: 28px;
  z-index: 1;
}
</style>
<template>
  <div class="flex" tabindex="0" @keydown="onKeyDown" @keyup="onKeyUp">
    <div class="flex-initial" v-for="octave in 1">
      <div class="flex">
        <Key
          class="flex-initial"
          v-for="(key, index) in whitekeys"
          :is-pressed="whiteKeyState[index]"
          color="white"
          :pitch="octave * 12 + key"
          visible=""
        />
      </div>
      <div class="flex black gap-x-[6px]">
        <Key
          class="flex-initial"
          v-for="(key, index) in blackkeys"
          :is-pressed="blackKeyState[index]"
          color="black"
          :pitch="octave * 12 + key"
          :visible="key == -1 ? 'invisible' : ''"
        />
      </div>
    </div>
  </div>
</template>
