# The Experience Company — Site Revamp Design

> A dark, mysterious, sci-fi marketing site told as one scroll. Direction B
> (blueprint / field-manual) expressed as a **bordered hairline grid** in the
> style of Vercel / Cursor / Linear. Plain, certain, Steve-Jobs-voice copy.
> Constrained centered column. Subtle draw-in motion.

---

## 1. Locked direction

| Decision | Choice |
|---|---|
| Story spine | Evolution of the human — we make people more capable. Glasses, GAIA, robotics are three expressions of one idea. |
| Visual language | **Blueprint / wireframe**, delivered through a **bordered grid scaffold** (hairline rails + `+` crosshairs), Vercel/Cursor style. |
| Copy voice | Plain, confident, human — Jobs cadence. No cryptic "X of the system" language. Concrete truths said with conviction. |
| Layout | Constrained, centered (~720px). Subtle. Few headings. Images + normal text living in grid cells. |
| Type | `Doto` (already loaded) for the wordmark, tiny labels, and numbers. A readable monospace for body. |
| Motion | Subtle: hairlines draw in, `+` marks fade up, text rises a few px on scroll. Hero lines reveal in sequence. Honor `prefers-reduced-motion`. |
| Imagery | Monochrome white-on-black blueprint/wireframe line art (see §6). Human→robot evolution, Creation-of-Adam touching fingers, glasses blueprints. |

---

## 1b. Avoiding AI slop (the bar)

The only thing separating "intentional" from "generated" here is **specifics and restraint**. Hold to these.

**Copy**
- **Concrete over abstract, always.** A real detail ("shows the name of the person you just shook hands with") beats any adjective ("seamless," "powerful," "revolutionary"). If a sentence would survive on any other company's site, cut it.
- **Kill the tells:** no "it's not X, it's Y," no "we don't build products, we build Y," no tidy triples ("see with you, think with you, work beside you"), no "imagine a world," no *empower / unlock / elevate / seamless / harness*. Go easy on em-dashes.
- **Admit the hard parts.** Slop is always certain and frictionless. "This is the hardest thing we'll build" is something only a real team writes.
- **Vary the rhythm.** Short. Then a longer sentence that earns its length. Not everything parallel, not everything polished.
- **Say the thing a committee wouldn't.** An actual opinion is the least fakeable signal there is.
- **Less of it.** Two true sentences beat a confident paragraph.

**Images**
- **Curate ruthlessly** — generate ~10, keep 1. Using the first acceptable output is the classic slop tell.
- Line-art / blueprint hides AI tells better than rendered scenes (no plastic skin, no melted geometry, no fake glow) — part of why we chose it.
- No embedded gibberish text, no nonsense UI, no extra fingers — check hands especially (ironic, given §6.2).
- Keep the set consistent; one off-style image makes the whole page look auto-generated.
- Use the real thing where possible — actual GAIA UI, a real photo — over a generated stand-in.

**Design**
- The restraint is the brand. No gradient-on-dark, no glassmorphism, no floating 3D blobs, no brain-with-circuits iconography.
- Let it be a little quiet and a little asymmetric. Perfectly even, perfectly centered, perfectly glossy is the look people now read as "AI made this."

---

## 2. Design language

### Color
- **Background:** `#000000` pure black.
- **Text — primary:** `#ffffff`.
- **Text — secondary:** `zinc-300` (`#d4d4d8`).
- **Text — labels / meta / status:** `zinc-500` (`#71717a`), lowercase.
- **Hairlines / grid rails:** `rgba(255,255,255,0.08)` → `0.12` (≈ `zinc-900`/`zinc-800`). Dashed variant for accent borders (already used on the project cards).
- **Accent:** stay monochrome. The **only** thing allowed to "light up" is GAIA's `live today` tag — give it the brightest treatment on the page (pure white, or a single 6px green status dot). Everything else reads as *in fabrication*. That restraint is what makes the live product feel special and the rest feel mysterious.

### Typography
- **Display / wordmark / labels / section numbers:** `Doto`.
- **Body:** a readable monospace — recommend `Geist Mono`, `JetBrains Mono`, or `IBM Plex Mono` (Doto is too dotty for paragraphs). Add it alongside Doto in `astro.config.mjs` fonts and expose as `--font-body`.
- Tracking stays tight (global already does this). Body line-height relaxed (`leading-relaxed`).

