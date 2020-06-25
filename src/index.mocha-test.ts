import { render } from './index'

it('test', async function () {
  // @ts-ignore `this` is a Mocha context
  this.timeout(8000)

  render()

  const useWorker = document.getElementById('useWorker') as HTMLInputElement

  useWorker.checked = true

  await new Promise((r) => setTimeout(r, 6100))
})
