'use client'

import { useState } from 'react'

export function EmailForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p style={{ fontSize: '15px', color: 'var(--green)', fontWeight: 600 }}>
        You're in. We'll let you know when new courses drop.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', maxWidth: '400px', margin: '0 auto' }}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        style={{
          flex: 1,
          padding: '10px 14px',
          borderRadius: '7px',
          border: '1px solid var(--border)',
          background: 'var(--bg)',
          color: 'var(--text)',
          fontSize: '14px',
          outline: 'none',
          fontFamily: 'inherit',
        }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          padding: '10px 20px',
          background: 'var(--accent)',
          color: '#fff',
          borderRadius: '7px',
          border: 'none',
          fontWeight: 600,
          fontSize: '14px',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit',
          whiteSpace: 'nowrap',
          opacity: status === 'loading' ? 0.7 : 1,
        }}
      >
        {status === 'loading' ? 'Saving...' : 'Notify me'}
      </button>
      {status === 'error' && (
        <p style={{ fontSize: '13px', color: 'red', marginTop: '8px', width: '100%' }}>
          Something went wrong. Try again.
        </p>
      )}
    </form>
  )
}