### The bordered grid (the core of the look)
The wireframe **becomes the page itself**, instead of being decoration:

- A centered content column, **~720px max-width**, held between **two faint vertical hairlines** that run the full height of the document (the "rails").
- **Horizontal hairlines** divide the page into sections, spanning rail to rail.
- A small **`+` crosshair** sits at every intersection of a rail and a horizontal line (CSS pseudo-elements, `zinc-600`, ~10px).
- Optional: a barely-there dotted background grid inside cells. Keep it *very* faint or omit.
- Inside sections, subdivide into 2- or 3-column grids with internal vertical hairlines where it helps (e.g. text | image rows).
- Generous vertical padding per cell (`py-20`–`py-28`) so the scroll has pacing and rhythm.
- On mobile: rails hug the screen edge with `px-5`; multi-column grids collapse to one column; `+` marks thin out.

```
 +───────────────────────────────────────────────────+   ← top rail + corner crosshairs
 │  the experience company                       · ·  │
 │                                                     │
 │    We build technology that makes                   │
 │    people more capable.                             │
 │    Technology should give you your life back.       │
 │    We're building a better experience for           │
 │    being human.                                     │
 │                                              ↓      │
 +─────────────────────────────+───────────────────────+   ← section rule + mid crosshair
 │  we're a small team of      │   [ wireframe human ] │
 │  hackers, engineers and     │                       │
 │  designers...               │                       │
 +───────────────────────────────────────────────────+
 │  smart glasses                        in development│
 │        ◦──────[ glasses blueprint ]──────◦          │
 │  A screen you never have to look down at.           │
 +───────────────────────────────────────────────────+
 │  gaia                                     live today│
 │   ...                                     → heygaia │
 +───────────────────────────────────────────────────+
       ↑ left rail            ↑ right rail
```

### Motion
- **Reveal on scroll** (IntersectionObserver): `opacity 0→1`, `translateY 12px→0`, optional `blur 4px→0`, ~600ms ease-out, children staggered ~80ms.
- **Hairlines draw in:** `scaleX`/`scaleY 0→1`, `transform-origin` left/top, on section enter.
- **`+` marks:** fade + scale in just after their lines settle.
- **Hero:** the three lines reveal in sequence on load (~150ms apart); the `↓` cue appears last.
- **Big evolution image:** allow a faint parallax drift, nothing else.
- **`prefers-reduced-motion`:** disable transforms/parallax, render everything visible immediately.

---

## 3. Page structure (scroll spine)

```
00  HERO          wordmark · three-line thesis · scroll cue
01  WHO WE ARE    short manifesto, plain voice
02  THE WORK      three products, each = small label + blueprint image + 2 lines
                    · smart glasses   — in development
                    · gaia            — live today        → heygaia.io
                    · household robotics — in research
03  CONNECTION    why a software company builds glasses + robots · human→robot + touching-fingers imagery
04  CLOSE         Steve Jobs quote · "we'd love to meet you" · email · github · x
```

The existing braille "march-of-progress" ASCII art can stay as a quiet texture near **03 Convergence** — it rhymes perfectly with the evolution imagery.

---

## 4. Copy deck (final)

### 00 · Hero
Wordmark: **the experience company**

Three lines, sequential reveal. Line 1 is the headline (largest, white); lines 2–3 follow a touch smaller and quieter (`zinc-300`):

> We build technology that makes people more capable.
>
> Technology should give you your life back.
>
> We're building a better experience for being human.

Scroll cue: `↓`

### 01 · Who we are
> We're a small team of hackers, engineers, and designers. We build the things we wish existed.
>
> We think the best technology gives you more and asks for less — more time, more attention, more room to be human — and then gets out of the way. Most technology today does the opposite. We're building the other kind.
>
> Everything worth building looks impossible right up until someone builds it. That's the part we like.

### 02 · The work
*(Optional single quiet line, or none at all):* `here's what we're working on`

> **Drafts below have assumptions marked `» confirm:`. Replace with the real
> product vision before launch — invented specifics are the fastest route back
> to slop.**

**smart glasses** · `in development` — *spec-sheet treatment: lead copy + blueprint dotted-leader list*

