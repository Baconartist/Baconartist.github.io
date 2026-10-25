# Andrew Lee — Portfolio

Static GitHub Pages portfolio. No build, framework, API keys, or installation required.

## Pages

- `/`: public portfolio, selected work, background, and contact.
- `/clients/`: the original promotions page, retained with its rates and booking links. Not linked from the portfolio and marked `noindex, nofollow`.
- `/form.html` and `/thanks.html`: existing booking and payment return routes. Retained to preserve external links and PayPal return URLs; navigation returns to `/clients/`. Also marked `noindex, nofollow`.

The client area is unlisted, not password protected. Anyone with the link can open it. Search engines may take time to honor `noindex`.

## Editing

- Portfolio content and gallery cards: `index.html`.
- Design and responsive rules: `portfolio.css`.
- Filters, show-more control, and accessible modal player: `portfolio.js`.
- Video inventory/provenance: `videos.json`. When changing selections, also update the corresponding static cards in `index.html`.
- Locally hosted thumbnails: `assets/`. These avoid expiring TikTok CDN links.
- Legacy client design: `styles.css` (kept separate).
- `followers.json` and its existing scheduled update workflow continue serving the client page.

Videos use TikTok's official iframe player, created only after a visitor selects a film. Each card is also a direct link to the original, so the work remains accessible without JavaScript. Player availability is controlled by TikTok and the viewer's browser/region.

## Metric sources — October 21, 2026

Public TikTok profiles checked in-browser:

| Account | Followers | Likes |
| --- | ---: | ---: |
| @vmmatica | 578,300 | 48.6M |
| @vpolariss | 391,600 | 28.3M |
| @vjubzzs | 196,900 | 12.3M |

Sum: 1,166,800 followers across accounts, displayed conservatively as 1.16M+. This is not a deduplicated audience. The hero's 113.2M views comes from @vmmatica video 7501351915691724075.

500M+ views across platforms, 75M+ sponsored views, and 40 clients are Andrew's documented career results from his provided résumé and confirmed application context. They are not derived by summing this gallery. The 18 gallery entries are six posts from each account's Popular tab, presented in an editorial sequence rather than as an exhaustive all-time ranking. Display titles describe the visuals and are portfolio labels, not original post captions.

Headline and video counts are dated snapshots, not live analytics. Update both the displayed text and this provenance when refreshing them. No employment claims from hypothetical application examples were added.
