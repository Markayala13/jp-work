# Skill Reference

## How Skills Work
Skills are markdown files installed at `~/.claude/skills/` (local) and `~/.agents/skills/` (symlinked). Claude Code automatically reads `SKILL.md` files from these directories. You don't need to "import" skills — they're available when present.

## Check Availability
```bash
ls ~/.claude/skills/<skill-name>/SKILL.md 2>/dev/null || ls ~/.agents/skills/<skill-name>/SKILL.md 2>/dev/null
```

---

## Required Skills (core experience)

| Skill | Check Paths | What It Does | Fallback |
|-------|-------------|-------------|----------|
| `frontend-design` | `~/.agents/skills/frontend-design/` | Design methodology, anti-AI-slop rules, typography/color/layout/motion guidelines | Use `docs/design-guide.md` |
| `shadcn-ui` | `~/.agents/skills/shadcn-ui/` | React component library with Tailwind CSS. Copy-paste accessible components. | Follow [shadcn docs](https://ui.shadcn.com) manually |
| `humanizer` | `~/.claude/skills/humanizer/` | Removes AI writing patterns from text. 24+ pattern detection. | Check AI patterns list in `docs/design-guide.md` |

## Recommended Skills (enhanced experience)

| Skill | Check Paths | What It Does | Fallback |
|-------|-------------|-------------|----------|
| `ui-ux-pro-max` | `~/.claude/skills/ui-ux-pro-max-repo/` | Searchable databases of UI styles, color palettes, font pairings. CLI: `python3 src/ui-ux-pro-max/scripts/search.py` | Manual color/font selection |
| `vercel-react-best-practices` | `~/.agents/skills/vercel-react-best-practices/` | 62 performance rules across 8 categories for React/Next.js | Standard Next.js defaults |
| `playwright-cli` | `~/.claude/skills/playwright-cli/` | Browser automation for screenshots and visual QA | User checks localhost manually |
| `seo-audit` | `~/.agents/skills/seo-audit/` | Technical SEO analysis, meta tags, heading structure | Basic meta tag setup only |

## Optional Skills (bonus features)

| Skill | Check Paths | What It Does |
|-------|-------------|-------------|
| `web-reader` | `~/.agents/skills/web-reader/` | Extract content from reference URLs the user provides |
| `deep-research` | `~/.agents/skills/deep-research/` | Systematic web research for industry-specific copy |
| `chrome-bridge-automation` | `~/.agents/skills/chrome-bridge-automation/` | Vision-driven browser automation via user's Chrome |

---

## Invocation Examples

### ui-ux-pro-max

**Available `--domain` values:**

| Domain | What It Returns | Example Query |
|--------|----------------|---------------|
| `product` | Product type recommendations (SaaS, e-commerce, portfolio, etc.) | `"saas dashboard"` |
| `style` | UI styles (glassmorphism, minimalism, brutalism, etc.) + CSS keywords | `"luxury minimal"` |
| `typography` | Font pairings with Google Fonts imports | `"elegant serif"` |
| `color` | Color palettes by product type and mood | `"restaurant warm"` |
| `landing` | Landing page structure and CTA strategies | `"saas"` |
| `chart` | Chart types and library recommendations | `"financial dashboard"` |
| `ux` | Best practices and anti-patterns | `"form design"` |

**Available `--stack` values:** `html-tailwind` (default), `react`, `nextjs`, `astro`, `vue`, `nuxtjs`, `nuxt-ui`, `svelte`, `swiftui`, `react-native`, `flutter`, `shadcn`, `jetpack-compose`

```bash
# Color palette for a restaurant
python3 ~/.claude/skills/ui-ux-pro-max-repo/src/ui-ux-pro-max/scripts/search.py "restaurant warm" --domain color

# Font pairing for elegant vibe
python3 ~/.claude/skills/ui-ux-pro-max-repo/src/ui-ux-pro-max/scripts/search.py "elegant serif" --domain typography

# Landing page structure for SaaS
python3 ~/.claude/skills/ui-ux-pro-max-repo/src/ui-ux-pro-max/scripts/search.py "saas" --domain landing

# UI style recommendations for luxury brand
python3 ~/.claude/skills/ui-ux-pro-max-repo/src/ui-ux-pro-max/scripts/search.py "luxury brand" --domain style

# Stack-specific recommendations for Next.js + shadcn
python3 ~/.claude/skills/ui-ux-pro-max-repo/src/ui-ux-pro-max/scripts/search.py "modern clean" --stack shadcn
```

### playwright-cli
```bash
# Open browser and navigate
playwright-cli open http://localhost:3000

# Take desktop screenshot
playwright-cli screenshot --filename=preview-desktop.png

# Resize to mobile and screenshot
playwright-cli resize 375 812
playwright-cli screenshot --filename=preview-mobile.png

# Resize to tablet
playwright-cli resize 768 1024
playwright-cli screenshot --filename=preview-tablet.png

# Close browser
playwright-cli close
```

### web-reader
Use when the user provides reference URLs they like the look of.
```
Invoke by telling Claude to use the web-reader skill to analyze a URL.
Example: "Use web-reader to analyze https://example.com and note its
colors, layout approach, typography, and overall design direction."
```
The skill extracts page content, metadata, and structure — useful for understanding what the user likes about a reference site.

### deep-research
Use when you need industry-specific knowledge for writing better copy or making design decisions.
```
Invoke by telling Claude to use deep-research for a specific topic.
Example: "Use deep-research to learn about the artisan bakery market —
what messaging resonates, what competitors look like, what customers care about."
```
Returns systematic findings from multiple sources — better than a single web search.

### seo-audit
Run after the page is built, before deployment.
```
Invoke by telling Claude to use seo-audit on the built page.
Checks: title tags, meta descriptions, heading structure, image alt text,
Core Web Vitals indicators, mobile readiness, and structured data opportunities.
```
