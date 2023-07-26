import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', err => {
  errorLogger.error('Uncaught exception is detected...', err)
  process.exit(1)
})

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`🛢️ Database is connected successfully`)

    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error(`Failed to connect database`, error)
  }

  process.on('unhandledRejection', err => {
    errorLogger.error('Unhandled rejection is detected...')
    if (server) {
      server.close(() => {
        errorLogger.error(err)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()

// process.on('SIGTERM', () => {
//   logger.info('SIGTERM is retrieved')
//   if (server) {
//     server.close()
//   }
// })
