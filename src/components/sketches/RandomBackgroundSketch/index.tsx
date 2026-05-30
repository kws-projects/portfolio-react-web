import { useState } from 'react'
import DotGridSketch from '@/components/sketches/DotGridSketch'
import WaveLineSketch from '@/components/sketches/WaveLineSketch'
import ConstellationSketch from '@/components/sketches/ConstellationSketch'

const sketches = [DotGridSketch, WaveLineSketch, ConstellationSketch]

const RandomBackgroundSketch = () => {
  const [Sketch] = useState(
     
    () => sketches[Math.floor(Math.random() * sketches.length)]
  )

  return <Sketch />
}

export default RandomBackgroundSketch
