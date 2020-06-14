import { render } from './index'

jest.mock('./blockForInWebWorker.worker', () => {
  const actual = jest.requireActual('./blockForInWebWorker.worker')
  return () => ({ ...actual, terminate() {} })
})

test('1', () => {
  render()
  console.log(document.body.innerHTML)
})
