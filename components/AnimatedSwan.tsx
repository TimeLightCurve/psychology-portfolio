'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { MotionValue } from 'motion/react'
import * as THREE from 'three'
import { PaperSwan } from './PaperSwan'

interface Props {
  scrollProgress: MotionValue<number>
  startPosition?: [number, number, number]
}

export function AnimatedSwan({ scrollProgress, startPosition = [0, 0, 0] }: Props) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    const group = groupRef.current
    if (!group) return

    const t = scrollProgress.get() // 0 → 1, spring-smoothed

    // Vortex: spin around Y while spiraling outward + receding from camera
    const angle = t * Math.PI * 6        // 3 full rotations
    const spiralRadius = t * 2.8         // growing radius of the spiral
    const recession = t * 12             // how far back it flies

    group.position.x = startPosition[0] + Math.sin(angle) * spiralRadius
    group.position.y = startPosition[1] + Math.cos(angle) * spiralRadius * 0.45
    group.position.z = startPosition[2] - recession

    group.rotation.y = angle
    group.rotation.x = t * Math.PI * 0.4
    group.rotation.z = Math.sin(angle * 0.5) * 0.3
  })

  return (
    <group ref={groupRef}>
      <PaperSwan />
    </group>
  )
}
