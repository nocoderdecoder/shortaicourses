import type { NextRequest } from 'next/server'

export async function readLimitedJson(req: NextRequest, limit: number): Promise<{ kind: 'ok'; value: unknown } | { kind: 'invalid' } | { kind: 'large' }> {
  const reader = req.body?.getReader()
  if (!reader) return { kind: 'invalid' }
  try {
    let bytes = 0
    const chunks: Uint8Array[] = []
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      bytes += value.byteLength
      if (bytes > limit) {
        await reader.cancel()
        return { kind: 'large' }
      }
      chunks.push(value)
    }
    return { kind: 'ok', value: JSON.parse(Buffer.concat(chunks).toString('utf8')) }
  } catch { return { kind: 'invalid' } }
  finally { reader.releaseLock() }
}

export async function readLimitedResponse(response: Response, limit: number): Promise<unknown> {
  const reader = response.body?.getReader()
  if (!reader) throw new Error('Empty provider response')
  try {
    let bytes = 0
    const chunks: Uint8Array[] = []
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      bytes += value.byteLength
      if (bytes > limit) {
        await reader.cancel()
        throw new Error('Oversized provider response')
      }
      chunks.push(value)
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } finally { reader.releaseLock() }
}
