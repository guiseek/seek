/**
 * Selective Forwarding Unit Experiments
 * @see
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { webConsumer, webBroadcast } from './app/app'
import * as express from 'express'
import * as cors from 'cors'
const app = express()

app.use(cors({ origin: '*' }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/**
 * Route endpoints
 */
app.post('/api/web-consumer', webConsumer)

app.post('/api/web-broadcast', webBroadcast)

/**
 * Create server instance
 */
const port = process.env.port || 3000
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`)
})

server.on('error', console.error)
