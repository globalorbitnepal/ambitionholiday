"use client";

import { useState } from "react";
import {
  DEFAULT_CONTENT,
  type FooterBrandLogo,
  type FooterLink,
  type FooterSocial,
  type FooterSocialNetwork,
  type SiteContent,
} from "@/lib/content-types";
import { mediaSrc } from "@/lib/media-src";
import { postOrbitUpload } from "@/lib/orbit-upload-client";

const inputClass =
  "w-full rounded-md border border-white/15 bg-black/35 px-3 py-2 text-sm text-white outline-none focus:border-gold/50";

const NETWORKS: { id: FooterSocialNetwork; label: string }[] = [
  { id: "facebook", label: "Facebook" },
  { id: "twitter", label: "X / Twitter" },
  { id: "instagram", label: "Instagram" },
  { id: "youtube", label: "YouTube" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "custom", label: "Custom icon" },
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
        {label}
      </span>
      {children}
    </label>
  );
}

async function uploadFile(file: File): Promise<string> {
  return postOrbitUpload(file);
}

function LinkListEditor({
  title,
  items,
  onChange,
}: {
  title: string;
  items: FooterLink[];
  onChange: (next: FooterLink[]) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
        {title}
      </p>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item.id} className="grid gap-2 rounded-md border border-white/10 p-3 sm:grid-cols-[1fr_1fr_auto]">
            <input
              className={inputClass}
              value={item.label}
              placeholder="Label"
              onChange={(e) => {
                const next = [...items];
                next[index] = { ...item, label: e.target.value };
                onChange(next);
              }}
            />
            <input
              className={inputClass}
              value={item.href}
              placeholder="/path or https://"
              onChange={(e) => {
                const next = [...items];
                next[index] = { ...item, href: e.target.value };
                onChange(next);
              }}
            />
            <button
              type="button"
              className="rounded border border-red-400/30 px-2 py-1 text-[0.65rem] text-red-200"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-3 rounded-md border border-white/20 px-3 py-2 text-xs"
        onClick={() =>
          onChange([
            ...items,
            { id: `link-${Date.now()}`, label: "New link", href: "#" },
          ])
        }
      >
        Add link
      </button>
    </div>
  );
}

function BrandLogoListEditor({
  title,
  items,
  updatedAt,
  busy,
  onChange,
  onUpload,
}: {
  title: string;
  items: FooterBrandLogo[];
  updatedAt: string;
  busy: string | null;
  onChange: (next: FooterBrandLogo[]) => void;
  onUpload: (index: number, file: File) => Promise<void>;
}) {
  return (
    <div>
      <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
        {title}
      </p>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item.id} className="space-y-2 rounded-md border border-white/10 p-3">
            <div className="flex items-center gap-3">
              {item.imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={mediaSrc(item.imageSrc, updatedAt)}
                  alt=""
                  className="h-8 w-16 object-contain"
                />
              ) : (
                <span className="rounded border border-white/20 px-2 py-1 text-[0.65rem] text-white/60">
                  {item.label || "Text badge"}
                </span>
              )}
              <label
                className={`cursor-pointer rounded border border-gold/40 px-2 py-1 text-[0.65rem] text-gold ${
                  busy === `brand-${item.id}` ? "opacity-50" : ""
                }`}
              >
                {busy === `brand-${item.id}` ? "Uploading…" : "Upload logo"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={busy !== null}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    e.target.value = "";
                    if (!file) return;
                    await onUpload(index, file);
                  }}
                />
              </label>
              <button
                type="button"
                className="rounded border border-red-400/30 px-2 py-1 text-[0.65rem] text-red-200"
                onClick={() => onChange(items.filter((_, i) => i !== index))}
              >
                Remove
              </button>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                className={inputClass}
                value={item.label}
                placeholder="Label"
                onChange={(e) => {
                  const next = [...items];
                  next[index] = { ...item, label: e.target.value };
                  onChange(next);
                }}
              />
              <input
                className={inputClass}
                value={item.href}
                placeholder="Link"
                onChange={(e) => {
                  const next = [...items];
                  next[index] = { ...item, href: e.target.value };
                  onChange(next);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-3 rounded-md border border-white/20 px-3 py-2 text-xs"
        onClick={() =>
          onChange([
            ...items,
            { id: `logo-${Date.now()}`, label: "NEW", imageSrc: "", href: "#" },
          ])
        }
      >
        Add logo / badge
      </button>
    </div>
  );
}

type Props = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
  save: (next: SiteContent) => Promise<void>;
};

