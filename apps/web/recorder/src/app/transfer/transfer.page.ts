import { tmpl } from './transfer.tmpl'
import { style } from './transfer.style'
import { WebPage, WebPageConfig } from '../page'

const MAX_CHUNK_SIZE = 262144

@WebPageConfig('/transfer', 'transfer-page')
export class TransferPage extends WebPage {
  constructor() {
    super('style + tmpl', 'closed')
    this.innerHTML = style + tmpl
    // this.attachShadow({ mode: 'closed' })
  }

  localConnection: RTCPeerConnection
  remoteConnection: RTCPeerConnection
  sendChannel: RTCDataChannel
  receiveChannel: RTCDataChannel
  chunkSize: number
  lowWaterMark: number
  highWaterMark: number
  dataString: string
  timeoutHandle = null

  megsToSend: HTMLInputElement
  sendButton: HTMLButtonElement
  orderedCheckbox: HTMLInputElement
  sendProgress: HTMLProgressElement
  receiveProgress: HTMLProgressElement
  errorMessage: HTMLDivElement
  transferStatus: HTMLSpanElement

  bytesToSend = 0
  totalTimeUsedInSend = 0
  numberOfSendCalls = 0
  maxTimeUsedInSend = 0
  sendStartTime = 0
  currentThroughput = 0

  connectedCallback() {
    this.megsToSend = this.query('input#megsToSend')
    this.sendButton = this.query('button#sendTheData')
    this.orderedCheckbox = this.query('input#ordered')
    this.sendProgress = this.query('progress#sendProgress')
    this.receiveProgress = this.query('progress#receiveProgress')
    this.errorMessage = this.query('div#errorMsg')
    this.transferStatus = this.query('span#transferStatus')

    this.sendButton.addEventListener('click', this.createConnection)

    // Prevent data sent to be set to 0.
    this.megsToSend.addEventListener(
      'change',
      (evt: Event & { target: HTMLInputElement }) => {
        const number = +evt.target.value
        if (Number.isNaN(number)) {
          this.errorMessage.innerHTML = `Invalid value for MB to send: ${number}`
        } else if (number <= 0) {
          this.sendButton.disabled = true
          this.errorMessage.innerHTML =
            '<p>Please enter a number greater than zero.</p>'
        } else if (number > 64) {
          this.sendButton.disabled = true
          this.errorMessage.innerHTML =
            '<p>Please enter a number lower or equal than 64.</p>'
        } else {
          this.errorMessage.innerHTML = ''
          this.sendButton.disabled = false
        }
      }
    )
  }

  createConnection = async () => {
    this.sendButton.disabled = true
    this.megsToSend.disabled = true

    const servers = null

    const number = Number.parseInt(this.megsToSend.value)
    this.bytesToSend = number * 1024 * 1024

    this.localConnection = new RTCPeerConnection(servers)

    // Let's make a data channel!
    const dataChannelParams = { ordered: false }
    if (this.orderedCheckbox.checked) {
      dataChannelParams.ordered = true
    }
    this.sendChannel = this.localConnection.createDataChannel(
      'sendDataChannel',
      dataChannelParams
    )
    this.sendChannel.addEventListener('open', this.onSendChannelOpen)
    this.sendChannel.addEventListener('close', this.onSendChannelClosed)
    console.log('Created send data channel: ', this.sendChannel)

    console.log(
      'Created local peer connection object localConnection: ',
      this.localConnection
    )

    this.localConnection.addEventListener('icecandidate', (e) =>
      this.onIceCandidate(this.localConnection, e)
    )

    this.remoteConnection = new RTCPeerConnection(servers)
    this.remoteConnection.addEventListener('icecandidate', (e) =>
      this.onIceCandidate(this.remoteConnection, e)
    )
    this.remoteConnection.addEventListener(
      'datachannel',
      this.receiveChannelCallback
    )

    try {
      const localOffer = await this.localConnection.createOffer()
      await this.handleLocalDescription(localOffer)
    } catch (e) {
      console.error('Failed to create session description: ', e)
    }

    this.transferStatus.innerHTML = 'Peer connection setup complete.'
  }

  sendData() {
    // Stop scheduled timer if any (part of the workaround introduced below)
    if (this.timeoutHandle !== null) {
      clearTimeout(this.timeoutHandle)
      this.timeoutHandle = null
    }

    let bufferedAmount = this.sendChannel.bufferedAmount
    while (this.sendProgress.value < this.sendProgress.max) {
      this.transferStatus.innerText = 'Sending data...'
      const timeBefore = performance.now()
      this.sendChannel.send(this.dataString)
      const timeUsed = performance.now() - timeBefore
      if (timeUsed > this.maxTimeUsedInSend) {
        this.maxTimeUsedInSend = timeUsed
        this.totalTimeUsedInSend += timeUsed
      }
      this.numberOfSendCalls += 1
      bufferedAmount += this.chunkSize
      this.sendProgress.value += this.chunkSize

      // Pause sending if we reach the high water mark
      if (bufferedAmount >= this.highWaterMark) {
        // This is a workaround due to the bug that all browsers are incorrectly calculating the
        // amount of buffered data. Therefore, the 'bufferedamountlow' event would not fire.
        if (this.sendChannel.bufferedAmount < this.lowWaterMark) {
          this.timeoutHandle = setTimeout(() => this.sendData(), 0)
        }
        console.log(
          `Paused sending, buffered amount: ${bufferedAmount} (announced: ${this.sendChannel.bufferedAmount})`
        )
        break
      }
    }

    if (this.sendProgress.value === this.sendProgress.max) {
      this.transferStatus.innerHTML = 'Data transfer completed successfully!'
    }
  }

