import 'jest'

import { waitFor } from '@testing-library/dom'

import { render } from './app'

jest.mock('./blockForInWebWorker.worker', () => {
  const actual = jest.requireActual('./blockForInWebWorker.worker')
  return () => ({ ...actual, terminate() {} })
})

let consoleLogSpy: jest.SpyInstance<
  ReturnType<typeof console.log>,
  Parameters<typeof console.log>
>

beforeEach(() => {
  consoleLogSpy = jest.spyOn(console, 'log')
})

afterEach(() => {
  consoleLogSpy.mockRestore()
})

test('[jest] test web workers', async () => {
  render({ infinite: false })

  const useWorker = document.getElementById('useWorker') as HTMLInputElement

  useWorker.checked = true

  await waitFor(
    () => {
      expect(consoleLogSpy).toHaveBeenCalledWith('Requesting Web Worker')
    },
    { timeout: 6000 }
  )

  await waitFor(
    () => {
      expect(consoleLogSpy).toHaveBeenCalledWith('Releasing Web Worker')
    },
    { timeout: 6000 }
  )
})
