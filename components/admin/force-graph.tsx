"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import dynamic from "next/dynamic"
import * as THREE from "three"

// Import is done dynamically to avoid SSR issues with window/document
const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), { ssr: false })

export default function BrainGraph({ 
  graphData, 
  onNodeClick 
}: { 
  graphData: any, 
  onNodeClick: (node: any) => void 
}) {
  const fgRef = useRef<any>()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="w-full h-full flex items-center justify-center">Carregando Cérebro...</div>

  return (
    <div className="w-full h-full relative cursor-crosshair">
      <ForceGraph3D
        ref={fgRef}
        graphData={graphData}
        nodeThreeObject={(node: any) => {
          let color = '#a855f7'
          switch(node.group_type) {
            case 'Ideia': color = '#eab308'; break;
            case 'Projeto': color = '#3b82f6'; break;
            case 'Aprendizado': color = '#10b981'; break;
          }
          
          const size = node.id === graphData.nodes[0]?.id ? 8 : 4; // Hub is bigger
          
          const geometry = new THREE.SphereGeometry(size, 32, 32);
          const material = new THREE.MeshStandardMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 0.6,
            roughness: 0.1,
            metalness: 0.8,
            transparent: true,
            opacity: 0.9
          });
          
          const sphere = new THREE.Mesh(geometry, material);
          return sphere;
        }}
        nodeLabel="title"
        linkColor={() => 'rgba(255,255,255,0.15)'}
        linkWidth={1}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={1.5}
        linkDirectionalParticleSpeed={0.005}
        backgroundColor="#000000"
        onNodeClick={onNodeClick}
        enableNodeDrag={false}
        onEngineStop={() => {
          if (fgRef.current) {
            fgRef.current.zoomToFit(400)
          }
        }}
      />
    </div>
  )
}
