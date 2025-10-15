'use client'

import {
  PageLayout,
  Hero,
  ProductGrid,
  FeaturedCategories,
  StoreInfo,
  Newsletter,
} from "@/components";

export default function Home() {
  return (
    <PageLayout showConnectionError={true}>
      <div className="fade-in">
        <Hero />
      </div>
      
      <div className="fade-in">
        <ProductGrid />
      </div>
      <div className="fade-in">
        <FeaturedCategories />
      </div>
      <div className="fade-in">
        <StoreInfo />
      </div>
      <div className="fade-in">
        <Newsletter />
      </div>
    </PageLayout>
  );
}
