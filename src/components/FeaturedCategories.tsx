export default function FeaturedCategories() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        {/* T-Shirts Section */}
        <div className="relative group overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=600&fit=crop")'
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex flex-col justify-between h-full p-8 text-white">
            <div>
              <h2 className="text-4xl font-bold mb-4 uppercase tracking-wide">T-Shirts</h2>
            </div>
            <div>
              <button className="bg-white text-black px-8 py-3 text-sm font-medium uppercase tracking-wide hover:bg-gray-200 transition-colors">
                Buy Now
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
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex flex-col justify-between h-full p-8 text-white">
            <div>
              <h2 className="text-4xl font-bold mb-4 uppercase tracking-wide">Accessories</h2>
            </div>
            <div>
              <button className="bg-white text-black px-8 py-3 text-sm font-medium uppercase tracking-wide hover:bg-gray-200 transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
