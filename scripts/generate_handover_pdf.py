from pathlib import Path
from PIL import Image
import cairosvg
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Image as RLImage, HRFlowable, KeepTogether
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs' / 'Vastoco-Design-Hackathon-Handover.pdf'
ASSETS = ROOT / 'public' / 'assets'
TMP = Path('/tmp/vastoco-pdf-assets')
TMP.mkdir(parents=True, exist_ok=True)

# Convert web assets to PDF-friendly PNGs; originals remain unchanged.
house = Image.open(ASSETS / 'house-cutaway.webp').convert('RGBA')
house_path = TMP / 'house-cutaway.png'
house.save(house_path)
for name in ['architect-workspace', 'consultation-scene', 'floorplan-sketch']:
    cairosvg.svg2png(url=str(ASSETS / f'{name}.svg'), write_to=str(TMP / f'{name}.png'), output_width=720)
logo = Image.open(ASSETS / 'vastoco-logo.png').convert('RGBA')
logo_path = TMP / 'vastoco-logo.png'
logo.save(logo_path)

ESPRESSO = colors.HexColor('#3C2415')
OAK = colors.HexColor('#DDD9CE')

PAGE_W, PAGE_H = A4

def draw_chrome(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(OAK)
    canvas.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    # slim top rule and footer
    canvas.setStrokeColor(ESPRESSO)
    canvas.setLineWidth(.5)
    canvas.line(16*mm, PAGE_H - 13*mm, PAGE_W - 16*mm, PAGE_H - 13*mm)
    canvas.setFont('Helvetica', 7.5)
    canvas.setFillColor(ESPRESSO)
    canvas.drawString(16*mm, 9*mm, 'VASTOCO · DESIGN HACKATHON 2026 · FRONTEND HANDOVER')
    canvas.drawRightString(PAGE_W - 16*mm, 9*mm, f'{doc.page}')
    canvas.restoreState()

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='Kicker', fontName='Helvetica-Bold', fontSize=8, leading=11, textColor=ESPRESSO, spaceAfter=6, uppercase=True, tracking=1.2))
styles.add(ParagraphStyle(name='HeroTitle', fontName='Times-Roman', fontSize=36, leading=37, textColor=ESPRESSO, spaceAfter=10))
styles.add(ParagraphStyle(name='H1Custom', fontName='Times-Roman', fontSize=27, leading=29, textColor=ESPRESSO, spaceBefore=1, spaceAfter=10))
styles.add(ParagraphStyle(name='H2Custom', fontName='Helvetica-Bold', fontSize=12, leading=15, textColor=ESPRESSO, spaceBefore=8, spaceAfter=5))
styles.add(ParagraphStyle(name='BodyCustom', fontName='Helvetica', fontSize=9.2, leading=14, textColor=ESPRESSO, spaceAfter=6))
styles.add(ParagraphStyle(name='SmallCustom', fontName='Helvetica', fontSize=7.4, leading=10.5, textColor=ESPRESSO, spaceAfter=4))
styles.add(ParagraphStyle(name='TableHead', fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=OAK))
styles.add(ParagraphStyle(name='TableBody', fontName='Helvetica', fontSize=7.6, leading=10, textColor=ESPRESSO))
styles.add(ParagraphStyle(name='QuoteCustom', fontName='Times-Italic', fontSize=16, leading=20, textColor=ESPRESSO, spaceAfter=8))
styles.add(ParagraphStyle(name='NumberCustom', fontName='Times-Roman', fontSize=19, leading=20, textColor=ESPRESSO, alignment=TA_CENTER))

P = lambda text, style='BodyCustom': Paragraph(text, styles[style])

def table(data, widths, header=True, row_heights=None):
    tbl = Table(data, colWidths=widths, rowHeights=row_heights, repeatRows=1 if header else 0, hAlign='LEFT')
    commands = [
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
        ('GRID', (0,0), (-1,-1), .4, ESPRESSO),
    ]
    if header:
        commands += [('BACKGROUND', (0,0), (-1,0), ESPRESSO), ('TEXTCOLOR', (0,0), (-1,0), OAK)]
        if len(data) > 1:
            commands += [('ROWBACKGROUNDS', (0,1), (-1,-1), [OAK, OAK])]
    tbl.setStyle(TableStyle(commands))
    return tbl

story = []

