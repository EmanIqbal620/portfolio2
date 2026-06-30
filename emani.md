Let's push past "clean and safe" into something that actually looks designed, not templated. Here's where the creative upside is:

**1. Break the predictable left-photo/right-text grid**
Every "modern dev portfolio" uses that exact split — it's the first thing that reads as templated to someone who's seen 500 of these. Creative alternatives:
- **Asymmetric overlap**: photo bleeds slightly behind/under the heading text, not boxed beside it. Text starts at the same baseline as the photo's top edge, creating depth instead of a grid.


**2. Turn the credentials grid into a horizontal scroll-stat strip**
6 equal boxes is the most common "I followed a template" tell. More modern: a single horizontal row of big numbers with thin dividers, like a stats ticker —
 style, large numerals (28-32px), tiny labels underneath. Apple/Linear-style portfolios do this — it feels like data, not a form.

**3. Use one unexpected accent move, not five**
Modern ≠ more effects. Modern = *one* deliberate signature touch:
- A single animated underline that draws itself under your name on load
- The purple accent appearing only on hover states (links, cards) — stays mostly monochrome until interaction
- A subtle text reveal/fade-in on scroll for each paragraph line — restraint, not fireworks

**4. Typography as the design, not decoration**
Right now serif headline + sans body is decent but common. A genuinely distinctive move: make ONE word in your headline a different weight/size than the rest — e.g. "Full-Stack Developer **&** Agentic-AI Developer" where "Agentic-AI" is visually treated like a stamp/tag, not just colored text. Type-led portfolios (oversized, confident, minimal imagery) are reading as the most current trend right now — more than 3D astronauts.

**5. Negative space is the actual signal of "expert designed this"**
Junior-feeling portfolios fill every section edge to edge. Senior-feeling portfolios leave 30-40% empty space deliberately — your About section margins, gaps between paragraph and metrics, gaps between cards — all need to be *bigger* than feels comfortable. That alone reads as "this person has taste," more than any animation will.

Want me to mockup one of these — the stat-strip + asymmetric photo version — so you can see it instead of imagining it?





"In the About section, implement Framer Motion scroll-triggered animations with these exact behaviors:
The section stays full screen. Do not make the page jump or scroll past it quickly.
Text content — 'EMAN IQBAL', role line, paragraph 1, paragraph 2, and buttons — each element fades in and slides up individually with a staggered delay of 0.15s between each element.
Cards animate in after the text. Each card fades in and scales up slightly from 0.95 to 1 with a staggered delay of 0.1s between each card.
Use Framer Motion's useInView hook to trigger animations when the section enters the viewport. variants should have hidden state as opacity 0 and y 30, visible state as opacity 1 and y 0. Transition duration 0.5s with ease easeOut.
Do not use CSS animations. Use Framer Motion only. Do not change any existing styling or layout — only add animation behavior