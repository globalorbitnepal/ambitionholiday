/** Maps package / catalog query keys from ?interest= to the contact form dropdown. */
export const CONTACT_FORM_INTERESTS = [
  "Luxury Tour & Trek",
  "Helicopter Experience",
  "Multi-Country Journey",
  "Cultural Tour",
  "Custom Private Journey",
] as const;

export type ContactFormInterest = (typeof CONTACT_FORM_INTERESTS)[number];

export type ResolvedContactInterest = {
  /** Value for the contact form interest select — empty when no param. */
  selectValue: ContactFormInterest | "";
  /** Optional prefill for the message field (user can edit). */
  messagePrefill: string;
  /** Stored on inquiry as `source` when submitted. */
  sourceTag: string;
};

const PACKAGE_MAP: Record<string, { select: ContactFormInterest; label: string }> = {
  "everest-view-lux": {
    select: "Luxury Tour & Trek",
    label: "Everest View Luxury Trek – 7 Days",
  },
  "evl-lux": {
    select: "Luxury Tour & Trek",
    label: "Everest View Luxury Trek – 7 Days",
  },
  "everest-panorama": {
    select: "Luxury Tour & Trek",
    label: "Everest Panorama Trek – 11 Days",
  },
  "ept-pan": {
    select: "Luxury Tour & Trek",
    label: "Everest Panorama Trek – 11 Days",
  },
  "abc-lux": {
    select: "Luxury Tour & Trek",
    label: "Annapurna Base Camp luxury trek",
  },
  "mustang-lux": {
    select: "Luxury Tour & Trek",
    label: "Upper Mustang luxury trek",
  },
  "langtang-lux": {
    select: "Luxury Tour & Trek",
    label: "Langtang Valley luxury trek",
  },
  "poon-hill-lux": {
    select: "Luxury Tour & Trek",
    label: "Poon Hill Luxury Trek – 5 Days",
  },
  "phl-lux": {
    select: "Luxury Tour & Trek",
    label: "Poon Hill Luxury Trek – 5 Days",
  },
  "ghorepani-poonhill-lux": {
    select: "Luxury Tour & Trek",
    label: "Ghorepani Poon Hill Luxury Trek – 9 Days",
  },
  "gph-lux": {
    select: "Luxury Tour & Trek",
    label: "Ghorepani Poon Hill Luxury Trek – 9 Days",
  },
  "annapurna-panorama-lux": {
    select: "Luxury Tour & Trek",
    label: "Annapurna Panorama Luxury Trek – 10 Days",
  },
  "apn-pan": {
    select: "Luxury Tour & Trek",
    label: "Annapurna Panorama Luxury Trek – 10 Days",
  },
  "kathmandu-chitwan-poonhill-lux": {
    select: "Luxury Tour & Trek",
    label: "Kathmandu – Chitwan – Poon Hill Luxury Tour",
  },
  "kcp-lux": {
    select: "Luxury Tour & Trek",
    label: "Kathmandu – Chitwan – Poon Hill Luxury Tour",
  },
  "kathmandu-heritage-lux": {
    select: "Luxury Tour & Trek",
    label: "Kathmandu Heritage Luxury Tour",
  },
  "kmh-lux": {
    select: "Luxury Tour & Trek",
    label: "Kathmandu Heritage Luxury Tour",
  },
  "kathmandu-pokhara-lux": {
    select: "Luxury Tour & Trek",
    label: "Kathmandu Pokhara Luxury Tour",
  },
  "ktp-lux": {
    select: "Luxury Tour & Trek",
    label: "Kathmandu Pokhara Luxury Tour",
  },
  "kathmandu-pokhara-chitwan-lux": {
    select: "Luxury Tour & Trek",
    label: "Kathmandu – Pokhara – Chitwan Luxury Tour",
  },
  "kpc9-lux": {
    select: "Luxury Tour & Trek",
    label: "Kathmandu – Pokhara – Chitwan Luxury Tour",
  },
  "manaslu-lux": {
    select: "Luxury Tour & Trek",
    label: "Manaslu Circuit luxury trek",
  },
};

function availabilitySuffix(intent: string | null | undefined) {
  if ((intent || "").trim().toLowerCase() === "availability") {
    return " I would like to check availability and travel dates.";
  }
  return "";
}

export function resolveContactInterestFromQuery(
  interestParam: string | null | undefined,
  intentParam?: string | null | undefined,
): ResolvedContactInterest {
  const key = (interestParam || "").trim().toLowerCase();
  if (!key) {
    return { selectValue: "", messagePrefill: "", sourceTag: "" };
  }

  const mapped = PACKAGE_MAP[key];
  if (mapped) {
    return {
      selectValue: mapped.select,
      messagePrefill: `I'm interested in the ${mapped.label}.${availabilitySuffix(intentParam)}`,
      sourceTag: key,
    };
  }

  if (/heli/i.test(key)) {
    return {
      selectValue: "Helicopter Experience",
      messagePrefill: `I'm interested in a helicopter experience (${key.replace(/-/g, " ")}).${availabilitySuffix(intentParam)}`,
      sourceTag: key,
    };
  }

  if (/multi|bhutan|tibet/i.test(key)) {
    return {
      selectValue: "Multi-Country Journey",
      messagePrefill: `I'm planning a multi-country journey (${key.replace(/-/g, " ")}).${availabilitySuffix(intentParam)}`,
      sourceTag: key,
    };
  }

  return {
    selectValue: "Custom Private Journey",
    messagePrefill: `I'm interested in a private journey (${key.replace(/-/g, " ")}).${availabilitySuffix(intentParam)}`,
    sourceTag: key,
  };
}
