import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Short AI Courses — Free practical AI for business professionals'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#ffffff',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{
            background: '#2563EB',
            color: '#fff',
            fontSize: '13px',
            fontWeight: 700,
            padding: '6px 14px',
            borderRadius: '20px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            Free · No signup required
          </div>
        </div>
        <div style={{
          fontSize: '64px',
          fontWeight: 800,
          color: '#111827',
          lineHeight: 1.1,
          marginBottom: '24px',
          letterSpacing: '-0.03em',
        }}>
          Short AI Courses
        </div>
        <div style={{
          fontSize: '28px',
          color: '#4B5563',
          lineHeight: 1.4,
          maxWidth: '800px',
        }}>
          Practical AI education for business professionals. Finish a full course in under 40 minutes.
        </div>
        <div style={{
          marginTop: '48px',
          fontSize: '18px',
          color: '#2563EB',
          fontWeight: 600,
        }}>
          shortaicourses.com
        </div>
      </div>
    ),
    { ...size }
  )
}
