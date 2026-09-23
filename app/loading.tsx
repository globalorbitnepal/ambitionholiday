export default function Loading() {
  return (
    <div className="min-h-[50vh] bg-[#070a10]" aria-busy="true" aria-label="Loading page">
      <div className="mx-auto h-0.5 w-full max-w-5xl overflow-hidden bg-white/5">
        <div className="h-full w-1/3 animate-pulse bg-[#d4af37]/80" />
      </div>
    </div>
  );
}
