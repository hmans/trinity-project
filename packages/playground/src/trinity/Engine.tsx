import { useRef, useEffect, createContext } from "react"
import * as THREE from "three"
import { useConst } from "./util/useConst"

const SceneObjectContext = createContext<THREE.Object3D>(null!)

export function Engine() {
  const canvas = useRef<HTMLCanvasElement>(null!)
  const scene = useConst(() => new THREE.Scene())

  useEffect(() => {
    const el = canvas.current

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({ canvas: el })
    renderer.setSize(el.clientWidth, el.clientHeight)

    /* Camera */
    const camera = new THREE.PerspectiveCamera(75, el.clientWidth / el.clientHeight, 0.1, 1000)
    camera.position.z = 10

    /* Lights */
    scene.add(new THREE.AmbientLight())

    /* Cube */
    const cube = new THREE.Mesh()
    cube.geometry = new THREE.DodecahedronGeometry()
    cube.material = new THREE.MeshStandardMaterial({ color: "hotpink" })
    cube.position.x = -5
    scene.add(cube)

    /* Render loop */
    let looping = true
    const tick = () => {
      cube.rotation.x = cube.rotation.y += 0.01

      /* Render */
      renderer.render(scene, camera)
      if (looping) requestAnimationFrame(tick)
    }

    tick()

    return () => {
      looping = false
      scene.clear()
    }
  }, [])

  return (
    <canvas ref={canvas}>
      <SceneObjectContext.Provider value={scene}></SceneObjectContext.Provider>
    </canvas>
  )
}
