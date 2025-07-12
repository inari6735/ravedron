'use client'

import Image from "next/image";
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Product } from "@/types";
import { Suspense, useRef, useMemo } from 'react';
import { Group } from 'three';

interface ProductCardProps {
  product: Product;
}

function SpinningModel() {
  const { scene } = useGLTF('/3d/t_shirt.glb');
  const modelRef = useRef<Group>(null);
  
  // Clone the scene for each instance
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <primitive 
      ref={modelRef} 
      object={clonedScene} 
      scale={[3, 3, 3]}
      position={[0, -3.75, 0]}
    />
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group cursor-pointer bg-white">
      <div className="relative overflow-hidden bg-gray-200 aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:opacity-0 transition-opacity duration-300"
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <Suspense fallback={null}>
              <SpinningModel />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
            </Suspense>
          </Canvas>
        </div>
      </div>
      <div className="p-4 bg-black">
        <h3 className="text-white font-medium mb-1 uppercase text-sm">
          {product.name}
        </h3>
        <p className="text-white text-sm">{product.price}</p>
      </div>
    </div>
  );
}
