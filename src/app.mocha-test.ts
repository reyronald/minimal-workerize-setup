import sinon from 'sinon'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import { Context } from 'mocha'

import { render } from './app'

chai.use(sinonChai)

let consoleLogSpy: sinon.SinonSpy<
  Parameters<typeof console['log']>,
  ReturnType<typeof console['log']>
>

beforeEach(() => {
  consoleLogSpy = sinon.spy(console, 'log')
})

afterEach(() => {
  consoleLogSpy.restore()
})

it('[mocha] test web workers', async function (this: Context) {
  this.timeout(10000)

  render({ infinite: false })

  const useWorker = document.getElementById('useWorker') as HTMLInputElement

  useWorker.checked = true

  await waitFor(() => {
    expect(consoleLogSpy).to.be.calledWith('Requesting Web Worker')
  })

  await waitFor(() => {
    expect(consoleLogSpy).to.be.calledWith('Releasing Web Worker')
  })
})

async function waitFor(cb: Function, timeout = 6000) {
  const start = Date.now()

  return new Promise((resolve, reject) => {
    void (function check() {
      try {
        cb()
        resolve()
      } catch (error) {
        if (Date.now() - start > timeout) {
          reject(error)
        } else {
          setImmediate(check)
        }
      }
    })()
  })
}
