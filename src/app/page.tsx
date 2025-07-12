import {
  NotificationBar,
  Header,
  ScrollingTextBar,
  Hero,
  ProductGrid,
  FeaturedCategories,
  UpcomingEvents,
  StoreInfo,
  Newsletter,
  Footer,
} from "@/components";

import {
  featuredProducts,
  upcomingEvents,
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
      <UpcomingEvents events={upcomingEvents} />
      <StoreInfo />
      <Newsletter />
      <Footer footerSections={footerSections} />
    </div>
  );
}
