"use client";

import { DEFAULT_CONTENT, type SiteContent } from "@/lib/content-types";
import { OrbitMediaButtons } from "@/components/OrbitMediaPicker";
import type { NepalCategory, NepalPackage } from "@/lib/nepal-defaults";
import { mediaSrc } from "@/lib/media-src";

const inputClass =
  "w-full rounded-md border border-white/15 bg-black/35 px-3 py-2 text-sm text-white outline-none focus:border-gold/50";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">{label}</span>
      {children}
    </label>
  );
}

type CatalogField = "nepal" | "bhutan" | "tibet" | "multi" | "helicopter" | "photography";

const CATALOG_PATH: Record<CatalogField, string> = {
  nepal: "/nepal",
  bhutan: "/bhutan",
  tibet: "/tibet",
  multi: "/himalayan-multi-countries-tour",
  helicopter: "/helicopter-tours",
  photography: "/photography-treks",
};

function blankPackage(): NepalPackage {
  return {
    id: `pkg-${Date.now()}`,
    title: "New Luxury Package",
    days: 7,
    subtitle: "Luxury Package",
    difficulty: "Moderate",
    description: "Describe this luxury journey.",
    badge: "",
    href: "/contact",
    imageSrc: "",
    imageAlt: "",
  };
}

function blankCategory(): NepalCategory {
  return {
    id: `cat-${Date.now()}`,
    label: "New Category",
    countLabel: "0 Packages",
    packages: [],
  };
}

function countLabel(n: number) {
  return `${n} Package${n === 1 ? "" : "s"}`;
}

type Props = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
  save: (next: SiteContent) => Promise<void>;
  field?: CatalogField;
};

