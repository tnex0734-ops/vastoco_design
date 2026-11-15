# Official brief alignment

## Source of truth

`vastoco-design-hackathon-2026-problem-statement.pdf` supplied in the conversation (3 pages). This document preserves the official wording and separates it from prototype interpretation.

## Challenge

Redesign the Vastoco homepage as two doors on one platform: one homepage for clients and one for professionals. Both must share one brand and one design system, and each must link clearly to the other.

## Door 1 — Client homepage

The client experience must cover:

- Find verified architects, interior designers and Vastu consultants, starting with Delhi NCR.
- Compare professionals by portfolio, experience, consultation fee and reviews.
- Book a paid video consultation with a clear, upfront fee.
- Explain trust: verified credentials and identity, secure payments, reviews from real consultations.
- Provide a clear CTA to find or book a professional.
- Include a visible link to the professional door.

## Door 2 — Professional homepage

The professional experience must cover:

- Paid consultations, verified profiles and client briefs.
- How verification works, including the COA check for architects.
- Free to join; professionals keep 85% of every consultation.
- A clear Join CTA.
- A visible link to the client door.

## Handover requirements

| Required item | Official size / format | Included in this project |
|---|---|---|
| Client homepage — desktop | 1440px wide | `/clients`, responsive desktop layout |
| Client homepage — mobile | 390px wide | `/clients`, responsive mobile layout |
| Professional homepage — desktop | 1440px wide | `/professionals`, responsive desktop layout |
| Professional homepage — mobile | 390px wide | `/professionals`, responsive mobile layout |
| Design handover | Figma view link or PDF | PDF design and implementation handover |
| Walkthrough | 2–3 minutes | Script outline included in `08-walkthrough-outline.md` |

A code-first submission is consistent with the organisers' email saying coding is optional and a plus point. The official PDF still specifies a Figma link or PDF. The included PDF is prepared as the design-document alternative; confirm acceptance with Vastoco if they expect a Figma file specifically.

## Design guidance preserved

- Use Vastoco name and logo; colours, type and layout are the team's choice, but both doors must belong to one brand.
- Design for India and mobile first; the brief states most visitors will arrive on a phone.
- Do not invent statistics, testimonials or partner logos. Clearly label placeholders.
- Make text readable, contrast adequate and buttons easy to tap.
- Use owned, free-licence or properly licensed assets and credit their sources.

## Evaluation weights

| Criterion | Weight | Design response |
|---|---:|---|
| Clarity of the two doors | 25% | Distinct route content, audience-specific headlines and CTAs, cross-door links |
| Trust and credibility | 20% | Verification explanations, visible consultation fee rules, no fabricated reviews |
| Visual design and brand | 20% | Supplied palette, retained logo, shared typography and custom illustration language |
| Mobile experience | 15% | Intentional 390px layouts, not scaled desktop screenshots |
| Usability and accessibility | 10% | Clear labels, contrast, keyboard focus, responsive controls, reduced motion |
| Walkthrough video | 10% | Rationale and walkthrough outline provided |

## Prototype interpretation (not an official requirement)

The root route `/` is a lightweight visual gateway inspired by the supplied video. It does not replace `/clients` or `/professionals`. Additional prototype routes demonstrate discovery, profile, booking and professional setup, but they are supporting UX demonstrations—not required submission screens and not representations of existing backend capabilities.


## Additional current product-page context (not extra hackathon criteria)

The hackathon PDF remains the source of truth for the judged scope. The current official Vastoco professional page adds useful product details that improve transparency in the prototype:

- Paid consultations require a paid plan, although joining is free.
- Vastoco's 15% commission is deducted from the professional's fee and is not added on top of the client's price; the professional keeps 85%.
- Architects: COA register check plus degree/college documentation.
- Interior designers and Vastu consultants: identity plus qualification or documented practice, supported by relevant certificates, degrees or diplomas.
- Credentials are checked before a professional profile goes live; documents are described as private to the review process.

Source: https://www.vastoco.in/ (official professional homepage, reviewed 10 November 2026). Recheck these details before a public release because the site and product policies may change. Do not present these additions as wording from the hackathon PDF.
