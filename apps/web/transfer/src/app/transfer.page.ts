import { WebPage, WebPageConfig } from './core/page'
import { style } from './transfer.style'
import { tmpl } from './transfer.tmpl'

const MAX_CHUNK_SIZE = 262144

@WebPageConfig('/', 'transfer-page')
export class TransferPage extends WebPage {
  constructor() {
    super(style + tmpl, 'closed')
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

    // Impede que os dados enviados sejam definidos como 0.
    this.megsToSend.addEventListener(
      'change',
      (evt: Event & { target: HTMLInputElement }) => {
        const number = +evt.target.value
        if (Number.isNaN(number)) {
          this.errorMessage.innerHTML = `Valor inválido de MB para enviar: ${number}`
        } else if (number <= 0) {
          this.sendButton.disabled = true
          this.errorMessage.innerHTML =
            '<p>Insira um número maior que zero.</p>'
        } else if (number > 64) {
          this.sendButton.disabled = true
          this.errorMessage.innerHTML =
            '<p>Insira um número menor ou igual a 64.</p>'
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
      console.error('Falha ao criar SDP: ', e)
    }

    this.transferStatus.innerHTML = 'Configuração de conexão do par concluída.'
  }

  sendData() {
    // Para o cronômetro programado, se houver
    // (parte da solução alternativa apresentada a seguir)
    if (this.timeoutHandle !== null) {
      clearTimeout(this.timeoutHandle)
      this.timeoutHandle = null
    }

    let bufferedAmount = this.sendChannel.bufferedAmount
    while (this.sendProgress.value < this.sendProgress.max) {
      this.transferStatus.innerText = 'Enviando dados...'
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

      // Pausa o envio se atingirmos a marca alta limite
      if (bufferedAmount >= this.highWaterMark) {
        // Esta é uma solução alternativa devido ao bug que todos os navegadores estão calculando incorretamente
        // a quantidade de dados em buffer. Portanto, o evento 'bufferedamountlow' não seria disparado.
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
      this.transferStatus.innerHTML =
        'Transferência de dados concluída com sucesso!'
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
    console.log('Oferta da conexão local:\n', desc.sdp)
    this.remoteConnection.setRemoteDescription(desc)
    try {
      const remoteAnswer = await this.remoteConnection.createAnswer()
      this.handleRemoteAnswer(remoteAnswer)
    } catch (e) {
      console.error('Erro ao criar resposta remota: ', e)
    }
  }

  handleRemoteAnswer(desc: RTCSessionDescriptionInit) {
    this.remoteConnection.setLocalDescription(desc)
    console.log('Resposta da conexão remota:\n', desc.sdp)
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
    // Ignora candidatos nulos
    if (candidate === null) {
      return
    }
    try {
      await this.getOtherPc(pc).addIceCandidate(candidate)
      console.log('IceCandidate adicionado com sucesso: ', candidate)
    } catch (e) {
      console.error('Falha ao adicionar Candidato de Gelo: ', e)
    }
  }

  receiveChannelCallback = (event: RTCDataChannelEvent) => {
    console.log('Receber retorno de chamada do canal')
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
    console.log(
      'A taxa de transferência atual é:',
      this.currentThroughput,
      'bytes/sec'
    )

    // Solução alternativa para um bug no Chrome que evita que o evento de fechamento seja gerado pelo lado remoto.
    // Também é uma solução alternativa para o Firefox que não envia todos os dados pendentes ao fechar o canal.
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
    console.log('Tamanho determinado pra cada pedaço: ', this.chunkSize)

    this.dataString = new Array(this.chunkSize).fill('X').join('')
    this.lowWaterMark = this.chunkSize // Um único pedaço
    this.highWaterMark = Math.max(this.chunkSize * 8, 1048576) // 8 pedaços ou pelo menos 1 MiB

    console.log('Buffer baixo limite: ', this.lowWaterMark)
    console.log('Buffer alto limite: ', this.highWaterMark)

    this.sendChannel.bufferedAmountLowThreshold = this.lowWaterMark
    this.sendChannel.addEventListener('bufferedamountlow', (e) => {
      console.log('Evento BufferedAmountLow:', e)
      this.sendData()
    })

    this.startSendingData()
  }

  onSendChannelClosed = () => {
    console.log('O canal de envio está fechado')
    this.localConnection.close()
    this.localConnection = null
    console.log('Conexão de ponto local fechada')
    this.maybeReset()
    console.log(
      'Tempo médio gasto no envio () (ms): ' +
        this.totalTimeUsedInSend / this.numberOfSendCalls
    )
    console.log(
      'Tempo máximo gasto no envio () (ms): ' + this.maxTimeUsedInSend
    )
    const spentTime = performance.now() - this.sendStartTime
    console.log('Tempo total gasto: ' + spentTime)
    console.log('MBytes/Sec: ' + this.bytesToSend / 1000 / spentTime)
  }

  onReceiveChannelClosed = () => {
    console.log('O canal de recepção está fechado')
    this.remoteConnection.close()
    this.remoteConnection = null
    console.log('Conexão de peer remoto fechada')
    this.maybeReset()
  }
}
