/** Himalayan gold-dusk wallpaper (hero excluded via HomePage wrapper). */
export default function DuskAtmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[url('/images/atmosphere/himalaya-gold-dusk-v2.jpg')] bg-cover bg-[center_32%] bg-fixed max-md:bg-scroll" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,8,6,0.22)_0%,rgba(20,14,10,0.38)_45%,rgba(10,8,6,0.58)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_42%_at_88%_18%,rgba(232,190,90,0.22),transparent_58%)]" />
    </div>
  );
}
