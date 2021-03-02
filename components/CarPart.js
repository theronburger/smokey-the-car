import { React, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import {  Canvas, useThree , useFrame, useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useDrag } from 'react-use-gesture'
import { useSpring, a } from 'react-spring/three'

const CarPart = ({ speed, factor, url, part, draggable, setOrbitActive, color,  setText,setCarColor,  ...props }) => {
  console.log("CarPart :" + part + " draggable:" + draggable)
  const { viewport } = useThree()
  const [falling, setFalling] = useState(false)
  var distance = 0
  const group = useRef()

  const [spring, set] = useSpring(() => ({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    config: { mass: 3, friction: 30, tension: 800 },
  }))

  const bind = useDrag(
    ({ offset: [x, y], vxvy: [vx, vy], down, ...props }) => {
      distance = Math.sqrt(Math.pow(x,2)+Math.pow(y,2))
      console.log("x:"+ x + " y:" + y + " dist:" + distance)
      if (distance > 50 && draggable) {
        //playSoundfunction()
        setFalling(true)
        setText("Much better! Now she's electric!")
        setCarColor("#86A5F6")
      }
      setOrbitActive(!down)
      const aspect = viewport().factor
      if (draggable) {
        set({
          position: [x / aspect, -y / aspect, 0],
          rotation: [y / aspect, x / aspect, 0],
        })
      }
    },
    { eventOptions: { pointer: true } }
  )

  useFrame((state, delta) => {
    if (falling){
      group.current.position.y -= 10
    }
})

  const gltf = useLoader(GLTFLoader, url)
  console.log("loading GLTF for " + part + " from " + url)

  //this is mega unelegant. Its just the demo code fudged to work. Im loading the model multiple time to extract just one part each time.
  //ToDo Pass the parts to load into the part function, and / or have a load all function (which must pre-exist)
  //<meshStandardMaterial  attach="material" {...gltf.nodes.[part].material}
  return (
    <group ref={group}>
      <scene name="Scene" {...props}>
        <a.mesh
          name={part}
          {...spring}
          {...bind()}
          castShadow
          rotation={[0, 0, 0]}
          >
          <bufferGeometry attach="geometry" {...gltf.nodes.[part].geometry} />
          <meshPhysicalMaterial attach="material" color={color} />
            name="myNiceName"
          />
        </a.mesh>
      </scene>
    </group>
  )
}

export default CarPart
