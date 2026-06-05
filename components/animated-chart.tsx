"use client"

import { useEffect, useRef, useState } from "react"

interface DataPoint {
  value: number
  timestamp: number
}

export function AnimatedChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const dataRef = useRef<DataPoint[]>([])
  const animationRef = useRef<number>()
  const [isVisible, setIsVisible] = useState(false)
  const [currentValue, setCurrentValue] = useState(45)
  const [growth, setGrowth] = useState(0)

  // Initialize data
  useEffect(() => {
    const initialData: DataPoint[] = []
    const now = Date.now()
    for (let i = 0; i < 50; i++) {
      initialData.push({
        value: 30 + Math.random() * 30 + (i * 0.5),
        timestamp: now - (50 - i) * 500
      })
    }
    dataRef.current = initialData
  }, [])

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Main animation loop
  useEffect(() => {
    if (!isVisible) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const goldColor = { r: 200, g: 169, b: 107 }
    let lastDataUpdate = Date.now()

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      ctx.clearRect(0, 0, width, height)

      const now = Date.now()

      // Add new data point every 500ms
      if (now - lastDataUpdate > 500) {
        const lastValue = dataRef.current[dataRef.current.length - 1]?.value || 50
        const change = (Math.random() - 0.3) * 8 // Bias toward growth
        const newValue = Math.max(20, Math.min(95, lastValue + change))
        
        dataRef.current.push({ value: newValue, timestamp: now })
        
        // Keep only last 50 points
        if (dataRef.current.length > 50) {
          dataRef.current.shift()
        }
        
        lastDataUpdate = now
        setCurrentValue(Math.round(newValue * 10) / 10)
        
        const firstValue = dataRef.current[0]?.value || 0
        setGrowth(Math.round((newValue - firstValue) * 10) / 10)
      }

      const data = dataRef.current
      if (data.length < 2) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const padding = { top: 20, right: 20, bottom: 30, left: 50 }
      const chartWidth = width - padding.left - padding.right
      const chartHeight = height - padding.top - padding.bottom

      // Draw grid
      ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, 0.1)`
      ctx.lineWidth = 1
      for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartHeight / 4) * i
        ctx.beginPath()
        ctx.moveTo(padding.left, y)
        ctx.lineTo(width - padding.right, y)
        ctx.stroke()
      }

      // Y-axis labels
      ctx.fillStyle = `rgba(138, 138, 138, 0.8)`
      ctx.font = "11px sans-serif"
      ctx.textAlign = "right"
      for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartHeight / 4) * i
        const label = Math.round(100 - (i * 25))
        ctx.fillText(`${label}%`, padding.left - 8, y + 4)
      }

      // Calculate points with smooth interpolation
      const timeRange = data[data.length - 1].timestamp - data[0].timestamp
      const points: { x: number; y: number }[] = []

      data.forEach((point) => {
        const timePct = (point.timestamp - data[0].timestamp) / timeRange
        const x = padding.left + timePct * chartWidth
        const y = padding.top + chartHeight - (point.value / 100) * chartHeight
        points.push({ x, y })
      })

      // Draw area gradient
      const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom)
      gradient.addColorStop(0, `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, 0.4)`)
      gradient.addColorStop(1, `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, 0)`)

      ctx.beginPath()
      ctx.moveTo(points[0].x, height - padding.bottom)
      points.forEach((point) => ctx.lineTo(point.x, point.y))
      ctx.lineTo(points[points.length - 1].x, height - padding.bottom)
      ctx.closePath()
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw line with glow
      ctx.shadowColor = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, 0.5)`
      ctx.shadowBlur = 10
      ctx.strokeStyle = `rgb(${goldColor.r}, ${goldColor.g}, ${goldColor.b})`
      ctx.lineWidth = 2
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      ctx.beginPath()
      points.forEach((point, i) => {
        if (i === 0) ctx.moveTo(point.x, point.y)
        else ctx.lineTo(point.x, point.y)
      })
      ctx.stroke()
      ctx.shadowBlur = 0

      // Draw last point with pulse effect
      const lastPoint = points[points.length - 1]
      const pulseSize = 4 + Math.sin(now / 200) * 2

      // Outer pulse
      ctx.beginPath()
      ctx.arc(lastPoint.x, lastPoint.y, pulseSize + 6, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${0.1 + Math.sin(now / 200) * 0.1})`
      ctx.fill()

      // Inner point
      ctx.beginPath()
      ctx.arc(lastPoint.x, lastPoint.y, pulseSize, 0, Math.PI * 2)
      ctx.fillStyle = `rgb(${goldColor.r}, ${goldColor.g}, ${goldColor.b})`
      ctx.fill()

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isVisible])

  return (
    <div ref={containerRef} className="w-full h-80 relative bg-card/50 rounded-xl border border-border overflow-hidden">
      {/* Live indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-xs text-green-500 font-medium tracking-wider">LIVE</span>
      </div>

      {/* Current value tooltip */}
      <div className="absolute top-4 left-4 bg-secondary/80 backdrop-blur-sm rounded-lg px-4 py-3 border border-border z-10">
        <div className="text-xs text-muted-foreground mb-1">Performance</div>
        <div className="text-3xl font-bold text-primary tabular-nums">
          {currentValue}%
        </div>
        <div className={`text-xs flex items-center gap-1 ${growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {growth >= 0 ? (
              <path d="M18 15l-6-6-6 6" />
            ) : (
              <path d="M6 9l6 6 6-6" />
            )}
          </svg>
          {growth >= 0 ? '+' : ''}{growth}% periodo
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />

      {/* X-axis time labels */}
      <div className="absolute bottom-2 left-12 right-4 flex justify-between text-xs text-muted-foreground">
        <span>-25s</span>
        <span>-20s</span>
        <span>-15s</span>
        <span>-10s</span>
        <span>-5s</span>
        <span className="text-primary font-medium">Agora</span>
      </div>
    </div>
  )
}