  startSendingData() {
    this.transferStatus.innerHTML = 'Start sending data.'
    this.sendProgress.max = this.bytesToSend
    this.receiveProgress.max = this.sendProgress.max
    this.sendProgress.value = 0
    this.receiveProgress.value = 0
    this.sendStartTime = performance.now()
    this.maxTimeUsedInSend = 0
    this.totalTimeUsedInSend = 0
    this.numberOfSendCalls = 0
    this.sendData()
  }

  maybeReset() {
    if (this.localConnection === null && this.remoteConnection === null) {
      this.sendButton.disabled = false
      this.megsToSend.disabled = false
    }
  }

  handleLocalDescription = async (desc: RTCSessionDescriptionInit) => {
    this.localConnection.setLocalDescription(desc)
    console.log('Offer from localConnection:\n', desc.sdp)
    this.remoteConnection.setRemoteDescription(desc)
    try {
      const remoteAnswer = await this.remoteConnection.createAnswer()
      this.handleRemoteAnswer(remoteAnswer)
    } catch (e) {
      console.error('Error when creating remote answer: ', e)
    }
  }

  handleRemoteAnswer(desc: RTCSessionDescriptionInit) {
    this.remoteConnection.setLocalDescription(desc)
    console.log('Answer from remoteConnection:\n', desc.sdp)
    this.localConnection.setRemoteDescription(desc)
  }

  getOtherPc(pc: RTCPeerConnection) {
    return pc === this.localConnection
      ? this.remoteConnection
      : this.localConnection
  }

  onIceCandidate = async (
    pc: RTCPeerConnection,
    event: RTCPeerConnectionIceEvent
  ) => {
    const candidate = event.candidate
    if (candidate === null) {
      return
    } // Ignore null candidates
    try {
      await this.getOtherPc(pc).addIceCandidate(candidate)
      console.log('AddIceCandidate successful: ', candidate)
    } catch (e) {
      console.error('Failed to add Ice Candidate: ', e)
    }
  }

  receiveChannelCallback = (event: RTCDataChannelEvent) => {
    console.log('Receive Channel Callback')
    this.receiveChannel = event.channel
    this.receiveChannel.binaryType = 'arraybuffer'
    this.receiveChannel.addEventListener('close', this.onReceiveChannelClosed)
    this.receiveChannel.addEventListener(
      'message',
      this.onReceiveMessageCallback
    )
  }

  onReceiveMessageCallback = (event: MessageEvent) => {
    this.receiveProgress.value += event.data.length
    this.currentThroughput =
      this.receiveProgress.value / (performance.now() - this.sendStartTime)
    console.log('Current Throughput is:', this.currentThroughput, 'bytes/sec')

    // Workaround for a bug in Chrome which prevents the closing event from being raised by the
    // remote side. Also a workaround for Firefox which does not send all pending data when closing
    // the channel.
    if (this.receiveProgress.value === this.receiveProgress.max) {
      this.sendChannel.close()
      this.receiveChannel.close()
    }
  }

  onSendChannelOpen = () => {
    console.log('Send channel is open')

    this.chunkSize = Math.min(
      this.localConnection.sctp.maxMessageSize,
      MAX_CHUNK_SIZE
    )
    console.log('Determined chunk size: ', this.chunkSize)
    this.dataString = new Array(this.chunkSize).fill('X').join('')
    this.lowWaterMark = this.chunkSize // A single chunk
    this.highWaterMark = Math.max(this.chunkSize * 8, 1048576) // 8 chunks or at least 1 MiB
    console.log('Send buffer low water threshold: ', this.lowWaterMark)
    console.log('Send buffer high water threshold: ', this.highWaterMark)
    this.sendChannel.bufferedAmountLowThreshold = this.lowWaterMark
    this.sendChannel.addEventListener('bufferedamountlow', (e) => {
      console.log('BufferedAmountLow event:', e)
      this.sendData()
    })

    this.startSendingData()
  }

  onSendChannelClosed = () => {
    console.log('Send channel is closed')
    this.localConnection.close()
    this.localConnection = null
    console.log('Closed local peer connection')
    this.maybeReset()
    console.log(
      'Average time spent in send() (ms): ' +
        this.totalTimeUsedInSend / this.numberOfSendCalls
    )
    console.log('Max time spent in send() (ms): ' + this.maxTimeUsedInSend)
    const spentTime = performance.now() - this.sendStartTime
    console.log('Total time spent: ' + spentTime)
    console.log('MBytes/Sec: ' + this.bytesToSend / 1000 / spentTime)
  }

  onReceiveChannelClosed = () => {
    console.log('Receive channel is closed')
    this.remoteConnection.close()
    this.remoteConnection = null
    console.log('Closed remote peer connection')
    this.maybeReset()
  }
}