export default function OrbitFooterEditor({ content, setContent, save }: Props) {
  const footer = content.footer ?? DEFAULT_CONTENT.footer;
  const [busy, setBusy] = useState<string | null>(null);

  function patch(partial: Partial<SiteContent["footer"]>) {
    setContent({ ...content, footer: { ...footer, ...partial } });
  }

  async function handleUpload(key: string, file: File, apply: (url: string) => SiteContent) {
    setBusy(key);
    try {
      const url = await uploadFile(file);
      const next = apply(url);
      setContent(next);
      await save(next);
    } catch {
      window.alert("Upload failed. Try a JPG or PNG under 12MB.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-10">
      <div className="rounded-lg border border-gold/25 bg-gold/5 p-4 text-sm text-white/80">
        <p className="font-semibold text-gold">Footer editor</p>
        <p className="mt-1 text-[0.8rem] text-white/55">
          Replace logos for <strong className="text-white/80">PROUDLY MEMBER OF</strong>,{" "}
          <strong className="text-white/80">FIND &amp; FOLLOW US</strong>, and{" "}
          <strong className="text-white/80">WE ACCEPT</strong> below. Use{" "}
          <strong className="text-white/80">Save changes</strong> at the top after text edits.
          Logo uploads save automatically.
        </p>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={footer.visible}
          onChange={(e) => patch({ visible: e.target.checked })}
        />
        Show Footer
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={footer.showLandscape}
          onChange={(e) => patch({ showLandscape: e.target.checked })}
        />
        Show Himalayan landscape art (stupa / trekker / elephant / peaks)
      </label>

      <div className="space-y-3 rounded-lg border border-white/10 p-4">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
          Landscape art image
        </p>
        <div className="relative aspect-[21/5] overflow-hidden rounded-md border border-gold/20 bg-black/40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mediaSrc(
              footer.landscapeImageSrc || DEFAULT_CONTENT.footer.landscapeImageSrc,
              content.updatedAt,
            )}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <label
            className={`cursor-pointer rounded border border-gold/40 px-3 py-2 text-xs text-gold ${
              busy === "landscape" ? "opacity-50" : ""
            }`}
          >
            {busy === "landscape" ? "Uploading…" : "Replace landscape art"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={busy !== null}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (!file) return;
                await handleUpload("landscape", file, (url) => ({
                  ...content,
                  footer: { ...footer, landscapeImageSrc: url },
                }));
              }}
            />
          </label>
          <button
            type="button"
            className="rounded border border-white/20 px-3 py-2 text-xs"
            onClick={() =>
              patch({ landscapeImageSrc: DEFAULT_CONTENT.footer.landscapeImageSrc })
            }
          >
            Reset to default art
          </button>
        </div>
      </div>

      <div className="space-y-6 rounded-lg border border-gold/20 p-4">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-gold">
          Trust bar — replace logos
        </p>

        <Field label="PROUDLY MEMBER OF — section title">
          <input
            className={inputClass}
            value={footer.membersTitle}
            onChange={(e) => patch({ membersTitle: e.target.value })}
          />
        </Field>
        <BrandLogoListEditor
          title="PROUDLY MEMBER OF — logos (upload to replace)"
          items={footer.members}
          updatedAt={content.updatedAt}
          busy={busy}
          onChange={(members) => patch({ members })}
          onUpload={(index, file) =>
            handleUpload(`brand-${footer.members[index].id}`, file, (url) => {
              const members = [...footer.members];
              members[index] = { ...members[index], imageSrc: url };
              return { ...content, footer: { ...footer, members } };
            })
          }
        />

        <Field label="FIND & FOLLOW US — section title">
          <input
            className={inputClass}
            value={footer.socialTitle}
            onChange={(e) => patch({ socialTitle: e.target.value })}
          />
        </Field>
        <div>
          <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
            FIND &amp; FOLLOW US — icons (upload custom logo to replace)
          </p>
          <div className="space-y-3">
            {footer.socials.map((s, index) => (
              <div key={s.id} className="space-y-2 rounded-md border border-white/10 p-3">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded border border-white/15 bg-black/40">
                    {s.iconSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={mediaSrc(s.iconSrc, content.updatedAt)}
                        alt=""
                        className="h-6 w-6 object-contain"
                      />
                    ) : (
                      <span className="text-[0.65rem] text-white/50">{s.network}</span>
                    )}
                  </div>
                  <label
                    className={`cursor-pointer rounded border border-gold/40 px-2 py-1 text-[0.65rem] text-gold ${
                      busy === `social-icon-${s.id}` ? "opacity-50" : ""
                    }`}
                  >
                    {busy === `social-icon-${s.id}` ? "Uploading…" : "Replace icon"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={busy !== null}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        e.target.value = "";
                        if (!file) return;
                        await handleUpload(`social-icon-${s.id}`, file, (url) => {
                          const socials = [...footer.socials];
                          socials[index] = { ...s, iconSrc: url };
                          return { ...content, footer: { ...footer, socials } };
                        });
                      }}
                    />
                  </label>
                  {s.iconSrc ? (
                    <button
                      type="button"
                      className="rounded border border-white/20 px-2 py-1 text-[0.65rem]"
                      onClick={() => {
                        const socials = [...footer.socials];
                        socials[index] = { ...s, iconSrc: undefined };
                        patch({ socials });
                      }}
                    >
                      Use default icon
                    </button>
                  ) : null}
                  <button
                    type="button"
                    className="rounded border border-red-400/30 px-2 py-1 text-[0.65rem] text-red-200"
                    onClick={() =>
                      patch({ socials: footer.socials.filter((_, i) => i !== index) })
                    }
                  >
                    Remove
                  </button>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  <select
                    className={inputClass}
                    value={s.network}
                    onChange={(e) => {
                      const socials = [...footer.socials];
                      socials[index] = {
                        ...s,
                        network: e.target.value as FooterSocialNetwork,
                      };
                      patch({ socials });
                    }}
                  >
                    {NETWORKS.map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.label}
                      </option>
                    ))}
                  </select>
                  <input
                    className={inputClass}
                    value={s.label}
                    placeholder="Label"
                    onChange={(e) => {
                      const socials = [...footer.socials];
                      socials[index] = { ...s, label: e.target.value };
                      patch({ socials });
                    }}
                  />
                  <input
                    className={inputClass}
                    value={s.href}
                    placeholder="https://"
                    onChange={(e) => {
                      const socials = [...footer.socials];
                      socials[index] = { ...s, href: e.target.value };
                      patch({ socials });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-3 rounded-md border border-white/20 px-3 py-2 text-xs"
            onClick={() =>
              patch({
                socials: [
                  ...footer.socials,
                  {
                    id: `soc-${Date.now()}`,
                    label: "Social",
                    href: "#",
                    network: "instagram",
                  } satisfies FooterSocial,
                ],
              })
            }
          >
            Add social
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="WE ACCEPT — section title">
            <input
              className={inputClass}
              value={footer.paymentsTitle}
              onChange={(e) => patch({ paymentsTitle: e.target.value })}
            />
          </Field>
          <Field label="Pay Now label">
            <input
              className={inputClass}
              value={footer.payNowLabel}
              onChange={(e) => patch({ payNowLabel: e.target.value })}
            />
          </Field>
          <Field label="Pay Now link">
            <input
              className={inputClass}
              value={footer.payNowHref}
              onChange={(e) => patch({ payNowHref: e.target.value })}
            />
          </Field>
        </div>
        <BrandLogoListEditor
          title="WE ACCEPT — payment logos (upload to replace)"
          items={footer.payments}
          updatedAt={content.updatedAt}
          busy={busy}
          onChange={(payments) => patch({ payments })}
          onUpload={(index, file) =>
            handleUpload(`brand-${footer.payments[index].id}`, file, (url) => {
              const payments = [...footer.payments];
              payments[index] = { ...payments[index], imageSrc: url };
              return { ...content, footer: { ...footer, payments } };
            })
          }
        />
      </div>
      <div className="space-y-4 rounded-lg border border-white/10 p-4">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
          Need help column
        </p>
        <Field label="Title">
          <input
            className={inputClass}
            value={footer.helpTitle}
            onChange={(e) => patch({ helpTitle: e.target.value })}
          />
        </Field>
        <Field label="Body">
          <textarea
            className={`${inputClass} min-h-20`}
            value={footer.helpBody}
            onChange={(e) => patch({ helpBody: e.target.value })}
          />
        </Field>
        <LinkListEditor
          title="Phone numbers (label + tel: link)"
          items={footer.phones}
          onChange={(phones) => patch({ phones })}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Email">
            <input
              className={inputClass}
              value={footer.email}
              onChange={(e) => patch({ email: e.target.value })}
            />
          </Field>
          <Field label="Email link">
            <input
              className={inputClass}
              value={footer.emailHref}
              onChange={(e) => patch({ emailHref: e.target.value })}
            />
          </Field>
        </div>
        <Field label="Hours">
          <input
            className={inputClass}
            value={footer.hours}
            onChange={(e) => patch({ hours: e.target.value })}
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Useful links title">
          <input
            className={inputClass}
            value={footer.usefulTitle}
            onChange={(e) => patch({ usefulTitle: e.target.value })}
          />
        </Field>
        <Field label="Adventures title">
          <input
            className={inputClass}
            value={footer.adventuresTitle}
            onChange={(e) => patch({ adventuresTitle: e.target.value })}
          />
        </Field>
        <Field label="Popular treks title">
          <input
            className={inputClass}
            value={footer.treksTitle}
            onChange={(e) => patch({ treksTitle: e.target.value })}
          />
        </Field>
        <Field label="Newsletter title">
          <input
            className={inputClass}
            value={footer.newsletterTitle}
            onChange={(e) => patch({ newsletterTitle: e.target.value })}
          />
        </Field>
      </div>

      <LinkListEditor
        title="Useful links"
        items={footer.usefulLinks}
        onChange={(usefulLinks) => patch({ usefulLinks })}
      />
      <LinkListEditor
        title="Adventure links"
        items={footer.adventureLinks}
        onChange={(adventureLinks) => patch({ adventureLinks })}
      />
      <LinkListEditor
        title="Popular trek links"
        items={footer.trekLinks}
        onChange={(trekLinks) => patch({ trekLinks })}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Newsletter placeholder">
          <input
            className={inputClass}
            value={footer.newsletterPlaceholder}
            onChange={(e) => patch({ newsletterPlaceholder: e.target.value })}
          />
        </Field>
        <Field label="Newsletter note">
          <input
            className={inputClass}
            value={footer.newsletterNote}
            onChange={(e) => patch({ newsletterNote: e.target.value })}
          />
        </Field>
      </div>

      <div className="space-y-4 rounded-lg border border-white/10 p-4">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
          Brand row
        </p>
        <p className="text-[0.7rem] text-white/45">
          Leave footer logo empty to use the same logo as Header.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mediaSrc(
              footer.logoSrc || content.header.logoSrc,
              content.updatedAt,
            )}
            alt=""
            className="h-14 w-auto object-contain"
          />
          <label
            className={`cursor-pointer rounded border border-gold/40 px-3 py-2 text-xs text-gold ${
              busy === "footer-logo" ? "opacity-50" : ""
            }`}
          >
            {busy === "footer-logo" ? "Uploading…" : "Upload footer logo"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={busy !== null}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (!file) return;
                await handleUpload("footer-logo", file, (url) => ({
                  ...content,
                  footer: { ...footer, logoSrc: url },
                }));
              }}
            />
          </label>
          <button
            type="button"
            className="rounded border border-white/20 px-3 py-2 text-xs"
            onClick={() => patch({ logoSrc: "" })}
          >
            Use header logo
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
            Brand-row award art (Tripadvisor / custom)
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mediaSrc(
                footer.brandArtSrc || DEFAULT_CONTENT.footer.brandArtSrc,
                content.updatedAt,
              )}
              alt=""
              className="h-16 w-auto max-w-[12rem] object-contain"
            />
            <label
              className={`cursor-pointer rounded border border-gold/40 px-3 py-2 text-xs text-gold ${
                busy === "brand-art" ? "opacity-50" : ""
              }`}
            >
              {busy === "brand-art" ? "Uploading…" : "Replace award art"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={busy !== null}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  if (!file) return;
                  await handleUpload("brand-art", file, (url) => ({
                    ...content,
                    footer: { ...footer, brandArtSrc: url },
                  }));
                }}
              />
            </label>
            <button
              type="button"
              className="rounded border border-white/20 px-3 py-2 text-xs"
              onClick={() =>
                patch({ brandArtSrc: DEFAULT_CONTENT.footer.brandArtSrc })
              }
            >
              Reset award art
            </button>
          </div>
        </div>

        <Field label="Brand tagline">
          <input
            className={inputClass}
            value={footer.brandTagline}
            onChange={(e) => patch({ brandTagline: e.target.value })}
          />
        </Field>
        <Field label="Mission text">
          <textarea
            className={`${inputClass} min-h-20`}
            value={footer.mission}
            onChange={(e) => patch({ mission: e.target.value })}
          />
        </Field>
        <Field label="Mission script (gold italic)">
          <input
            className={inputClass}
            value={footer.missionScript}
            onChange={(e) => patch({ missionScript: e.target.value })}
          />
        </Field>
      </div>

      <Field label="Copyright">
        <input
          className={inputClass}
          value={footer.copyright}
          onChange={(e) => patch({ copyright: e.target.value })}
        />
      </Field>
      <LinkListEditor
        title="Bottom legal links"
        items={footer.legalLinks}
        onChange={(legalLinks) => patch({ legalLinks })}
      />
      <Field label="Credit prefix">
        <input
          className={inputClass}
          value={footer.creditPrefix}
          onChange={(e) => patch({ creditPrefix: e.target.value })}
        />
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Credit name (linked)">
          <input
            className={inputClass}
            value={footer.creditName}
            onChange={(e) => patch({ creditName: e.target.value })}
          />
        </Field>
        <Field label="Credit link">
          <input
            className={inputClass}
            value={footer.creditHref}
            onChange={(e) => patch({ creditHref: e.target.value })}
          />
        </Field>
      </div>
    </div>
  );
}
