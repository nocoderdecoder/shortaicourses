'use client'

import { useEffect, useRef } from 'react'

export function LessonBody({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // Find every <p> that contains only a <code> block (block-level prompt templates)
    const paragraphs = ref.current.querySelectorAll('p')
    paragraphs.forEach(p => {
      const children = Array.from(p.childNodes).filter(
        n => !(n.nodeType === Node.TEXT_NODE && n.textContent?.trim() === '')
      )
      if (children.length !== 1 || children[0].nodeName !== 'CODE') return

      const code = children[0] as HTMLElement
      const text = code.textContent ?? ''

      // Upgrade the <p> to a block template box
      p.style.cssText = ''
      p.classList.add('prompt-block')

      // Wrap code content in a pre-like block
      const pre = document.createElement('div')
      pre.className = 'prompt-text'
      pre.textContent = text
      code.replaceWith(pre)

      // Copy button
      const btn = document.createElement('button')
      btn.className = 'prompt-copy'
      btn.textContent = 'Copy'
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(text).then(() => {
          btn.textContent = 'Copied!'
          setTimeout(() => { btn.textContent = 'Copy' }, 2000)
        })
      })

      p.appendChild(btn)
    })
  }, [html])

  return (
    <div
      ref={ref}
      className="lesson-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
