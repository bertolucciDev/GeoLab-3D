/// <reference types="@react-three/fiber" />

export function Cylinder3D({ radius, height} : { radius: number, height: number }) {
    return (
        <mesh>
            <cylinderGeometry 
                args={[
                    radius,
                    radius,
                    height,
                    64,
                ]}
            />

            <meshStandardMaterial />
        </mesh>
    )
}