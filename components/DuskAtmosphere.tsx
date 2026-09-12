/** Original dusk Himalayan peaks behind post-hero glass. Not the hero hiker photo. */
export default function DuskAtmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/atmosphere/himalaya-dusk-peaks-v3.jpg"
        alt=""
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/22" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-transparent to-black/32" />
    </div>
  );
}
