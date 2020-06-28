import { blockForWorkerManager } from './blockForWorkerManager'
import { blockFor } from './blockFor'

import './styles.css'

export function render({ infinite }: { infinite: boolean }) {
  document.title = 'Workerize + Webpack demo'

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

    <p>
      See <a href="https://github.com/reyronald/minimal-workerize-setup">source</a>.
    </p>

    <p>
      — <a href="https://github.com/reyronald">Ronald Rey</a>
    </p>

    <label>
      <input id="useWorker" type="checkbox"> Use web worker
    </label>

    <div id="box" class="box"></div>
  `

  document.body.appendChild(element)

  startDemo({ infinite })
}

function startDemo({ infinite }: { infinite: boolean }) {
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
          console.log('Releasing Web Worker')
          releaseInstance()
        } else {
          blockFor(blockDuration)
        }
        info.remove()
        if (infinite) {
          interval()
        }
      }, frameDuration)
    }, blockInterval)
  })()
}