# PAGE 1 — Cover
story.append(Spacer(1, 11*mm))
logo_img = RLImage(str(logo_path), width=39*mm, height=9*mm)
cover_top = Table([[logo_img, P('CODE-FIRST PRODUCT EXPERIENCE<br/><b>10 NOVEMBER 2026</b>', 'SmallCustom')]], colWidths=[75*mm, 90*mm])
cover_top.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'MIDDLE'),('ALIGN',(1,0),(1,0),'RIGHT'),('BOTTOMPADDING',(0,0),(-1,-1),12)]))
story.append(cover_top)
story.append(Spacer(1, 13*mm))
story.append(P('VASTOCO DESIGN HACKATHON 2026', 'Kicker'))
story.append(P('Two doors.<br/>One platform.', 'HeroTitle'))
story.append(P('A responsive frontend prototype for clients and design professionals — built around one shared brand, two distinct journeys and a clear next action.', 'BodyCustom'))
story.append(Spacer(1, 4*mm))

hero_image = RLImage(str(house_path), width=95*mm, height=66*mm, kind='proportional')
cover_info = [
    [P('<b>Door 01 — Clients</b><br/>Find, compare and book verified architects, interior designers and Vastu consultants.', 'BodyCustom'), hero_image],
    [P('<b>Door 02 — Professionals</b><br/>Showcase expertise, build a verified public profile, receive client briefs and offer paid consultations.', 'BodyCustom'), P('<font color="#3C2415"><b>One identity</b></font><br/>Espresso · Pale Oak only<br/>Instrument Serif + Inter', 'BodyCustom')],
]
cover_tbl = Table(cover_info, colWidths=[90*mm, 80*mm])
cover_tbl.setStyle(TableStyle([
    ('BACKGROUND',(0,0),(-1,-1),OAK),('BOX',(0,0),(-1,-1),.6,ESPRESSO),('INNERGRID',(0,0),(-1,-1),.4,ESPRESSO),
    ('VALIGN',(0,0),(-1,-1),'MIDDLE'),('LEFTPADDING',(0,0),(-1,-1),12),('RIGHTPADDING',(0,0),(-1,-1),12),('TOPPADDING',(0,0),(-1,-1),12),('BOTTOMPADDING',(0,0),(-1,-1),12)
]))
story.append(cover_tbl)
story.append(Spacer(1, 8*mm))
story.append(P('Prepared as a frontend-only prototype. No real accounts, verification checks, bookings or payments are connected.', 'SmallCustom'))
story.append(PageBreak())

# PAGE 2 — Brief and scope
story.append(P('01 / THE CHALLENGE', 'Kicker'))
story.append(P('Two audiences. Two clear doors.', 'H1Custom'))
story.append(P('The official brief says one homepage cannot speak clearly to both audiences. Each visitor should know within seconds who the page is for, why Vastoco can be trusted and what to do next. Both doors must share one brand system and link to each other.', 'BodyCustom'))

client_rows = [
    [P('CLIENT HOMEPAGE', 'TableHead'), P('PROFESSIONAL HOMEPAGE', 'TableHead')],
    [P('Find verified professionals starting in Delhi NCR.', 'TableBody'), P('Paid consultations, verified public profiles and client briefs.', 'TableBody')],
    [P('Compare portfolio, experience, consultation fee and reviews.', 'TableBody'), P('Explain verification, including the COA check for architects.', 'TableBody')],
    [P('Book 15, 30 or 45-minute video consultations with upfront fees.', 'TableBody'), P('Free to join; professionals keep 85% of every consultation fee.', 'TableBody')],
    [P('Explain identity and credential checks, secure payments and real consultation reviews.', 'TableBody'), P('Clear Join CTA and visible link to the client door.', 'TableBody')],
]
story.append(table(client_rows, [86*mm, 86*mm]))
story.append(Spacer(1, 7*mm))
story.append(P('Official handover', 'H2Custom'))
required_rows = [
    [P('DELIVERABLE', 'TableHead'), P('SPECIFICATION', 'TableHead'), P('PROJECT ROUTE', 'TableHead')],
    [P('Client desktop', 'TableBody'), P('1440px wide', 'TableBody'), P('/clients', 'TableBody')],
    [P('Client mobile', 'TableBody'), P('390px wide', 'TableBody'), P('/clients', 'TableBody')],
    [P('Professional desktop', 'TableBody'), P('1440px wide', 'TableBody'), P('/professionals', 'TableBody')],
    [P('Professional mobile', 'TableBody'), P('390px wide', 'TableBody'), P('/professionals', 'TableBody')],
    [P('Handover + walkthrough', 'TableBody'), P('Figma link or PDF + 2–3 minute video', 'TableBody'), P('PDF and outline included', 'TableBody')],
]
story.append(table(required_rows, [52*mm, 71*mm, 49*mm]))
story.append(Spacer(1, 5*mm))
story.append(P('<b>Evaluation weights:</b> Clarity of the two doors 25% · Trust and credibility 20% · Visual design and brand 20% · Mobile experience 15% · Usability and accessibility 10% · Walkthrough video 10%.', 'SmallCustom'))
story.append(P('<b>Supplementary current product context (not extra hackathon criteria):</b> Vastoco’s current professional page says paid consultations require a paid plan; the 15% commission is deducted from the professional’s fee, not added to the client’s price. It also describes profession-specific credential checks. Recheck the live policy before release.', 'SmallCustom'))
story.append(PageBreak())

