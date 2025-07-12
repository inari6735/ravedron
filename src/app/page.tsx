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
      <div className="fade-in">
        <Hero />
      </div>
        <div className="fade-in">
            <ProductGrid products={featuredProducts} />
        </div>

      <div className="fade-in">
        <FeaturedCategories />
      </div>
      <div className="slide-in">
        <UpcomingEvents events={upcomingEvents} />
      </div>
      <div className="fade-in">
        <StoreInfo />
      </div>
      <div className="fade-in">
        <Newsletter />
      </div>
      <Footer footerSections={footerSections} />
    </div>
  );
}
