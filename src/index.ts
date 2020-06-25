import { blockForWorkerManager } from './blockForWorkerManager'
import { blockFor } from './blockFor'

import './styles.css'

// TODO add readme
// TODO add repo link, workerize link, blog post link in both readme and index.ts
// TODO jest test setup
// TODO mocha test setup
// TODO clean tsconfig
// TODO add author to packagejson
// TODO tests: use mocks/sinons to make sure the web worker is being called successfully

export function render() {
  const element = document.createElement('main')

  element.innerHTML = `
    <h1>Web Worker demo with webpack + workerize</h1>

    <p>
      The box below is rotated using a JavaScript loop that runs on the main thread.
      When we call a long running, blocking operation on the main thread, we will notice
      that the box stops rotating because the thread is busy doing that expensive work.
    </p>

    <p>
      If we pass that long running operation to a web worker instead, the box rotation never
      stops because the work is happening in a separate thread that does not block any UI.
    </p>

    <label>
      <input id="useWorker" type="checkbox"> Use web worker
    </label>

    <div id="box" class="box"></div>
  `

  document.body.appendChild(element)

  startDemo()
}

function startDemo() {
  const frameDuration = 17
  const blockDuration = 2000
  const blockInterval = 4000

  const box = document.getElementById('box') as HTMLDivElement
  const useWorker = document.getElementById('useWorker') as HTMLInputElement

  void (function rotate(deg = 0) {
    requestAnimationFrame(() => {
      box.style.transform = `rotate(${deg}deg)`
      rotate(deg + 1)
    })
  })()

  void (function interval() {
    setTimeout(() => {
      const info = document.createElement('p')
      info.textContent = useWorker.checked
        ? `Calling long running operation using a web worker`
        : `Calling long running operation on the Main Thread`

      document.body.appendChild(info)

      setTimeout(async () => {
        if (useWorker.checked) {
          const [
            requestInstance,
            releaseInstance,
            getBlockForWorkerInstance,
          ] = blockForWorkerManager()
          console.log('Requesting Web Worker')
          requestInstance()
          const worker = getBlockForWorkerInstance()
          await worker.blockForInWebWorker(blockDuration)
          releaseInstance()
          console.log('Releasing Web Worker')
        } else {
          blockFor(blockDuration)
        }
        info.remove()
        interval()
      }, frameDuration)
    }, blockInterval)
  })()
}

render()
