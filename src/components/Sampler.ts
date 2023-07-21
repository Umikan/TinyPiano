class SamplerKey {
  context: AudioContext
  speed: number
  source?: AudioBufferSourceNode
  dryNode: GainNode
  wetNode: GainNode
  feedbackNode: GainNode
  masterNode: GainNode
  delayNode: DelayNode
  maxGain: number
  data: any
  constructor(data: any, speed: number, context: AudioContext) {
    this.context = context
    this.speed = speed
    this.data = data
    this.maxGain = 0.85

    // Create Nodes
    this.dryNode = context.createGain()
    this.wetNode = context.createGain()
    this.feedbackNode = context.createGain()
    this.delayNode = context.createDelay()
    this.masterNode = context.createGain()

    // Reverb Parameters
    this.delayNode.delayTime.value = 0.37
    this.dryNode.gain.value = 0.5
    this.wetNode.gain.value = 0.1
    this.feedbackNode.gain.value = 0.8
  }
  init() {
    this.source = this.context.createBufferSource()
    this.source.playbackRate.value = this.speed
    this.source.buffer = this.data

    this.source.connect(this.delayNode)
    this.source.connect(this.dryNode)
    this.delayNode.connect(this.wetNode)
    this.delayNode.connect(this.feedbackNode)
    this.feedbackNode.connect(this.delayNode)
    this.dryNode.connect(this.masterNode)
    this.wetNode.connect(this.masterNode)
    this.masterNode.connect(this.context.destination)
  }
  play() {
    this.init()
    this.masterNode.gain.setValueAtTime(this.maxGain, this.context.currentTime)
    this.source!.start(0)
  }
  release() {
    this.masterNode.gain.setValueCurveAtTime([this.maxGain, 0], this.context.currentTime, 0.1)
    this.source!.stop(this.context.currentTime + 0.1)
  }
}

const createKey = (octave: number, pitchname: number) => {
  const speed = (Math.pow(2, octave) / 4) * Math.pow(2, 1 + pitchname / 12)
  return (context: AudioContext, data: any) => {
    return new SamplerKey(data, speed, context)
  }
}

const fetchSound = async (context: AudioContext, filename: string) => {
  return await fetch(filename)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`)
      }
      return response.arrayBuffer()
    })
    .then((arrayBuffer) => {
      return context.decodeAudioData(arrayBuffer).then((data) => {
        return data
      })
    })
}

export { fetchSound, createKey, SamplerKey }
