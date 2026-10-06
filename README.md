# Zunera Haroon — Online Counseling

A single-page site for Zunera Haroon, a licensed psychologist offering online counseling. It is plain HTML, CSS, and JavaScript. Open `index.html` in a browser, or serve the folder with any static host. No build step and no configuration file.

## Run it locally

```bash
python3 -m http.server 47321
```

Then open `http://127.0.0.1:47321`. Fonts and the booking calendar need an internet connection.

## Replace the CONFIG values

Open `script.js`. The block at the top is the only place links and names are defined. The page reads it on load.

| Value | What to put |
| --- | --- |
| `NAME` | Confirm the spelling. It updates the header, about heading, footer, page title, and structured data. |
| `TITLE` | Job title, already set. |
| `WHATSAPP_NUMBER` | Country code plus number, digits only. Every WhatsApp button uses `https://wa.me/<number>?text=<prefill>`. |
| `WHATSAPP_PREFILL` | The message that opens in WhatsApp. |
| `EMAIL` | Confirm the address. It updates the mailto links. |
| `BOOKING_LINK` | The Calendly page, already set to `https://calendly.com/zunera194/session`. Set this to `""` to hide the booking section and every “Book online” button. |
| `LICENSE_LINE` | A license or registration number. Leave `""` and the line stays hidden. |
| `SITE_URL` | The live domain, for example `https://example.com`. When set, the page adds a canonical link and absolute social-image URLs. |

If you change the name, also edit the meta description in `index.html` and keep it between 150 and 160 characters. The visible name updates from `script.js`; the description is written in the HTML so its length stays exact.

Two answers in the FAQ, and the crisis line in the footer, are still written in `index.html`. Search for `[ADD` and replace those sentences.

## Swap the headshot

The current portrait is the outdoor photograph, cropped to 4:5. To use a different one:

1. Use a vertical photo, ratio 4:5 (800×1000 works well).
2. Replace both files. Browsers load the WebP first:
   - `assets/headshot.jpg`
   - `assets/headshot.webp`
3. Keep the photograph under 150 KB.
4. In `index.html`, update the `alt` text on that image so it describes the photo.

[Squoosh](https://squoosh.app) can export both JPG and WebP in the browser. Optional: replace `assets/og-image.jpg` (1200×630) when you want a different image in link previews.

## Deploy in a few minutes

The site is the files in this folder. There is no build command.

**Netlify.** Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag this folder onto the page. Netlify publishes it and gives you a URL.

**Vercel.** Import the project at [vercel.com/new](https://vercel.com/new). Choose Other as the framework, leave the build command empty, and set the output to the repository root. Deploy.

**GitHub Pages.** In the repository settings, turn on Pages from the branch that contains `index.html` at the root, folder `/`. Use relative links as they are here so a project site still finds the CSS and images.

After it is live, set `SITE_URL` in `script.js` to that address.

## Checklist

- [x] Sticky header with name, anchor links (About, Services, How it works, Book, FAQ), WhatsApp button, and a hamburger menu on small screens
- [x] Hero with label, heading, subcopy, WhatsApp and Book buttons, trust row, and a 4:5 rounded portrait
- [x] About, three paragraphs, credentials card, license line hidden until `LICENSE_LINE` is set
- [x] Six service cards and the approaches line
- [x] Three steps: Say hello, Choose a time, Begin at your pace
- [x] Book section with an inline Calendly iframe, fallback links, and header/hero/CTA buttons that scroll to `#book`
- [x] Privacy band with three badges
- [x] FAQ accordion using `details` / `summary`
- [x] Final call to action with WhatsApp, Book, and email
- [x] Footer with name, title, Islamabad, email, disclaimer, and copyright year
- [x] Floating WhatsApp button on small screens, with a safe-area offset
- [x] Smooth scrolling, scroll margin for the sticky header, active link highlighting
- [x] Fade-up on scroll, turned off when reduced motion is requested
- [x] Title, meta description, Open Graph, Twitter card, JSON-LD Person and ProfessionalService
- [x] Commented placeholder for a future Meta Pixel or analytics snippet (nothing installed)
- [x] Favicon: pink circle, letter Z
- [x] Booking UI hides itself when `BOOKING_LINK` is empty

## Placeholders still to fill in

- [ ] **Name spelling** — `NAME` in `script.js` (`[CONFIRM SPELLING]`)
- [ ] **WhatsApp number** — `WHATSAPP_NUMBER` (`[CONFIRM THIS IS HER WHATSAPP NUMBER]`)
- [ ] **Email** — `EMAIL` (`[CONFIRM]`)
- [ ] **License / registration number** — `LICENSE_LINE` is empty (`[ADD LICENSE / REGISTRATION NUMBER, OR LEAVE EMPTY]`)
- [ ] **Domain** — `SITE_URL` is empty (`[ADD DOMAIN LATER]`)
- [ ] **Session length** — FAQ answer is `[ADD SESSION LENGTH, e.g. 45 to 60 minutes]`
- [ ] **Fees** — FAQ answer is `[ADD FEES OR 'Please message me for details']`
- [ ] **Local crisis helpline** — footer line `[ADD A VERIFIED LOCAL CRISIS HELPLINE]`
- [x] **Portrait photograph** — using the outdoor portrait in `assets/headshot.jpg` and `assets/headshot.webp`
- [x] **Share image** — `assets/og-image.jpg` includes that portrait
- [ ] **Analytics** — the commented block in `<head>` is empty on purpose

`BOOKING_LINK` is already set to `https://calendly.com/zunera194/session`. Clear it only if the calendar should come off the page.
