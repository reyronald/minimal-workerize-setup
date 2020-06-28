import { createWorkerizeInstance, Workerized } from './createWorkerizeInstance'

// @ts-ignore This is going through the `workerize-loader`
import blockForInWebWorkerFactory from './blockForInWebWorker.worker'
import * as blockForInWebWorkerFns from './blockForInWebWorker.worker'

export type BlockForWorkerType = Workerized<typeof blockForInWebWorkerFns>

const createBlockForWorkerInstance = (): BlockForWorkerType =>
  createWorkerizeInstance<typeof blockForInWebWorkerFns>(
    blockForInWebWorkerFactory
  )

let instance: BlockForWorkerType
let instanceCreated = false
let consumers = 0

const requestInstance = () => {
  if (!instanceCreated) {
    instance = createBlockForWorkerInstance()
    instanceCreated = true
  }

  consumers++
}

const releaseInstance = () => {
  if (--consumers === 0) {
    instance.terminate()
    instanceCreated = false
  }
}

const getBlockForWorkerInstance = () => instance

export function blockForWorkerManager(): [
  () => void,
  () => void,
  () => BlockForWorkerType
] {
  return [requestInstance, releaseInstance, getBlockForWorkerInstance]
}
