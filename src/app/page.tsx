import {
  NotificationBar,
  Header,
  ScrollingTextBar,
  Hero,
  ProductGrid,
  FeaturedCategories,
  Newsletter,
  Footer,
} from "@/components";

import {
  featuredProducts,
  navigationItems,
  footerSections,
} from "@/data";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <NotificationBar />
      <Header navigationItems={navigationItems} />
      <ScrollingTextBar />
      <Hero />
      <ProductGrid products={featuredProducts} />
      <FeaturedCategories />
      <Newsletter />
      <Footer footerSections={footerSections} />
    </div>
  );
}
