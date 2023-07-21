<script setup lang="ts">
import Key from './Key.vue'
import { ref, onMounted } from 'vue'
// import { KeyOscillator, createOscillator } from './Oscillator'
import { fetchSound, createKey } from './Sampler'

const octaves = ref(3)
const whitekeys = [0, 2, 4, 5, 7, 9, 11]
const blackkeys = [1, 3, -1, 6, 8, 10]

const wkeyMapping = 'zxcvbnmwertyuiop'
const wkeyMapping2 = '||||||q,./'
const bkeyMapping = 'sd|ghj34|6780'
const bkeyMapping2 = '|||||1l;'
const whiteKeyState = ref(Array(7 * octaves.value).fill(false))
const blackKeyState = ref(Array(6 * octaves.value).fill(false))
const holding = ref(false)

const wkeyOsc = ref<any[]>([])
const bkeyOsc = ref<any[]>([])

const createKeys = (context: AudioContext, data: any) => {
  for (var octave = 0; octave < octaves.value; octave++) {
    whitekeys.map((pitch: number) => {
      //const osc = createOscillator(octave, pitch)(context)
      const node = createKey(octave, pitch)(context, data)
      wkeyOsc.value.push(node)
    })
    blackkeys.map((pitch: number) => {
      //const osc = createOscillator(octave, pitch)(context)
      const node = createKey(octave, pitch)(context, data)
      bkeyOsc.value.push(node)
    })
  }
}

const keyEvent = (value: boolean) => (e: KeyboardEvent) => {
  if (e.code == "Space") {
    holding.value = value
  }
  var idx: number = wkeyMapping.indexOf(e.key)
  if (idx == -1) {
    idx = wkeyMapping2.indexOf(e.key)
  }
  if (idx != -1) {
    if (value == whiteKeyState.value[idx]) return
    whiteKeyState.value[idx] = value

    if (value) wkeyOsc.value[idx].play()
    else if (!holding.value) wkeyOsc.value[idx].release()
    return
  }

  idx = bkeyMapping.indexOf(e.key)
  if (idx == -1) {
    idx = bkeyMapping2.indexOf(e.key)
  }
  if (idx != -1) {
    if (idx == 2) return
    if (value == blackKeyState.value[idx]) return
    blackKeyState.value[idx] = value
    if (value) bkeyOsc.value[idx].play()
    else if (!holding.value) bkeyOsc.value[idx].release()
    return
  }
}

const onKeyDown = keyEvent(true)
const onKeyUp = keyEvent(false)

onMounted(() => {
  const context = new window.AudioContext()
  fetchSound(context, './Kawai-K5000W-MusicBox-C5.wav').then((data) => {
    createKeys(context, data)
  })
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)
})
</script>

<style scoped>
.black {
  position: relative;
  top: -200px;
  margin-bottom: -130px;
  left: 28px;
  z-index: 1;
}

.keyboard{ 
  filter:invert(7%);
}
</style>
<template>
  <div class="flex keyboard">
    <div class="flex-initial" v-for="octave in octaves">
      <div class="flex">
        <span v-for="(key, index) in whitekeys">
          <Key
            class="flex-initial"
            :is-pressed="whiteKeyState[(octave - 1) * 7 + index]"
            color="white"
            visible=""
            v-if="!(octave > 2 && index > 1)"
            :letter="wkeyMapping[(octave - 1) * 7 + index]"
          />
        </span>
      </div>
      <div class="flex black gap-x-[6px]">
        <span v-for="(key, index) in blackkeys">
          <Key
            class="flex-initial"
            :is-pressed="blackKeyState[(octave - 1) * 6 + index]"
            color="black"
            :visible="key == -1 ? 'invisible' : ''"
            v-if="!(octave > 2 && index > 0)"
            :letter="bkeyMapping[(octave - 1) * 6 + index]"
          />
        </span>
      </div>
    </div>
  </div>
</template>
