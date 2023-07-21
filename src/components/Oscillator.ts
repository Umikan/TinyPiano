class KeyOscillator {
  context: AudioContext
  freq: number
  osc?: OscillatorNode
  gain: GainNode
  constructor(frequency: number, context: AudioContext) {
    this.context = context
    this.freq = frequency
    this.osc = undefined
    this.gain = this.context.createGain()
  }
  init() {
    this.osc = this.context.createOscillator()
    this.osc!.type = 'sine'
    this.osc!.frequency.setValueAtTime(this.freq, this.context.currentTime)
    this.gain.gain.setValueCurveAtTime([0, 0.2], this.context.currentTime, 0.02);
  }
  play() {
    this.init()
    this.osc!.connect(this.gain)
    this.gain.connect(this.context.destination)
    this.osc!.start(0)
  }
  release() {
    this.osc!.stop(this.context.currentTime + 0.1)
    this.gain.gain.setValueCurveAtTime([0.2, 0], this.context.currentTime, 0.1);
  }
}

const createOscillator = (octave: number, pitchname: number) => {
  const c3 = 261.63 / 2
  const freq = (octave + 1) * c3 * Math.pow(2, 1 + pitchname / 12)
  return (context: AudioContext) => { return new KeyOscillator(freq, context) }
}

export { KeyOscillator, createOscillator }
