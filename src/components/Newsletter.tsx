export default function Newsletter() {
  return (
    <section className="py-20 px-6 lg:px-8 bg-gray-900">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">
          STAY IN THE CHAOS
        </h2>
        <p className="text-gray-300 mb-8">
          Get exclusive access to drops, sales, and the latest chaos
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 bg-black border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-white"
          />
          <button className="bg-white text-black px-6 py-3 font-semibold hover:bg-gray-200 transition-colors">
            SUBSCRIBE
          </button>
        </div>
      </div>
    </section>
  );
}
