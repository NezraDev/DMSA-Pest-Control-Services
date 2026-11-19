// Alt text for job photos: the caption plus a short place, kept within the 100 characters
// that SEO crawlers (and screen-reader users) handle well.
const maxLength = 100;

/** "Marymount Village, Anos, Los Baños, Laguna" → ["Los Baños, Laguna", "Los Baños"]. */
function placeOptions(generalLocation: string) {
  const parts = generalLocation.split(",").map((part) => part.trim()).filter(Boolean);
  if (parts.length < 2) return [generalLocation];
  return [parts.slice(-2).join(", "), parts.at(-2) as string];
}

export function photoAlt(caption: string, generalLocation: string) {
  for (const place of placeOptions(generalLocation)) {
    const text = `${caption}, ${place}`;
    if (text.length <= maxLength) return text;
  }
  return caption.length <= maxLength ? caption : `${caption.slice(0, maxLength - 1).trimEnd()}…`;
}