Lead:
> GAIA, on your face. A display only you can see, a camera that sees what you see, and an assistant you just talk to. It paints your directions onto the road ahead, picks up the call you don't want to take, and remembers the things you'd have forgotten by dinner. You run it with your voice, your eyes, and your hands — no controller, no phone in your palm.
>
> Most smart glasses are bricks you'd never wear in public. These are meant to be light, cheap, and good-looking enough that you forget they're smart at all.

Spec list (renders as a dotted-leader blueprint list, monochrome, `Doto` labels):

    display ........ visible only to you
    voice .......... "hey gaia"
    navigation ..... directions painted on the road, live
    memory ......... auto-captures what's worth keeping
    control ........ voice · eye-tracking · blink · finger gestures
    calls .......... gaia can screen and answer them
    audio .......... bone conduction, ears stay open
    lenses ......... clear → sunglasses, one press
    power .......... solar across the whole frame
    build .......... light, affordable, and not ugly

> *Optional one-line nod to the bigger ambition (the OS / platform play):*
> Underneath, it's a real OS — open for anyone to build on, and ship to in a single click.

**Curation note — kept OFF the public page on purpose** (these live in the product
spec, not on a teaser; dumping them is the road back to slop): pricing &
subscription tiers, the SDK + 1-click-deploy "fix the App/Play Store" platform
strategy, eye-biometric login, and phone-pairing mechanics. Hint at the platform
with the single optional line above — never the roadmap. Source brain-dump archived
in §8.

**gaia** · `live today`
> Most assistants wait for you to ask, then forget you the second you close the tab. GAIA doesn't. It reads your inbox before you do, watches your calendar, drafts your replies, and runs the multi-step work you'd never get around to — then remembers all of it, so it's sharper next month than it is today. You message it from wherever you already are; it works on its own in the background.
>
> It's live, open source, and already doing this. → heygaia.io
>
> Where it's headed: off the screen and onto your body. Paired with the glasses, GAIA goes everywhere you go — and the goal is simple, and a little unreasonable: an assistant that knows you well enough, and can do enough, to handle anything you'd handle yourself. Everyone deserves a Jarvis.

