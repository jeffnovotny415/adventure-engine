# Connecting pathsofwonder.app

The marketing preview is deployed privately at:
https://paths-of-wonder.onefjeff.chatgpt.site

Primary domain: **pathsofwonder.app**, registered at Porkbun.
The hosting service has registered this hostname; DNS and TLS verification are
still pending. This is not yet a public website on the custom domain.

## DNS records supplied by the host

In Porkbun's DNS editor for `pathsofwonder.app`, add these records. Host values
below are relative to `pathsofwonder.app`; use the blank/root host field for `@`
if that is how the editor represents the domain itself.

| Type | Host | Answer / value |
| --- | --- | --- |
| A | @ | 162.159.143.30 |
| A | @ | 172.66.3.26 |
| TXT | _openai-site-verification | openai-site-verification=m6NFbfvJRJctMP1bbd9JT8i46i1ZcPYJn4R5UHd3BgA |
| TXT | _cf-custom-hostname | db2c1785-757d-4016-92e7-11ef642eb9cc |

Inspect existing root A/AAAA/CNAME records before replacing conflicting parking
or web hosting records. Preserve mail records and unrelated verification records.
These values were returned by the hosting service on September 26, 2026 (local).
Use the host's current verification status if it supplies additional TLS records.

## Finish launch

1. Add the DNS records and refresh domain status in the hosting service.
2. Confirm hostname routing and certificate status are active.
3. Make the site public when ready for visitors; the current deployment is private.
4. Verify `https://pathsofwonder.app` in a signed-out browser.
5. Configure the secondary domain `pathsofwonderstories.com` to redirect to
   `https://pathsofwonder.app` after the primary works. That redirect is not yet set.
6. Add canonical metadata for the verified primary origin when public launch is ready.

Sites identifiers for follow-up:
- Project: `appgprj_6ab883c836b8819186000090d3293f0f`
- Custom domain: `appgdom_6ab886788fa08191805085f196d740fa`

No Porkbun settings have been modified by this task.
