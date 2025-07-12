'use client'

import Image from "next/image";
import Link from "next/link";
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Product } from "@/types";
import { Suspense, useRef, useMemo } from 'react';
import { Group } from 'three';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

function SpinningModel() {
  // Use the correct path for GitHub Pages deployment
  const basePath = process.env.NODE_ENV === 'production' ? 'https://inari6735.github.io/ravedron' : '';
  const { scene } = useGLTF(`${basePath}/3d/t_shirt.glb`);
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
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <div className="group bg-gray-900 border border-gray-800 hover:border-red-500 transition-colors">
      <Link href={`/products/${product.id}`}>
        <div className="cursor-pointer">
          <div className="relative overflow-hidden aspect-square">
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
        </div>
      </Link>
      <div className="p-4 bg-gray-800">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-white font-heading mb-1 text-lg hover:text-red-400 transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <p className="text-gray-400 text-sm">{product.price}</p>
          <button
            onClick={handleAddToCart}
            className="text-red-500 hover:text-red-400 text-xs font-medium tracking-wider"
          >
            + ADD
          </button>
        </div>
      </div>
    </div>
  );
}