export default function OrbitNepalEditor({ content, setContent, save, field = "nepal" }: Props) {
  const page = content[field] ?? DEFAULT_CONTENT[field];
  const withCategories = field === "nepal";

  function patch(partial: Partial<SiteContent[CatalogField]>) {
    setContent({ ...content, [field]: { ...page, ...partial } });
  }

  function patchAndSave(partial: Partial<SiteContent[CatalogField]>) {
    const next = { ...content, [field]: { ...page, ...partial } };
    setContent(next);
    void save(next);
  }

  function setCategories(categories: NepalCategory[]) {
    patch({
      categories: categories.map((cat) => ({ ...cat, countLabel: countLabel(cat.packages.length) })),
    });
  }

  function updateCategory(index: number, next: NepalCategory) {
    const categories = [...page.categories];
    categories[index] = { ...next, countLabel: countLabel(next.packages.length) };
    patch({ categories });
  }

  function updatePackage(catIndex: number, pkgIndex: number, next: NepalPackage) {
    const cat = page.categories[catIndex];
    const packages = [...cat.packages];
    packages[pkgIndex] = next;
    updateCategory(catIndex, { ...cat, packages });
  }

  function updatePackageAndSave(catIndex: number, pkgIndex: number, next: NepalPackage) {
    const categories = [...page.categories];
    const cat = categories[catIndex];
    const packages = [...cat.packages];
    packages[pkgIndex] = next;
    categories[catIndex] = { ...cat, packages, countLabel: countLabel(packages.length) };
    patchAndSave({ categories });
  }

  function addPackage(catIndex: number) {
    const cat = page.categories[catIndex];
    updateCategory(catIndex, { ...cat, packages: [...cat.packages, blankPackage()] });
  }

  function deletePackage(catIndex: number, pkgIndex: number) {
    const cat = page.categories[catIndex];
    updateCategory(catIndex, { ...cat, packages: cat.packages.filter((_, i) => i !== pkgIndex) });
  }

  function addCategory() {
    setCategories([...page.categories, blankCategory()]);
  }

  function deleteCategory(index: number) {
    if (page.categories.length < 2) return;
    setCategories(page.categories.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-8">
      <p className="rounded-lg border border-gold/25 bg-black/25 px-3 py-2 text-sm text-white/75">
        Public page <strong className="text-gold">{CATALOG_PATH[field]}</strong> — cover, wallpaper, copy, images, add
        and delete packages. Save from the top bar.
      </p>
      <label className="flex items-center gap-2 text-sm text-white/80">
        <input
          type="checkbox"
          checked={page.visible !== false}
          onChange={(e) => patch({ visible: e.target.checked })}
        />
        Page visible
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Eyebrow">
          <input className={inputClass} value={page.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} />
        </Field>
        <Field label="Cover headline">
          <input className={inputClass} value={page.headline} onChange={(e) => patch({ headline: e.target.value })} />
        </Field>
        <Field label="Cover lead">
          <input className={inputClass} value={page.coverLead} onChange={(e) => patch({ coverLead: e.target.value })} />
        </Field>
        <Field label="Catalog eyebrow">
          <input
            className={inputClass}
            value={page.catalogEyebrow}
            onChange={(e) => patch({ catalogEyebrow: e.target.value })}
          />
        </Field>
        <Field label="Catalog headline">
          <input
            className={inputClass}
            value={page.catalogHeadline}
            onChange={(e) => patch({ catalogHeadline: e.target.value })}
          />
        </Field>
        {withCategories ? (
          <Field label="Tab hint">
            <input className={inputClass} value={page.tabHint} onChange={(e) => patch({ tabHint: e.target.value })} />
          </Field>
        ) : null}
      </div>
      <Field label="Catalog lead">
        <textarea
          className={`${inputClass} min-h-[90px]`}
          value={page.catalogLead}
          onChange={(e) => patch({ catalogLead: e.target.value })}
        />
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Cover image (16:9)">
          {page.coverSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={mediaSrc(page.coverSrc)} alt="" className="mb-2 h-24 w-full rounded-md object-cover" />
          ) : null}
          <input className={inputClass} value={page.coverSrc} onChange={(e) => patch({ coverSrc: e.target.value })} />
          <OrbitMediaButtons onPicked={(src) => patchAndSave({ coverSrc: src })} />
        </Field>
        <Field label="Section background image">
          {page.wallpaperSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={mediaSrc(page.wallpaperSrc)} alt="" className="mb-2 h-24 w-full rounded-md object-cover" />
          ) : null}
          <input
            className={inputClass}
            value={page.wallpaperSrc}
            onChange={(e) => patch({ wallpaperSrc: e.target.value })}
          />
          <OrbitMediaButtons onPicked={(src) => patchAndSave({ wallpaperSrc: src })} />
        </Field>
        <Field label="Close title">
          <input
            className={inputClass}
            value={page.closeTitle || ""}
            onChange={(e) => patch({ closeTitle: e.target.value })}
          />
        </Field>
        <Field label="CTA label">
          <input className={inputClass} value={page.ctaLabel} onChange={(e) => patch({ ctaLabel: e.target.value })} />
        </Field>
        <Field label="CTA href">
          <input className={inputClass} value={page.ctaHref} onChange={(e) => patch({ ctaHref: e.target.value })} />
        </Field>
        <Field label="Meta title">
          <input className={inputClass} value={page.metaTitle} onChange={(e) => patch({ metaTitle: e.target.value })} />
        </Field>
      </div>
      <Field label="Close body">
        <textarea
          className={`${inputClass} min-h-[90px]`}
          value={page.closeBody || ""}
          onChange={(e) => patch({ closeBody: e.target.value })}
        />
      </Field>
      <Field label="Meta description">
        <textarea
          className={`${inputClass} min-h-[72px]`}
          value={page.metaDescription}
          onChange={(e) => patch({ metaDescription: e.target.value })}
        />
      </Field>

      {withCategories ? (
        <button
          type="button"
          onClick={addCategory}
          className="rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold"
        >
          Add category
        </button>
      ) : null}

      {page.categories.map((cat, catIndex) => (
        <div key={cat.id} className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-4">
          {withCategories ? (
            <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <Field label="Category label">
                <input
                  className={inputClass}
                  value={cat.label}
                  onChange={(e) => updateCategory(catIndex, { ...cat, label: e.target.value })}
                />
              </Field>
              <Field label="Count label">
                <input
                  className={inputClass}
                  value={cat.countLabel}
                  onChange={(e) => updateCategory(catIndex, { ...cat, countLabel: e.target.value })}
                />
              </Field>
              <button
                type="button"
                onClick={() => deleteCategory(catIndex)}
                className="self-end rounded-md border border-red-400/40 px-3 py-2 text-xs font-semibold text-red-200"
              >
                Delete category
              </button>
            </div>
          ) : (
            <p className="text-sm font-semibold text-gold">{cat.countLabel || countLabel(cat.packages.length)}</p>
          )}
          {cat.packages.map((pkg, pkgIndex) => (
            <div key={pkg.id} className="grid gap-2 rounded-lg border border-white/10 p-3 sm:grid-cols-2">
              {pkg.imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={mediaSrc(pkg.imageSrc)} alt="" className="h-28 w-full rounded-md object-cover sm:col-span-2" />
              ) : null}
              <Field label="Package title">
                <input
                  className={inputClass}
                  value={pkg.title}
                  onChange={(e) => updatePackage(catIndex, pkgIndex, { ...pkg, title: e.target.value })}
                />
              </Field>
              <Field label="Days">
                <input
                  className={inputClass}
                  type="number"
                  value={pkg.days}
                  onChange={(e) =>
                    updatePackage(catIndex, pkgIndex, { ...pkg, days: Number(e.target.value) || 1 })
                  }
                />
              </Field>
              <Field label="Subtitle">
                <input
                  className={inputClass}
                  value={pkg.subtitle}
                  onChange={(e) => updatePackage(catIndex, pkgIndex, { ...pkg, subtitle: e.target.value })}
                />
              </Field>
              <Field label="Badge">
                <input
                  className={inputClass}
                  value={pkg.badge || ""}
                  onChange={(e) => updatePackage(catIndex, pkgIndex, { ...pkg, badge: e.target.value })}
                />
              </Field>
              <Field label="Difficulty">
                <input
                  className={inputClass}
                  value={pkg.difficulty || ""}
                  onChange={(e) => updatePackage(catIndex, pkgIndex, { ...pkg, difficulty: e.target.value })}
                />
              </Field>
              <Field label="Link">
                <input
                  className={inputClass}
                  value={pkg.href}
                  onChange={(e) => updatePackage(catIndex, pkgIndex, { ...pkg, href: e.target.value })}
                />
              </Field>
              <Field label="Description">
                <textarea
                  className={`${inputClass} min-h-[72px]`}
                  value={pkg.description || ""}
                  onChange={(e) => updatePackage(catIndex, pkgIndex, { ...pkg, description: e.target.value })}
                />
              </Field>
              <Field label="Image alt text">
                <input
                  className={inputClass}
                  value={pkg.imageAlt}
                  onChange={(e) => updatePackage(catIndex, pkgIndex, { ...pkg, imageAlt: e.target.value })}
                />
              </Field>
              <Field label="Image">
                <input
                  className={inputClass}
                  value={pkg.imageSrc}
                  onChange={(e) => updatePackage(catIndex, pkgIndex, { ...pkg, imageSrc: e.target.value })}
                />
                <OrbitMediaButtons
                  onPicked={(src) => updatePackageAndSave(catIndex, pkgIndex, { ...pkg, imageSrc: src })}
                />
              </Field>
              <div className="flex items-end sm:col-span-2">
                <button
                  type="button"
                  onClick={() => deletePackage(catIndex, pkgIndex)}
                  className="rounded-md border border-red-400/40 px-3 py-2 text-xs font-semibold text-red-200"
                >
                  Delete package
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addPackage(catIndex)}
            className="rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold"
          >
            Add package
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => void save(content)}
        className="rounded-md bg-gold/20 px-4 py-2 text-sm font-semibold text-gold"
      >
        Save this page
      </button>
    </div>
  );
}
