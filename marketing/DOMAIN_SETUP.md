# Paths of Wonder hosting and DNS

Production: **https://pathsofwonder.app**
Host: **Vercel**, Ravensbreath Lab team, `paths-of-wonder` project.
Registrar and DNS provider: **Porkbun** (nameservers unchanged).

Vercel project ID: `prj_hoinQlRrwiI9rH7Z5e3I4NG6IVav`.
GitHub: `jeffnovotny415/adventure-engine`, branch `main`, root `marketing`.
Production fallback: https://paths-of-wonder.vercel.app

## Configured records

These are the Vercel-recommended records applied in Porkbun on September 26,
2026 (America/New_York). The root configuration was verified by Vercel, and the
site was observed loading successfully at `https://pathsofwonder.app` in Chrome.

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A | @ | 216.198.79.1 | 600 |
| A | @ | 64.29.17.1 | 600 |
| CNAME | www | 46d3625ef29c91a6.vercel-dns-017.com | 600 |

Vercel redirects `www.pathsofwonder.app` to `pathsofwonder.app` with HTTP 308.
Porkbun's existing `*.pathsofwonder.app` CNAME to `pixie.porkbun.com` is unchanged;
the explicit www record takes precedence. No mail records existed on this domain,
and no unrelated domain or nameserver settings were changed.

The former root ALIAS was `pixie.porkbun.com`, TTL 600. It was edited to the first
A record above; the second A record and explicit www CNAME were added.

## Secondary domain

`pathsofwonderstories.com` still uses the owner's existing Porkbun Link In Bio
configuration. Its redirect has not been configured or its existing site changed.

## Earlier preview

https://paths-of-wonder.onefjeff.chatgpt.site remains the earlier private Sites
preview. It is not the production host. Its pending custom-domain association was
removed during the Vercel migration. Do not add the old Cloudflare/Sites A or TXT
records; they were never applied at Porkbun.

## Future changes

Push marketing changes to `main` and verify Vercel reports READY for that commit.
Only `marketing/dist` is served publicly. Canonical metadata identifies
`https://pathsofwonder.app/`. Use Vercel's current domain verification output if
routing recommendations change; preserve unrelated DNS and mail settings.
