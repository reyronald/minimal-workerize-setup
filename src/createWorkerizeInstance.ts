type AnyFunction = (...args: any[]) => any
type AsyncFunction = (...args: any[]) => Promise<any>

export type Workerized<T> = Worker &
  {
    [K in keyof T]: T[K] extends AsyncFunction
      ? T[K]
      : T[K] extends AnyFunction
      ? (...args: Parameters<T[K]>) => Promise<ReturnType<T[K]>>
      : never
  }

export function createWorkerizeInstance<T>(
  workerizeFactory: any
): Workerized<T> {
  return workerizeFactory() as Workerized<T>
}