# PAGE 3 — Design system
story.append(P('02 / VISUAL SYSTEM', 'Kicker'))
story.append(P('Architectural editorial, not generic SaaS.', 'H1Custom'))
story.append(P('The visual direction uses only the supplied Espresso/Pale Oak palette, the supplied Vastoco wordmark geometry in a monochrome Espresso treatment, two-colour architectural illustration and a restrained editorial type pairing. The gateway hero adapts only the framed-screen treatment from the supplied video.', 'BodyCustom'))

swatches = []
for name, hx, col in [
    ('Espresso', '#3C2415', ESPRESSO), ('Pale Oak', '#DDD9CE', OAK)
]:
    label_color = '#DDD9CE' if name == 'Espresso' else '#3C2415'
    block = Table([[P('<font color="%s"><b>%s</b><br/>%s</font>' % (label_color, name, hx), 'SmallCustom')]], colWidths=[27*mm], rowHeights=[23*mm])
    block.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),col),('BOX',(0,0),(-1,-1),.5,ESPRESSO),('VALIGN',(0,0),(-1,-1),'BOTTOM'),('LEFTPADDING',(0,0),(-1,-1),4),('RIGHTPADDING',(0,0),(-1,-1),4),('TEXTCOLOR',(0,0),(-1,-1),OAK if name == 'Espresso' else ESPRESSO)]))
    swatches.append(block)
swatches_tbl = Table([swatches], colWidths=[84*mm, 84*mm])
swatches_tbl.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),1),('RIGHTPADDING',(0,0),(-1,-1),1)]))
story.append(swatches_tbl)
story.append(Spacer(1, 3*mm))
story.append(P('No third hue is used in the live UI or runtime illustrations. Translucency is created only by varying the opacity of Espresso or Pale Oak; statuses use labels and icons rather than red/green coding.', 'SmallCustom'))
story.append(Spacer(1, 5*mm))

palette_info = [
    [P('<b>Typography</b><br/>Instrument Serif for display headlines.<br/>Inter for body, navigation and forms.', 'BodyCustom'), P('<b>Spacing</b><br/>8px base scale: 4, 8, 12, 16, 24, 32, 48, 64, 88, 112.<br/>Content max width: 1240px.', 'BodyCustom')],
    [P('<b>Shape and surface</b><br/>6px controls · 12px cards · 20px large surfaces · 28px hero frame. Hairline borders and selective shadows.', 'BodyCustom'), P('<b>Motion</b><br/>One monitor-stage scene loop in the gateway, with a pause control. Transform/opacity only. Reduced-motion mode freezes the scene.', 'BodyCustom')],
]
palette_tbl = Table(palette_info, colWidths=[86*mm, 86*mm])
palette_tbl.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),OAK),('BOX',(0,0),(-1,-1),.5,ESPRESSO),('INNERGRID',(0,0),(-1,-1),.4,ESPRESSO),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),10),('RIGHTPADDING',(0,0),(-1,-1),10),('TOPPADDING',(0,0),(-1,-1),9),('BOTTOMPADDING',(0,0),(-1,-1),8)]))
story.append(palette_tbl)
story.append(Spacer(1, 7*mm))

art_left = RLImage(str(TMP / 'architect-workspace.png'), width=55*mm, height=43*mm, kind='proportional')
art_mid = RLImage(str(TMP / 'consultation-scene.png'), width=55*mm, height=43*mm, kind='proportional')
art_right = RLImage(str(TMP / 'floorplan-sketch.png'), width=55*mm, height=43*mm, kind='proportional')
art_tbl = Table([[art_left, art_mid, art_right], [P('Professional practice', 'SmallCustom'), P('Consultation journey', 'SmallCustom'), P('Architectural planning', 'SmallCustom')]], colWidths=[57*mm]*3)
art_tbl.setStyle(TableStyle([('ALIGN',(0,0),(-1,-1),'CENTER'),('VALIGN',(0,0),(-1,-1),'MIDDLE'),('BACKGROUND',(0,0),(-1,0),OAK),('BOX',(0,0),(-1,-1),.4,ESPRESSO),('INNERGRID',(0,0),(-1,-1),.3,ESPRESSO),('TOPPADDING',(0,0),(-1,-1),6),('BOTTOMPADDING',(0,0),(-1,-1),5)]))
story.append(art_tbl)
story.append(PageBreak())

