# Qiran — Muslim Matrimony & Matchmaking Platform
### Interactive client prototype

A browser-based, clickable demonstration of the three experiences defined in the SOW:
the **mobile application**, the **marketing website** and the **administration panel**.

> This is a client experience prototype, not the production application. It exists so the
> client can see, click and experience the agreed functionality before development completes.
> The production mobile app remains an iOS/Android application built in Flutter, exactly as
> specified in the SOW. Nothing here changes or adds to that scope.

---

## Running it

Open `index.html` in any modern browser — there is no build step and no server required.

To host it for the client, upload the whole folder to any static host (Netlify, Vercel,
S3, or a plain web server) and share the link to `index.html`.

**An internet connection is required**: profile photography is loaded from Unsplash and the
typefaces from Google Fonts.

---

## Screen fidelity

The simulated app always renders at a **true 390 × 844 logical screen** — the resolution of
the target handset. On a window too short to show that at 1:1 the whole device is scaled
down proportionally, so the layout the client sees is always the layout the handset will
produce; the screen is never resized or squashed. On a real phone browser the app drops the
device frame and fills the viewport naturally.

The phone screenshots on the marketing website use the same rule: each renders a real
390 × 844 app screen, scaled to fit its frame. They cannot drift from the app.

---

## Structure

```
index.html                 Shell — loads everything
assets/css/tokens.css      Design tokens, reset, shared primitives
assets/css/shell.css       Prototype home, presenter bar, overlays
assets/css/mobile.css      Mobile application
assets/css/site.css        Marketing website
assets/css/admin.css       Administration panel
assets/js/icons.js         One outline icon family + brand mark
assets/js/ui.js            DOM helpers, photo layer, sheets/modals/toasts
assets/js/data.js          All sample data — the single source of truth
assets/js/mobile.js        Mobile screens and router
assets/js/site.js          Marketing website
assets/js/admin.js         Administration panel
assets/js/app.js           Prototype shell and presenter navigation
```

---

## Presenting it

The dark bar across the top is **prototype navigation**, deliberately separate from the
product UI so the client always knows what is product and what is presentation:

| Control | What it does |
| --- | --- |
| Prototype home | Returns to the showcase screen |
| Mobile app / Marketing website / Admin panel | Jumps straight to an experience |
| Restart demo | Resets the mobile app to the splash screen |
| States | Jumps to supporting states that are hard to reach naturally |
| Demo guide | Presenter notes: the primary journey and things to point out |

### The primary journey

Welcome → Create account → Phone → OTP → Profile setup (11 steps) → Preview → Profile
complete → Discovery → Filters → Apply → View full profile → **Like Amina** → Mutual match
→ Conversation starter → Send → Chat → Typing indicator → Read receipt.

### Demo notes

- **OTP** — any six digits verify. Enter `000000` to show the invalid-code state.
- **Amina Rahman** is the scripted mutual match; she has already liked Yusuf. Liking her
  triggers the match moment. Passing her returns her to the back of the queue so the moment
  stays reachable.
- **Everyone else** demonstrates the honest default: "Liked. We will let you know if it is mutual."
- Discovery cards can be **swiped** as well as tapped.
- **Bio validation** — clear the bio in the About step to show inline validation.
- **Photos** — tap an empty slot for the upload progress, reorder and remove controls.
- **Chat** — send a message to see delivered/read receipts and the typing indicator.
- **Admin** — suspend or restrict an account, or resolve a report, to show the confirmation dialogs.

---

## Sample data

All people, names, conversations and records are fictional and consistent across every
surface: Amina Rahman is the same person in Discovery, the match celebration, Matches, Chat
and the admin panel.

The demo user is **Yusuf Karim**, 29, an architect in London.

### Replacing the photography

Every image in the prototype resolves through one place. To swap in the client's own
licensed photography, replace the identifiers in the `PX` map at the top of
`assets/js/data.js` and adjust `photo()` in `assets/js/ui.js` to point at the new source.
Nothing else needs to change.

---

## Scope

Included, matching the SOW: phone (OTP) and email authentication; an eleven-step profile
builder; all twelve discovery filters; a daily recommendation queue with rule-based,
filter-weighted ranking; Like/Pass; mutual matching; conversation starters; 1:1 text chat
with typing indicators and read receipts; profile management; a five-page marketing site;
and an operational admin panel covering users, matches, conversation metadata and moderation.

Deliberately **not** present anywhere in the prototype: ID or selfie verification, social
login, payments, subscriptions, premium tiers, boosts, AI matchmaking or compatibility
scoring, voice notes, voice or video calling, profile video, reply-or-unmatch nudges,
advanced analytics, automated moderation.
