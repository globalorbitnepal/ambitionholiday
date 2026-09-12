/** Himalayan gold-dusk wallpaper (hero excluded via HomePage wrapper). */
export default function DuskAtmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      <div
        className="absolute inset-0 bg-[url('/images/atmosphere/himalaya-gold-dusk.jpg')] bg-cover bg-[center_38%] bg-fixed max-md:bg-scroll"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,8,6,0.28)_0%,rgba(20,14,10,0.4)_42%,rgba(10,8,6,0.55)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_46%_at_50%_0%,rgba(232,190,90,0.2),transparent_58%)]" />
    </div>
  );
}