# PAGE 4 — UX journeys
story.append(P('03 / USER JOURNEYS', 'Kicker'))
story.append(P('Let intent guide the next step.', 'H1Custom'))
story.append(P('Do not block a first-time visitor with an arrival popup. Let them understand Vastoco and explore. Capture a role when an account-dependent action begins, and skip redundant questions when the visitor arrived through a role-specific CTA.', 'BodyCustom'))

journey_rows = [
    [P('CLIENT JOURNEY', 'TableHead'), P('PROFESSIONAL JOURNEY', 'TableHead')],
    [P('Discover professionals', 'TableBody'), P('Understand the professional value', 'TableBody')],
    [P('Compare portfolio, experience, fee and reviews', 'TableBody'), P('Create an account and describe the practice', 'TableBody')],
    [P('Review credentials and profile details', 'TableBody'), P('Complete the applicable verification flow', 'TableBody')],
    [P('Choose a 15/30/45-minute consultation', 'TableBody'), P('Add a professional introduction and projects', 'TableBody')],
    [P('Share budget, scope and timeline', 'TableBody'), P('Preview a public profile; status remains pending', 'TableBody')],
    [P('Review fee and continue to secure payment', 'TableBody'), P('Set up consultation offering after policy is confirmed', 'TableBody')],
]
story.append(table(journey_rows, [86*mm, 86*mm]))
story.append(Spacer(1, 7*mm))
story.append(P('Context-aware account entry', 'H2Custom'))
role_rows = [
    [P('ENTRY ACTION', 'TableHead'), P('EXPECTED BEHAVIOUR', 'TableHead')],
    [P('Find a professional → Book', 'TableBody'), P('Carry client intent into signup/sign-in; preserve selected professional and return destination.', 'TableBody')],
    [P('Join Vastoco', 'TableBody'), P('Enter professional setup without asking the user to choose their role again.', 'TableBody')],
    [P('Generic Create account', 'TableBody'), P('Show the two-option role selector because context is unknown.', 'TableBody')],
    [P('Existing user clicks Create account', 'TableBody'), P('Provide a clear route to Sign in rather than making a duplicate identity.', 'TableBody')],
]
story.append(table(role_rows, [58*mm, 114*mm]))
story.append(Spacer(1, 7*mm))
story.append(P('One account with multiple roles is a possible future model, but the official brief does not confirm that Vastoco supports it. Validate before implementing role switching or multi-role accounts.', 'SmallCustom'))
story.append(PageBreak())

# PAGE 5 — Scope and engineering
story.append(P('04 / BUILD AND HANDOVER', 'Kicker'))
story.append(P('Small, deliberate, responsive.', 'H1Custom'))
story.append(P('The implementation is a dependency-free static frontend. The four official homepage views are the priority; supporting routes demonstrate how the two journeys can continue without building a full marketplace backend.', 'BodyCustom'))

route_rows = [
    [P('ROUTE', 'TableHead'), P('PURPOSE', 'TableHead')],
    [P('/', 'TableBody'), P('Visual gateway with animated monitor-stage hero and both doors.', 'TableBody')],
    [P('/clients', 'TableBody'), P('Official client homepage, responsive 1440px / 390px.', 'TableBody')],
    [P('/professionals', 'TableBody'), P('Official professional homepage, responsive 1440px / 390px.', 'TableBody')],
    [P('/signup · /signin', 'TableBody'), P('Shared authentication entry; role selector only when intent is unknown.', 'TableBody')],
    [P('/clients/explore · /clients/professional · /clients/booking', 'TableBody'), P('Illustrative discovery, profile and booking prototype.', 'TableBody')],
    [P('/professionals/join', 'TableBody'), P('Five-step professional setup with COA field and project image preview.', 'TableBody')],
]
story.append(table(route_rows, [74*mm, 98*mm]))
story.append(Spacer(1, 6*mm))

