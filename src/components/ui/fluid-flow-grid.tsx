"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface FluidFlowGridProps extends React.ComponentProps<"div"> {
  /** Distance between flow vectors in CSS pixels. */
  spacing?: number
  /** Resting vector color as an "r, g, b" triplet. */
  color?: string
  /** Vector color near the pointer as an "r, g, b" triplet. */
  accent?: string
  /** Radius of the pointer force field in CSS pixels. */
  reach?: number
  /** Overall flow speed multiplier. */
  speed?: number
  /** Frame-rate cap. Lower it on phones to save battery. */
  fps?: number
  /** React to the mouse / finger. */
  interactive?: boolean
}

/**
 * FluidFlowGrid — a field of short vectors that drift like a current and bend away from the pointer.
 * The canvas is transparent and sized to its container, so it works as a section background.
 * It pauses off-screen and in hidden tabs, and draws one still frame under `prefers-reduced-motion`.
 * Children render above the field.
 */
export function FluidFlowGrid({
  spacing = 35,
  color = "0, 108, 73",
  accent = "14, 165, 233",
  reach = 220,
  speed = 1,
  fps = 60,
  interactive = true,
  className,
  children,
  ref,
  ...rest
}: FluidFlowGridProps) {
  const hostRef = React.useRef<HTMLDivElement | null>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  // The loop reads props through a ref so knob changes apply without restarting it.
  const opts = React.useRef({ spacing, color, accent, reach, speed, fps, interactive })
  opts.current = { spacing, color, accent, reach, speed, fps, interactive }

  const setHost = React.useCallback(
    (node: HTMLDivElement | null) => {
      hostRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  React.useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const OFF = -10000
    const mouse = { x: OFF, y: OFF, tx: OFF, ty: OFF }
    const ALPHA_STEPS = 6
    let width = 0
    let height = 0
    let raf = 0
    let visible = true
    let time = 0
    let last = 0

    const resize = () => {
      const rect = host.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0) // absolute, so repeated resizes never compound
      draw()
    }

    const draw = () => {
      const o = opts.current
      ctx.clearRect(0, 0, width, height)
      ctx.lineWidth = 1.4
      ctx.lineCap = "round"

      const cols = Math.ceil(width / o.spacing) + 1
      const rows = Math.ceil(height / o.spacing) + 1
      const offX = (width - (cols - 1) * o.spacing) / 2
      const offY = (height - (rows - 1) * o.spacing) / 2

      // Batch every resting vector into a few alpha buckets and the near-pointer ones into one path.
      const buckets: number[][] = Array.from({ length: ALPHA_STEPS }, () => [])
      const near: number[] = []

      for (let i = 0; i < cols; i++) {
        const x = offX + i * o.spacing
        for (let j = 0; j < rows; j++) {
          const y = offY + j * o.spacing
          let angle = Math.sin(x * 0.003 + time) + Math.cos(y * 0.003 + time)

          const dx = mouse.x - x
          const dy = mouse.y - y
          const dist = Math.hypot(dx, dy)
          if (dist < o.reach && dist > 0) {
            const push = Math.atan2(dy, dx) + Math.PI
            const force = 1 - dist / o.reach
            angle = angle * (1 - force) + push * force
            const len = 14 + 10 * force
            near.push(x, y, x + Math.cos(angle) * len, y + Math.sin(angle) * len)
          } else {
            const a = 0.2 + Math.sin(x * 0.01 + y * 0.01 + time) * 0.1 // 0.1 – 0.3
            const b = Math.min(ALPHA_STEPS - 1, Math.max(0, Math.floor(((a - 0.1) / 0.2) * ALPHA_STEPS)))
            buckets[b]!.push(x, y, x + Math.cos(angle) * 14, y + Math.sin(angle) * 14)
          }
        }
      }

      const stroke = (segments: number[]) => {
        ctx.beginPath()
        for (let k = 0; k < segments.length; k += 4) {
          ctx.moveTo(segments[k]!, segments[k + 1]!)
          ctx.lineTo(segments[k + 2]!, segments[k + 3]!)
        }
        ctx.stroke()
      }

      buckets.forEach((segments, b) => {
        if (!segments.length) return
        ctx.strokeStyle = `rgba(${o.color}, ${0.14 + ((b + 0.5) / ALPHA_STEPS) * 0.22})`
        stroke(segments)
      })
      if (near.length) {
        ctx.strokeStyle = `rgba(${o.accent}, 0.55)`
        stroke(near)
      }
    }

    const tick = (now: number) => {
      raf = 0
      if (!visible || document.hidden) return
      const interval = 1000 / Math.max(1, opts.current.fps)
      if (now - last >= interval - 1) {
        time += 0.008 * opts.current.speed
        mouse.x += (mouse.tx - mouse.x) * 0.1
        mouse.y += (mouse.ty - mouse.y) * 0.1
        last = now
        draw()
      }
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (reduceMotion.matches) {
        draw() // one calm still frame
        return
      }
      if (!raf) raf = requestAnimationFrame(tick)
    }
    // The first frame is drawn immediately; the animation loop waits for the browser to be idle so it never competes with first paint.
    const startWhenIdle = () => {
      const run = () => start()
      if ("requestIdleCallback" in window) window.requestIdleCallback(run, { timeout: 1500 })
      else globalThis.setTimeout(run, 400)
    }

    const point = (e: PointerEvent) => {
      if (!opts.current.interactive || reduceMotion.matches) return
      const rect = host.getBoundingClientRect()
      mouse.tx = e.clientX - rect.left
      mouse.ty = e.clientY - rect.top
      if (mouse.x === OFF) {
        mouse.x = mouse.tx
        mouse.y = mouse.ty
      }
    }
    const release = () => {
      mouse.tx = OFF
      mouse.ty = OFF
      mouse.x = OFF
      mouse.y = OFF
    }
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") release()
    }
    const onVisibility = () => {
      if (!document.hidden) start()
    }

    const ro = new ResizeObserver(resize)
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true
        if (visible) start()
      },
      { threshold: 0 }
    )

    resize()
    ro.observe(host)
    io.observe(host)
    host.addEventListener("pointermove", point)
    host.addEventListener("pointerdown", point)
    host.addEventListener("pointerleave", release)
    host.addEventListener("pointercancel", release)
    host.addEventListener("pointerup", onUp)
    document.addEventListener("visibilitychange", onVisibility)
    reduceMotion.addEventListener("change", start)
    startWhenIdle()

    return () => {
      ro.disconnect()
      io.disconnect()
      host.removeEventListener("pointermove", point)
      host.removeEventListener("pointerdown", point)
      host.removeEventListener("pointerleave", release)
      host.removeEventListener("pointercancel", release)
      host.removeEventListener("pointerup", onUp)
      document.removeEventListener("visibilitychange", onVisibility)
      reduceMotion.removeEventListener("change", start)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={setHost}
      data-slot="fluid-flow-grid"
      className={cn("relative isolate overflow-hidden", className)}
      {...rest}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 size-full" />
      {children}
    </div>
  )
}

export default FluidFlowGrid
