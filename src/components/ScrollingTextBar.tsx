export default function ScrollingTextBar() {
  return (
    <div className="w-full bg-gray-800 border-y  py-3 overflow-hidden">
      <div className="flex whitespace-nowrap animate-scroll">
        <div className="flex items-center space-x-8 text-white font-heading text-sm tracking-widest">
          {/* Repeat the pattern multiple times to ensure smooth infinite scroll */}
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="flex items-center space-x-8">
              <span>RAVEDRON</span>
              <span className="text-gray-400">·</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
