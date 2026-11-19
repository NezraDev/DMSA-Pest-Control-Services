# DMSA guide calendar

Two new guides a month. Each guide is written from an outline in `data/guide-drafts.js`, but only after DMSA has confirmed the facts listed under `ownerToConfirm`.

## Steps for each guide

1. **Confirm the facts.** Send the answers for that outline's `ownerToConfirm` list, plus any real photos (no client names or exact addresses).
2. **Write the guide** in `data/guides-data.js`. Each guide needs:
   - 900–1,300 words;
   - a quick answer (`summary`) at the top;
   - one table or checklist;
   - a closing section with the id `when-to-call`;
   - three FAQs;
   - `relatedPest`, `relatedService` and three `related` guides.
3. **Owner check.** DMSA reads it and confirms every statement about its own service.
4. **Publish.** Set `datePublished` and `dateModified`, run `npm test`, then deploy.
5. **Request indexing.** In Google Search Console, use URL Inspection to request indexing of the new URL.

## Schedule

| Month | Guide 1 | Guide 2 |
|---|---|---|
| December 2026 | What are gamu-gamo, and do they mean I have anay? | Rainy season pest checklist for Philippine homes |
| January 2027 | Daga sa kisame: how to tell rats from mice in the ceiling | Why ants keep coming back after spraying |
| February 2027 | Is pest control safe for kids and pets? | How long after pest control can we go back inside? |
| March 2027 | Anay in wooden cabinets: what to do | Cockroaches in condos: where they come from and how to stop them |
| April 2027 | Soil poisoning vs termite baiting: which is right for your house? | Termite inspection before buying or renting a house |
| May 2027 | When is termite swarming season in Luzon? | How often should a restaurant have pest control? |

After May 2027, pick new topics from Search Console. Go to Performance → Queries, filter for questions people already find DMSA for, and turn the most common ones into guides.

## Rules

- **No date or category archive pages.** JTO's thin monthly archives are a weakness, not something to copy.
- **One URL per topic.** Before writing, check the keyword map in `SEO-EXPANSION-PROMPT.md` so a new guide doesn't compete with an existing page.
- **Never publish a draft with unconfirmed facts.** Leave the outline in `guide-drafts.js` until the facts are confirmed.
