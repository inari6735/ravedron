export default function Newsletter() {
  return (
    <section className="py-20 px-6 lg:px-8 bg-gray-900 border-t border-gray-800">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-4xl mb-6 text-white tracking-wider">
          JOIN THE UNDERGROUND
        </h2>
        <p className="font-heading text-gray-300 mb-8 text-lg tracking-wide">
          GET EXCLUSIVE ACCESS TO NEW DROPS, FESTIVAL GEAR, AND UNDERGROUND EVENTS
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            className="input-sharp flex-1 px-6 py-4 placeholder-gray-500 text-white font-heading tracking-wider"
          />
          <button className="btn-sharp px-8 py-4 text-sm font-bold tracking-widest">
            SUBSCRIBE
          </button>
        </div>
      </div>
    </section>
  );
}