engineering_rows = [
    [P('ENGINEERING CHOICE', 'TableHead'), P('WHY', 'TableHead')],
    [P('HTML, CSS and JS modules', 'TableBody'), P('No framework runtime needed for the static prototype; lower dependency and bundle cost.', 'TableBody')],
    [P('Native browser APIs', 'TableBody'), P('Forms, dialog and image previews without a UI library.', 'TableBody')],
    [P('CSS motion', 'TableBody'), P('One isolated hero animation using transform/opacity; reduced-motion support.', 'TableBody')],
    [P('Node built-in server', 'TableBody'), P('Local routes, static assets and build output without install-time packages.', 'TableBody')],
]
story.append(table(engineering_rows, [62*mm, 110*mm]))
story.append(Spacer(1, 5*mm))
story.append(P('<b>Validation:</b> 11 automated tests passed; static build passed; required routes and assets returned HTTP 200. A browser screenshot run could not be completed in the build environment, so the manual viewport/keyboard review remains a release task.', 'SmallCustom'))
story.append(P('<b>Run locally:</b> `npm run dev` · `npm test` · `npm run build` · `npm run preview` (Node.js 20+; no dependencies).', 'SmallCustom'))
story.append(Spacer(1, 4*mm))
story.append(P('<b>Not connected:</b> authentication, credential verification, live professional inventory, bookings, secure payment, video calls, reviews, backend profile publishing and file storage. Demo content is clearly labelled; no fake metrics or testimonials are shown.', 'SmallCustom'))
story.append(PageBreak())

# PAGE 6 — Edge cases, skills and final checklist
story.append(P('05 / QUALITY AND RELEASE', 'Kicker'))
story.append(P('Truthful states are part of trust.', 'H1Custom'))
story.append(P('Important states are documented and represented where possible. Do not let an empty inventory, pending check or payment failure become a misleading success state.', 'BodyCustom'))

edge_rows = [
    [P('STATE', 'TableHead'), P('EXPECTED UX', 'TableHead')],
    [P('No professionals or reviews', 'TableBody'), P('Use explicit empty states and labelled placeholders. Never fabricate ratings or review counts.', 'TableBody')],
    [P('Verification pending', 'TableBody'), P('Show pending; only show verified after a real successful check.', 'TableBody')],
    [P('COA field', 'TableBody'), P('Show for architect path; do not imply the number is checked in this prototype.', 'TableBody')],
    [P('Upload failure / file limit', 'TableBody'), P('Preserve prior form values, show allowed types and size limit, and offer retry.', 'TableBody')],
    [P('Booking slot or payment failure', 'TableBody'), P('Keep project details and let the client choose another slot or retry securely after backend integration.', 'TableBody')],
    [P('User has both roles', 'TableBody'), P('Only offer role switching if Vastoco confirms multi-role accounts.', 'TableBody')],
]
story.append(table(edge_rows, [55*mm, 117*mm]))
story.append(Spacer(1, 6*mm))
story.append(P('Agent guidance', 'H2Custom'))
story.append(P('The workspace includes the Ponytail skill in full mode, plus Vastoco visual-design and frontend-review skills. External references reviewed: UI UX Pro Max, Anthropic Frontend Design, Emil Design Eng and Vercel Web Design Guidelines. Antigravity loads workspace skills from `.agents/skills/` and project rules from `AGENTS.md`.', 'BodyCustom'))
story.append(P('Sources: https://github.com/DietrichGebert/ponytail · https://skill-issue.in/?domain=design · https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · https://github.com/anthropics/skills · https://github.com/emilkowalski/skills · https://antigravity.google/docs/skills', 'SmallCustom'))
story.append(Spacer(1, 4*mm))
story.append(P('Before submission', 'H2Custom'))
check_items = [
    'Review both homepage routes at 1440px and 390px in a real browser.',
    'Check mobile overflow, keyboard navigation, focus, forms, dialog and reduced motion.',
    'Replace any placeholder only with approved Vastoco data; keep all claims evidence-backed.',
    'Confirm that the PDF handover satisfies the organiser’s Figma/PDF requirement.',
    'Record the 2–3 minute walkthrough and test every link outside the team.',
    'Submit one email to info@vastoco.in with team details, registration reference, PDF/link and video link before the deadline.'
]
for item in check_items:
    story.append(P('[ ]  ' + item, 'BodyCustom'))

pdf = SimpleDocTemplate(str(OUT), pagesize=A4, rightMargin=19*mm, leftMargin=19*mm, topMargin=20*mm, bottomMargin=17*mm, title='Vastoco Design Hackathon 2026 — Frontend Handover', author='Vastoco project team')
pdf.build(story, onFirstPage=draw_chrome, onLaterPages=draw_chrome)
print(OUT)
