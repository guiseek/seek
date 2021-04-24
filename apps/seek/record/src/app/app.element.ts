import { Element, html, OnConnect } from '@guiseek/web-core'
import { VideoElement } from './elements'
import { errorMessage } from './common'
import './app.element.scss'

const title = 'seek-record'

@Element({
  selector: 'seek-root',
  template: html`
    <section>
      <!-- <video is="seek-video"></video> -->
      <video id="gum" playsinline autoplay muted></video>
      <video id="recorded" playsinline loop></video>
    </section>

    <nav>
      <button id="start">Start camera</button>
      <button id="record" disabled>Start</button>
      <button id="play" disabled>Play</button>
      <button id="download" disabled>Download</button>
    </nav>

    <form>
      <h4>Media Stream Constraints options</h4>
      <label
        >Echo cancellation: <input type="checkbox" id="echoCancellation"
      /></label>
    </form>

    <!-- <button id="startButton" disabled>Start</button> -->
  `,
})
export class AppElement extends HTMLElement implements OnConnect {
  mediaRecorder: MediaRecorder
  recordedBlobs: Blob[]

  error: HTMLSpanElement
  recorded: VideoElement

  // Buttons
  start: HTMLButtonElement
  record: HTMLButtonElement
  play: HTMLButtonElement
  download: HTMLButtonElement

  stream: MediaStream

  onConnect(): void {
    this.error = this.querySelector('#error')
    this.recorded = this.querySelector('#recorded')
    this.record = this.querySelector('#record')

    this.record.onclick = (ev: MouseEvent) => {
      if (this.record.textContent === 'Start') {
        // Start
        this.startRecording()
      } else {
        // Stop
        this.stopRecording()
        this.record.textContent = 'Start'
        this.play.disabled = false
        this.download.disabled = false
      }
    }

    this.play = this.querySelector('#play')
    this.play.onclick = () => {
      const superBuffer = new Blob(this.recordedBlobs, { type: 'video/webm' })
      this.recorded.src = null
      this.recorded.srcObject = null
      this.recorded.src = URL.createObjectURL(superBuffer)
      this.recorded.controls = true
      this.recorded.play()
    }

    this.download = this.querySelector('#download')
    this.download.onclick = () => {
      const blob = new Blob(this.recordedBlobs, { type: 'video/webm' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = 'video.webm'
      this.appendChild(a)
      a.click()
      setTimeout(() => {
        a.remove()
        URL.revokeObjectURL(url)
      }, 100)
    }

    this.start = this.querySelector('#start')
    this.start.onclick = async () => {
      console.log(this.mediaRecorder)

      const hasEchoCancellation = this.querySelector<HTMLInputElement>(
        '#echoCancellation'
      ).checked
      const constraints = {
        audio: {
          echoCancellation: { exact: hasEchoCancellation },
        },
        video: {
          width: 1280,
          height: 720,
        },
      }
      this.init(constraints)
    }
  }

  stopRecording = () => {
    this.mediaRecorder.stop()
  }

  startRecording = () => {
    this.recordedBlobs = []
    let options = { mimeType: 'video/webm;codecs=vp9,opus' }
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.error(`${options.mimeType} is not supported`)
      options = { mimeType: 'video/webm;codecs=vp8,opus' }
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error(`${options.mimeType} is not supported`)
        options = { mimeType: 'video/webm' }
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          console.error(`${options.mimeType} is not supported`)
          options = { mimeType: '' }
        }
      }
    }

    try {
      this.mediaRecorder = new MediaRecorder(this.stream, options)
    } catch (e) {
      console.error('Exception while creating MediaRecorder:', e)
      this.error.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(
        e
      )}`
      return
    }

    console.log(
      'Created MediaRecorder',
      this.mediaRecorder,
      'with options',
      options
    )
    this.record.textContent = 'Stop'
    this.play.disabled = true
    this.download.disabled = true
    this.mediaRecorder.onstop = (event) => {
      console.log('Recorder stopped: ', event)
      console.log('Recorded Blobs: ', this.recordedBlobs)
    }
    this.mediaRecorder.ondataavailable = this.handleDataAvailable
    this.mediaRecorder.start()
    console.log('MediaRecorder started', this.mediaRecorder)
  }

  handleDataAvailable = (event: BlobEvent) => {
    console.log('handleDataAvailable', event)
    if (event.data && event.data.size > 0) {
      this.recordedBlobs.push(event.data)
    }
  }

  handleSuccess(stream: MediaStream) {
    this.record.disabled = false
    this.stream = stream

    const gumVideo = this.querySelector<HTMLVideoElement>('#gum')
    gumVideo.srcObject = stream
  }

  async init(constraints: MediaStreamConstraints) {
    try {
      this.handleSuccess(
        await navigator.mediaDevices.getDisplayMedia({ video: true })
      )
    } catch (err) {
      this.error.innerHTML = `navigator.getUserMedia error:${err.toString()}`
    }
  }
}
