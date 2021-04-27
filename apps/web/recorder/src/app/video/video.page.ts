import { WebPageConfig, WebPage } from '../page'
import { style } from './video.style'
import { tmpl } from './video.tmpl'

@WebPageConfig('/video', 'video-page')
export class VideoPage extends WebPage {
  stream: MediaStream

  mediaRecorder: MediaRecorder
  recordedBlobs: Blob[]

  errorMsgElement: HTMLSpanElement
  recordedVideo: HTMLVideoElement
  recordButton: HTMLButtonElement

  playButton: HTMLButtonElement
  downloadButton: HTMLButtonElement

  constructor() {
    super(style + tmpl)
  }

  connectedCallback() {
    this.errorMsgElement = this.query('span#errorMsg')
    this.recordedVideo = this.query('video#recorded')
    this.recordButton = this.query('button#record')

    console.log(this.recordButton)

    this.query('button#start').addEventListener('click', async () => {
      const constraints = {
        video: {
          width: 1280,
          height: 720,
        },
      }
      console.log('Using media constraints:', constraints)
      await this.init(constraints)
    })

    this.recordButton.addEventListener('click', () => {
      if (this.recordButton.textContent === 'Start Recording') {
        this.startRecording()
      } else {
        this.stopRecording()
        this.recordButton.textContent = 'Start Recording'
        this.playButton.disabled = false
        this.downloadButton.disabled = false
      }
    })

    this.playButton = this.query('button#play')
    this.playButton.addEventListener('click', () => {
      const superBuffer = new Blob(this.recordedBlobs, { type: 'video/webm' })
      this.recordedVideo.src = null
      this.recordedVideo.srcObject = null
      this.recordedVideo.src = window.URL.createObjectURL(superBuffer)
      this.recordedVideo.controls = true
      this.recordedVideo.play()
    })

    this.downloadButton = this.query('button#download')
    this.downloadButton.addEventListener('click', () => {
      const blob = new Blob(this.recordedBlobs, { type: 'video/webm' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = 'test.webm'
      document.body.appendChild(a)
      a.click()
      setTimeout(() => {
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      }, 100)
    })
  }

  handleDataAvailable = (event: BlobEvent) => {
    console.log('handleDataAvailable', event)
    if (event.data && event.data.size > 0) {
      this.recordedBlobs.push(event.data)
    }
  }

  startRecording() {
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
      this.errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(
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
    this.recordButton.textContent = 'Stop Recording'
    this.playButton.disabled = true
    this.downloadButton.disabled = true
    this.mediaRecorder.onstop = (event) => {
      console.log('Recorder stopped: ', event)
      console.log('Recorded Blobs: ', this.recordedBlobs)
    }
    this.mediaRecorder.ondataavailable = this.handleDataAvailable
    this.mediaRecorder.start()
    console.log('MediaRecorder started', this.mediaRecorder)
  }

  stopRecording = () => {
    this.mediaRecorder.stop()
  }

  handleSuccess(stream) {
    this.recordButton.disabled = false
    console.log('getUserMedia() got stream:', stream)
    this.stream = stream

    const gumVideo = this.query<HTMLVideoElement>('video#gum')
    gumVideo.srcObject = stream
  }

  async init(constraints: Pick<MediaStreamConstraints, 'video' | 'audio'>) {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia(constraints)
      this.handleSuccess(stream)
    } catch (e) {
      console.error('navigator.getUserMedia error:', e)
      this.errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`
    }
  }
}
