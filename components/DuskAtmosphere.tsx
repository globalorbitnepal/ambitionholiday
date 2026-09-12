/** Real Himalayan photo, clipped to post-hero so it continues the hero look. */
export default function DuskAtmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-video-poster.jpg"
        alt=""
        className="h-full w-full object-cover object-[center_28%] sm:object-center"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/38" />
    </div>
  );
}
