export function blockFor(timeMs: number) {
  // block for half a second to demonstrate asynchronicity
  const start = Date.now()
  while (Date.now() - start < timeMs) {}
}
