import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'

const Bird = dynamic(() => import('../components/Bird'), { ssr: false })

const Birds = ({type}) => {
    const x = 0
    const y = 0
    const z = 0
    const bird = type
    let speed = 1
    let factor = 1

    return (
      <Bird
        position={[x, y, z]}
        rotation={[0, 0, 0]}
        speed={speed}
        factor={factor}
        url={`/glb/${bird}.glb`}
      />
    )

}

const BirdsPage = (props) => {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={2} />
        <pointLight position={[40, 40, 40]} />
        <OrbitControls />
        <Suspense fallback={null}>
          <Birds type="car"/>
        </Suspense>
      </Canvas>
    </>
  )
}

export default BirdsPage
