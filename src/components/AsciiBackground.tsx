import { useRef, useEffect, useCallback } from 'react'

const ASCII_CHARS = ' .:-=+*#%@'
const FONT_SIZE = 14
const LINE_HEIGHT = FONT_SIZE
const MAX_DIST = 250
const MAX_DIST_SQ = MAX_DIST * MAX_DIST

export default function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const pinballRef = useRef<{ vx: number; vy: number } | null>(null)
  const animFrameRef = useRef<number>(0)
  const wasEmptyRef = useRef(true)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      animFrameRef.current = requestAnimationFrame(draw)
      return
    }

    const { width, height } = canvas

    if (pinballRef.current) {
      let { x, y } = mouseRef.current
      const v = pinballRef.current
      x += v.vx
      y += v.vy
      if (x <= 0) {
        x = 0
        v.vx = Math.abs(v.vx)
      } else if (x >= width) {
        x = width
        v.vx = -Math.abs(v.vx)
      }
      if (y <= 0) {
        y = 0
        v.vy = Math.abs(v.vy)
      } else if (y >= height) {
        y = height
        v.vy = -Math.abs(v.vy)
      }
      mouseRef.current = { x, y }
    }

    const mx = mouseRef.current.x
    const my = mouseRef.current.y

    // Early exit: mouse is too far off-screen for any cell to be lit
    if (
      mx < -MAX_DIST ||
      mx > width + MAX_DIST ||
      my < -MAX_DIST ||
      my > height + MAX_DIST
    ) {
      if (!wasEmptyRef.current) {
        ctx.clearRect(0, 0, width, height)
        wasEmptyRef.current = true
      }
      animFrameRef.current = requestAnimationFrame(draw)
      return
    }

    const cols = Math.floor(width / (FONT_SIZE * 0.6))
    const rows = Math.floor(height / LINE_HEIGHT)

    ctx.clearRect(0, 0, width, height)
    ctx.font = `${FONT_SIZE}px monospace`
    ctx.textBaseline = 'top'

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * FONT_SIZE * 0.6
        const y = row * LINE_HEIGHT

        const dx = x - mx
        const dy = y - my
        const distSq = dx * dx + dy * dy

        if (distSq >= MAX_DIST_SQ) continue

        const intensity = 1 - Math.sqrt(distSq) / MAX_DIST
        const charIndex = Math.floor(intensity * (ASCII_CHARS.length - 1))

        if (charIndex === 0) continue

        const alpha = intensity * 0.12
        ctx.fillStyle = `rgba(17, 17, 17, ${alpha})`
        ctx.fillText(ASCII_CHARS[charIndex], x, y)
      }
    }

    wasEmptyRef.current = false
    animFrameRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const isHoverDevice = window.matchMedia('(hover: hover)').matches

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      if (pinballRef.current) {
        mouseRef.current.x = Math.min(mouseRef.current.x, canvas.width - 1)
        mouseRef.current.y = Math.min(mouseRef.current.y, canvas.height - 1)
      }
    }

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    const handleVisibility = () => {
      cancelAnimationFrame(animFrameRef.current)
      if (!document.hidden) {
        animFrameRef.current = requestAnimationFrame(draw)
      }
    }

    resize()

    if (isHoverDevice) {
      window.addEventListener('mousemove', handleMouse)
      window.addEventListener('mouseout', handleLeave)
    } else {
      pinballRef.current = { vx: 2.3, vy: 1.7 }
      mouseRef.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      }
    }

    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', handleVisibility)

    animFrameRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('mouseout', handleLeave)
      document.removeEventListener('visibilitychange', handleVisibility)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
