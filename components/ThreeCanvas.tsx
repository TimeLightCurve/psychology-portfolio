
'use client'

// import { NeuronModel } from '@/components/NeuronModel'
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
// import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Suspense } from 'react'
import { useScroll, useSpring } from 'motion/react'
import { AnimatedSwan } from './AnimatedSwan'

export function ThreeCanvas() {
	const { scrollYProgress } = useScroll()
	const springProgress = useSpring(scrollYProgress, { stiffness: 55, damping: 18, restDelta: 0.001 })

	return (
		// <section id="neuron-canvas" className="relative h-screen w-full overflow-hidden bg-[#07110f]">
		<section id="neuron-canvas" className="fixed h-[150vh] w-full bg-transparent z-50">
			{/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(110,255,214,0.16),transparent_42%),linear-gradient(180deg,#0b1513_0%,#07110f_100%)]" /> */}
			<Canvas camera={{ position: [0, 0, 6], fov: 32 }} dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'high-performance' }} className="relative z-10 h-full w-full">
				{/* <color attach="background" args={["#07110f"]} /> */}
				<ambientLight intensity={0.2} />
				{/* <fog attach="fog" args={["#07110f", 24, 39]} /> */}
				{/* <directionalLight position={[4, 6, 5]} intensity={1.8} color="#d6fff1" /> */}
				{/* <pointLight position={[-5, -2, 4]} intensity={1} color="#6ef3cf" /> */}
				<Suspense fallback={null}>
					{/* <NeuronModel position={[-12, -6, -15]} rotation={[0, 0.3, 0]} scale={1.9} /> */}
					{/* <OrigamiBall position={[-2, 0.7, 0]} /> */}
					<AnimatedSwan scrollProgress={springProgress} startPosition={[2, -1, 0]} />
					<Environment preset="city" background={false} environmentIntensity={1} />
				</Suspense>
				{/* <EffectComposer multisampling={0} enableNormalPass={false}>
					<Bloom
						intensity={1.25}
						luminanceThreshold={0.72}
						luminanceSmoothing={0.08}
						mipmapBlur={true}
					/>
				</EffectComposer> */}
				<OrbitControls
					enablePan={false}
					enableZoom={false}
					minPolarAngle={Math.PI / 2.4}
					maxPolarAngle={Math.PI / 1.8}
				// autoRotate
				// autoRotateSpeed={0.9}
				/>
			</Canvas>

			{/* <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-[#07110f] via-[#07110f]/70 to-transparent px-4 pb-10 pt-24 sm:px-6 lg:px-10">
				<div className="mx-auto flex w-full items-end justify-between gap-6 text-[#e8fff7]" style={{ maxWidth: '1380px' }}>
					<div>
						<p className="mb-3 text-sm tracking-[0.3em] text-[#9fcbbe] uppercase">3D Visualization</p>
						<h2 className="font-nian text-4xl sm:text-5xl lg:text-6xl">مدل سه بعدی نورون</h2>
					</div>
					<p className="max-w-xl text-base leading-8 text-[#d5ebe3] sm:text-lg">
						این بخش به صورت تمام صفحه مدل سه بعدی نورون را نمایش می دهد تا حال و هوای علمی و درمانی صفحه حفظ شود.
					</p>
				</div>
			</div> */}
		</section>
	)
}