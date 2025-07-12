export default function FeaturedCategories() {
  return (
    <section className="w-full bg-black">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        {/* T-Shirts Section */}
        <div className="relative group overflow-hidden border-r border-gray-800">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=600&fit=crop")'
            }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex flex-col justify-between h-full p-12 text-white">
            <div>
              <h2 className="font-display text-5xl mb-4 tracking-wider">T-SHIRTS</h2>
            </div>
            <div>
              <button className="btn-sharp px-10 py-4 text-sm font-bold tracking-widest">
                BUY NOW
              </button>
            </div>
          </div>
        </div>

        {/* Accessories Section */}
        <div className="relative group overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=800&h=600&fit=crop")'
            }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex flex-col justify-between h-full p-12 text-white">
            <div>
              <h2 className="font-display text-5xl mb-4 tracking-wider">ACCESSORIES</h2>
            </div>
            <div>
              <button className="btn-sharp px-10 py-4 text-sm font-bold tracking-widest">
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
