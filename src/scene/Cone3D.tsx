export function Cone3D({ radius, height } : { radius: number, height: number}) {
    return (
        <mesh>
            <coneGeometry 
                args={[
                    radius,
                    height,
                    64
                ]}
            />

            <meshStandardMaterial />
        </mesh>
    )
}