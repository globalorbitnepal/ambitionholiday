export default function Loading() {
  return (
    <div
      className="flex min-h-screen flex-col bg-[#070a10] text-[#f7f4ef]"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="route-progress route-progress--active" aria-hidden="true" />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a227]">
          Ambition Holidays
        </p>
        <div className="h-1 w-full max-w-xs overflow-hidden rounded-full bg-white/10">
          <div className="route-loading-bar h-full w-2/5 rounded-full bg-[#d4af37]" />
        </div>
      </div>
    </div>
  );
}
