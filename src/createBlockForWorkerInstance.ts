import { createWorkerizeInstance } from './createWorkerizeInstance'

// @ts-ignore This is goign through the `workerize-loader`
import blockForInWebWorkerFactory from './blockForInWebWorker.worker'
import * as blockForInWebWorkerFns from './blockForInWebWorker.worker'

export const createBlockForWorkerInstance = () =>
  createWorkerizeInstance<typeof blockForInWebWorkerFns>(
    blockForInWebWorkerFactory
  )
