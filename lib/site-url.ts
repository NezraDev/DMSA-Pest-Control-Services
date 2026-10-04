const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const configuredUrlIsPlaceholder = !configuredUrl || /your-domain\.example/i.test(configuredUrl);
const netlifyUrl = process.env.URL?.trim() || process.env.DEPLOY_PRIME_URL?.trim();

function normalizeSiteUrl(value: string) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  const parsedUrl = new URL(withProtocol);

  if (parsedUrl.protocol === "https:" && !parsedUrl.hostname.includes(".")) {
    parsedUrl.hostname = `${parsedUrl.hostname}.netlify.app`;
  }

  return parsedUrl.origin;
}

export const siteUrl = normalizeSiteUrl(
  configuredUrlIsPlaceholder ? netlifyUrl || "http://localhost:3000" : configuredUrl,
);

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}
