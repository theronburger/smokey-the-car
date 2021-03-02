import dynamic from 'next/dynamic'
import { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'
import AudioPlayer from 'react-h5-audio-player'
import styles from '../styles/Home.module.css'
import Head from 'next/head'


const CarPart = dynamic(() => import('../components/CarPart'), { ssr: false })
const Car = ({url, part, draggable, color, setOrbitActive, playSoundfunction}) => {
    const x = 0
    const y = 0
    const z = 0
    let speed = 1
    let factor = 1
    return (
      <CarPart
        position={[x, y, z]}
        rotation={[0, 0, 0]}
        speed={speed}
        factor={factor}
        part={part}
        url={`/glb/${url}.glb`}
        draggable = {draggable}
        setOrbitActive = {setOrbitActive}
        color = {color}
        playSoundfunction = {playSoundfunction}
      />
    )
}

const UnusedAudioPlayer = () => {
  useEffect(() => {
    window.addEventListener('touchstart', () => {
      playSoundfunction()
      setAudioMuted(true)
    })
  })
  const [audioMuted, setAudioMuted] = useState(true)
  const player = useRef();
  const playSoundfunction = () => {
    console.log("playfunction")
    player.current.audio.current.play();
  }
  return (
    <AudioPlayer
      id="AudioPlayer"
      src="/mixkit-cartoon-falling-whistle-395.flac"
      onPlay={e => console.log("onPlay")}
      ref={player}
      showSkipControls={false}
      showJumpControls={false}
      showDownloadProgress={false}
      showFilledProgress={false}
      muted={audioMuted}
    />
  )
}

const CarPage = (props) => {
  const [orbitActive, setOrbitActive] = useState(true)
  return (
    <>
      <h1>Smokey the Car gets an upgrade!</h1>

      <Canvas camera={{ position: [0, 100, 500] }}>

        <ambientLight intensity={0.7} />
        <pointLight position={[40, 40, 40]} />
        { orbitActive ? <OrbitControls /> : "" }
        <Suspense fallback={null}>
          <Car url="car" part="car_body" setOrbitActive={setOrbitActive} color="hotpink"/>
          <Car url="car" part="wheel1" setOrbitActive={setOrbitActive} color="#1E1E1E"/>
          <Car url="car" part="wheel2" setOrbitActive={setOrbitActive}color="#1E1E1E"/>
          <Car url="car" part="wheel3" setOrbitActive={setOrbitActive}color="#1E1E1E"/>
          <Car url="car" part="wheel4" setOrbitActive={setOrbitActive}color="#1E1E1E"/>
          <Car url="car" part="bad_bits" draggable="true" setOrbitActive={setOrbitActive}/>
        </Suspense>
      </Canvas>
    </>
  )
}

export default CarPage