*(Verified against the live product + manifesto — see §9. "everyone deserves a
Jarvis" is GAIA's own line, used deliberately.)*

**household robotics** · `on the horizon`
> AI learned to make art and music — the parts of being human we'd least want to give up — while the laundry still piles up in the other room. We think that's backwards. The boring, physical, repetitive work is exactly what machines should take off our hands.
>
> We haven't built anything yet; this is a conviction more than a product. The home is the last place technology really forgot, and the chores that quietly eat your evenings are the ones worth automating first. It's the hardest thing on this page — and the one we're most sure about.

*(Honesty is the point: admitting "we haven't built anything yet" reads as a real
team, not a marketing page. The art-vs-laundry line is the strongest opinion on the
site — keep it front and center.)*

### 03 · The connection *(no on-page heading)*
> People ask why a software company is building glasses and robots. We don't really think of ourselves as a software company. We think most of what fills your day — the digital admin, the errands, the housework — is work you never should have been doing. GAIA takes the digital load. The glasses carry it with you. Robots take the physical load at home. The screen was just where we started.

*Alternate, plainer:*
> Three products, one reason: the work of running your life shouldn't fall on you. Software that knows you, hardware that goes with you, machines that act for you.

*This ties the page together: GAIA's manifesto already frames digital admin as
"servants to our tools" stealing your time; robotics extends the exact same belief
to physical work. One thesis — give people their time back — pointed at the screen,
the body, and the home.*

### 04 · Close
> "The people who are crazy enough to think they can change the world are the ones who do."
> — Steve Jobs

> If you want to help build this, we'd love to meet you.
> email · github · x

---

## 5. Build notes (for when we implement)

- Astro page broken into section components: `Hero`, `Manifesto`, `Work` (with `ProductRow`), `Convergence`, `Close`.
- A `GridFrame` layout wrapper that paints the two vertical rails + `+` crosshairs once, so every section inherits the frame.
- A tiny `Reveal` mechanism: a vanilla `IntersectionObserver` script toggling a `data-revealed` attribute + CSS transitions (no React island needed → lighter, no hydration). Gate on `matchMedia('(prefers-reduced-motion: reduce)')`.
- Add `--font-body` (Geist/JetBrains/IBM Plex Mono) to the Astro fonts config next to `Doto`.
- Images go in `/public`, rendered via `astro:assets` `<Image>` with descriptive `alt`. Keep them monochrome so they sit inside the black grid seamlessly.
- Preserve all existing SEO / JSON-LD schema; just update the copy strings and add the new sections.
- Keep width constrained (`max-w-[720px] mx-auto`); the rails define the frame, padding handles mobile.

---

## 6. Image plan + GPT image prompts

Short prompts beat long ones with `gpt-image-1`. Every prompt below is **complete and copy-paste ready** — the style and a transparent background are already baked in, so the whole set matches and drops straight onto the black grid.

> **Tips:** aspect ratio is noted per image. Generate the set in one session so they stay consistent — and generate ~10, keep the best 1 (see §1b). If one comes out too plain, add one concrete detail rather than a paragraph.

---

### 6.1 — Human → robot evolution (the centerpiece, §03)

**6.1a — March of progress (recommended).** *Wide ~16:6.*
```
A "march of progress" line-up left to right — ape, upright human, human in smart glasses, humanoid robot — with the anatomy gradually turning mechanical. White line-art blueprint, monochrome, minimal, fine clean lines, lots of negative space, transparent background, no text.
```

**6.1b — Half human / half machine.** *Portrait/square.*
```
A standing human figure, front view, split down the middle: left half human anatomy, right half mechanical android. White line-art blueprint, monochrome, minimal, fine clean lines, lots of negative space, transparent background, no text.
```

**6.1c — Dissolve.** *Portrait/square.*
```
A human figure dissolving into a humanoid robot, the body breaking apart into wireframe lines and particles. White line-art blueprint, monochrome, minimal, fine clean lines, lots of negative space, transparent background, no text.
```

---

### 6.2 — The touch (Creation of Adam, human + robot — §03 emotional beat)

**6.2a — Cinematic close-up (recommended).** *Wide ~16:9.*
```
Close-up of a human hand and a robotic hand reaching toward each other, fingertips almost touching, like the Creation of Adam. Monochrome white line art with soft minimal shading, lots of negative space, transparent background, no text.
```

**6.2b — Blueprint version.** *Wide ~16:9.*
```
A human hand and a robotic hand nearly touching (Creation of Adam pose), drawn as a blueprint with fine joint details and a few dimension lines. White line-art blueprint, monochrome, minimal, fine clean lines, lots of negative space, transparent background, no text.
```

---

### 6.3 — Smart glasses blueprints (§02, "smart glasses")

**6.3a — Front spec sheet (recommended).** *Wide/square.*
```
Front-view blueprint of sleek minimal smart glasses, with thin dimension lines, a couple of small callout circles, and a faint grid behind. White line-art blueprint, monochrome, minimal, fine clean lines, lots of negative space, transparent background, no text.
```

**6.3b — Exploded view.** *Square/wide.*
```
Exploded-view diagram of smart glasses at a 3/4 angle, the parts floating apart along thin alignment lines. White line-art blueprint, monochrome, minimal, fine clean lines, lots of negative space, transparent background, no text.
```

**6.3c — Side profile.** *Wide.*
```
Side-profile schematic of minimal smart glasses with a small hinge-detail callout. White line-art blueprint, monochrome, minimal, fine clean lines, lots of negative space, transparent background, no text.
```

---

### 6.4 — GAIA (§02, "gaia") — abstract intelligence

**6.4a — Wireframe planet (recommended — "Gaia" = the living planet).** *Square.*
```
A wireframe sphere of fine latitude/longitude lines, with one faint orbit ring and a few connected nodes around it. White line-art blueprint, monochrome, minimal, fine clean lines, lots of negative space, transparent background, no text.
```

**6.4b — Wireframe mind.** *Square/portrait.*
```
An abstract human head made of white wireframe mesh, dissolving into floating nodes at the edges. White line-art blueprint, monochrome, minimal, fine clean lines, lots of negative space, transparent background, no text.
```

---

### 6.5 — Household robotics (§02, "household robotics")

**6.5a — Home robot (recommended).** *Portrait.*
```
Front-view blueprint of a friendly minimal humanoid home robot, with a height dimension line and a couple of small joint callouts. White line-art blueprint, monochrome, minimal, fine clean lines, lots of negative space, transparent background, no text.
```

**6.5b — Robotic hand at a chore.** *Wide/square.*
```
Blueprint of a robotic hand gently holding a folded towel, with a small detail callout. White line-art blueprint, monochrome, minimal, fine clean lines, lots of negative space, transparent background, no text.
```

---

## 7. Image → section map

| Section | Image | Prompt |
|---|---|---|
| 00 Hero (optional faint accent) | wireframe orb or none | 6.4a |
| 01 Who we are | half-human/half-machine figure | 6.1b |
| 02 smart glasses | front spec sheet (+ exploded as secondary) | 6.3a / 6.3b |
| 02 gaia | wireframe planet | 6.4a |
| 02 household robotics | home robot blueprint | 6.5a |
| 03 Convergence | march of progress **then** the touch | 6.1a → 6.2a |
| 03 (texture) | existing braille ASCII evolution art | — |

---

## 8. Appendix — smart glasses brain-dump (full product spec)

Raw source for the §02 glasses copy. Only a curated slice reaches the public page
(see §02 + curation note); the rest is product spec, kept here so nothing's lost.

**Software**
- "Hey GAIA" voice invocation.
- Maps navigation — visible turn arrows painted on the road, in real time.
- App platform: make it extremely easy for anyone to build and deploy apps.
  - An SDK with 1-click deployments and updates.
  - Solve the existing problems of the App / Play Store and the mobile ecosystem.
- Message notifications.
- Phone calls — GAIA can pick up calls for you.
- Pair with / without a phone.
  - If booting without a phone: eye-biometric login?
- Hand + finger gesture control.
  - Finger tracking to move items in 3D / VR space.
  - Simulate touch and clicks with fingers.
  - Type on a virtual keyboard.
- Eye tracking.
- Eye / eyelid gestures for actions (e.g. blink to take a photo or start recording).
- Auto-create memories from everything the user does and sees.
- Must be cheap, lightweight, accessible — and stylish (other smart glasses are ugly).
- Subscription for advanced GAIA features; basic use (talking up to a limit) is free/reasonable.

**Hardware — "Glass OS" (name TBD)**
- Solar-charging battery across the entire frame, to keep weight down.
- Bone-conduction audio.
- Polarity control — clear glasses → sunglasses on a button press.
- Video recording.
- Display visible only to the wearer ("GAIA Glass Vision", name TBD).

## 9. Appendix — verified GAIA facts (from heygaia.io + /manifesto, fetched 2026-06-02)

Reference for accuracy. The teaser copy uses only a slice; the rest is context.

- **Positioning:** "Your Personal AI Assistant" — an **open-source** personal AI assistant that **proactively manages your email, calendar, todos, workflows and all your digital tools.**
- **The core differentiator (proactive, not reactive):** *"Unlike ChatGPT or Siri which wait for a prompt, GAIA acts on its own."* It *"watches your inbox, calendar and tools and takes action before you ask."*
- **Manifesto pillars (verbatim-ish):** an assistant who *"reads every email before you do and surfaces only what matters… schedules your day optimally, drafts your responses, researches before you ask, and remembers everything you've ever worked on… doesn't wait for commands but anticipates your needs… gets smarter the longer they work with you."* — *"Not just a tool, but a proactive, intelligent presence that knows you, helps you, and works with you."*
- **The kicker:** *"If you believe everyone deserves a Jarvis, join us."* End goal: *"GAIA to be on every device, for every person in the world."*
- **Memory:** connects to your tools, sees your whole digital life, *"remembers everything and understands how it all relates,"* gets smarter over time.
- **Channels:** message it from WhatsApp, Telegram, Slack, Discord, or the web.
- **Integrations:** Gmail, Google Calendar, Google Docs, Slack, Notion, GitHub, Linear, Todoist, Asana, ClickUp, Trello, Microsoft Teams, HubSpot, Twitter, LinkedIn — plus custom integrations via the Model Context Protocol + community marketplace.
- **Trust:** open source, self-hostable for zero cost; *"We never train on your data or sell it."* Free tier covers email automation, calendar management, task organization.
- **Kept off the teaser** (in-the-weeds for a vision page): channel list, integration list, self-hosting, pricing/tiers, MCP marketplace.

---

*Status: direction + full copy locked — hero, manifesto, all three products (glasses
spec-sheet, GAIA verified, robotics thesis), connection, close. Layout + motion +
image prompts ready. Open: pick §03 (A/B), commit or keep iterating, then implement
the Astro revamp per §2–§5 and drop in the generated images.*
