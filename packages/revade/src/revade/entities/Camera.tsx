import T, { useCamera } from "@hmans/trinity"
import { FC } from "react"
import { PerspectiveCamera } from "three"
import { ECS } from "../state"

export const Camera: FC<{ offset?: [number, number, number] }> = ({
  offset = [0, 0, 50]
}) => {
  const camera = useCamera<PerspectiveCamera>()

  return (
    <ECS.Entity>
      <ECS.Component name="camera" data={{ offset }} />

      <ECS.Component name="transform">
        <T.Group position={offset}>
          <T.PerspectiveCamera ref={camera} />
        </T.Group>
      </ECS.Component>
    </ECS.Entity>
  )
}
