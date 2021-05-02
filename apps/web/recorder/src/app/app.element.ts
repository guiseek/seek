import { Element, WebElement, clickToTarget, html } from '@web-seek/elements'

@Element('web-recorder')
export class WebRecorder extends WebElement {
  mimeType: string
  stream: MediaStream
  mediaRecorder: MediaRecorder
  recordedBlobs: Blob[] = []

  button: Record<'play' | 'start' | 'record' | 'download', HTMLButtonElement>
  video: Record<'recorder' | 'recorded', HTMLVideoElement>
  link: HTMLAnchorElement

  innerHTML = html`
    <main>
      <section>
        <video id="recorder" width="640" playsinline autoplay muted></video>
        <video id="recorded" playsinline loop></video>
      </section>
      <nav>
        <div>
          <button class="secondary" id="start">Start camera</button>
          <button class="primary" id="record" disabled>Start Recording</button>
        </div>
        <div>
          <button class="secondary" id="play" disabled>Play</button>
          <button class="primary" id="download" disabled>Download</button>
        </div>
      </nav>
      <a id="downlink" download></a>
      <output id="error-message"></output>
    </main>
  `

  constructor() {
    super()

    this.button = {
      play: this.querySelector('#play'),
      start: this.querySelector('#start'),
      record: this.querySelector('#record'),
      download: this.querySelector('#download'),
    }

    this.video = {
      recorder: this.querySelector('#recorder'),
      recorded: this.querySelector('#recorded'),
    }

    this.link = this.querySelector('#downlink')
  }

  connectedCallback() {
    this.button.play.onclick = this.onPlay.bind(this)
    this.button.start.onclick = this.onStart.bind(this)
    this.button.record.onclick = clickToTarget(this.onRecord.bind(this))
    this.button.download.onclick = this.onDownload.bind(this)
  }

  onStart() {
    const constraints = { video: { width: 1920, height: 1080 } }

    this.init(constraints).then((stream) => {
      this.stream = stream
      this.button.start.disabled = true
      this.button.record.disabled = false
      this.video.recorder.srcObject = stream
    })
  }

  onPlay() {
    const blob = new Blob(this.recordedBlobs, { type: this.mimeType })
    this.video.recorded.src = URL.createObjectURL(blob)
    this.video.recorded.controls = true
    this.video.recorded.play()
  }

  onRecord(button: HTMLButtonElement) {
    const { state } = this.mediaRecorder ?? {}

    if (state && state === 'recording') {
      this.mediaRecorder.stop()
      button.textContent = 'Start'
    } else {
      this.startRecording()
      button.textContent = 'Stop'
    }
  }

  onDownload() {
    const blob = new Blob(this.recordedBlobs, { type: this.mimeType })
    this.link.href = URL.createObjectURL(blob)
    this.link.download = 'video.webm'
    this.link.click()
  }

  // Core
  startRecording() {
    this.recordedBlobs = []

    const mimeTypes = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm',
    ]

    this.mimeType = mimeTypes.find((type) => {
      return MediaRecorder.isTypeSupported(type)
    })

    if (!this.mimeType) {
      console.error('MediaRecorder support')
    }

    try {
      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: this.mimeType,
      })

      this.mediaRecorder.ondataavailable = ({ data }: BlobEvent) => {
        if (data && data.size > 0) {
          this.recordedBlobs.push(data)
        }
      }

      this.mediaRecorder.start()

      this.mediaRecorder.onstop = () => {
        this.button.play.disabled = false
        this.button.download.disabled = false
      }
    } catch (err) {
      console.error('Exception while creating MediaRecorder:', err)
    }
  }

  init(constraints: MediaStreamConstraints) {
    try {
      return navigator.mediaDevices.getDisplayMedia(constraints)
    } catch (err) {
      alert(err)
    }
  }
}
