# mobile-screen-eval

A rigorous three-layer UX evaluation skill for Claude. Audit any mobile screen against Nielsen's 10 usability heuristics, WCAG 2.1 AA accessibility, and mobile platform guidelines (iOS HIG + Material Design).

Works with any mobile product — consumer apps, B2B tools, fintech, health, delivery, or anything else.

---

## Install

**Global (available across all your Claude projects):**
```bash
npx mobile-screen-eval
```

**Project-scoped (only for this project, shareable via git):**
```bash
npx mobile-screen-eval --project
```

Then restart Claude Code to pick it up.

---

## Use

In Claude Code, Claude.ai, or any Claude interface:

1. Upload a mobile screen (PNG, Figma frame link, or description)
2. Say `"audit this screen"` or `"run mobile-screen-eval"` or just `"what's wrong with this?"`
3. Claude runs all three layers and produces a full per-screen report

---

## What you get

For each screen:

- **What's working** — patterns worth preserving, with plain-language rationale
- **Findings** — grouped by layer, each with: Element, Observation, Why it's a problem, Recommendation, Effort hint
- **Recommendations prioritised** — sorted by severity then impact × effort
- **Open questions** — things that need design context before a verdict

### Three evaluation layers

**Layer 1 — Nielsen's 10 usability heuristics**
The industry standard since 1994. Covers: system status visibility, real-world language, user control, consistency, error prevention, recognition vs recall, flexibility, minimalist design, error recovery, and help/documentation.

**Layer 2 — WCAG 2.1 AA**
The international accessibility standard. Covers: text alternatives, colour contrast (4.5:1 for body text), resizable text, timing, target size, error identification, and more.

**Layer 3 — Mobile platform accessibility**
iOS HIG + Material Design guidelines. Covers: touch target size (44pt iOS / 48dp Android), Dynamic Type / Font Scale support, VoiceOver / TalkBack semantics, input types, haptics, and platform conventions.

### Severity scale

Nielsen's 0–4 scale, consistently applied:

| Level | Label | Meaning |
|---|---|---|
| 0 | Not a problem | Noted, don't fix |
| 1 | Cosmetic | Fix if time permits |
| 2 | Minor | Low priority, easy workaround |
| 3 | Major | Fix before ship |
| 4 | Catastrophic | Must fix — blocks task or safety |

---

## Batch use (Claude Code)

For 10+ screens, run in Claude Code with a folder of exported PNGs and a manifest CSV. Claude writes per-screen `.md` files and appends to a master findings CSV as it goes. Full batch instructions in the skill's `references/templates.md`.

---

## Add your own design principles

This skill covers the universal three layers. If your product has its own design principles, brand guidelines, or context-specific rules, share them with Claude at the start of a session. Claude will apply them as a fourth layer on top of the universal three.

---

## For teams

Install project-scoped and commit `.claude/skills/` to git. Every designer on the team gets the skill automatically when they clone the repo.

---

## Update

```bash
npx mobile-screen-eval@latest
```

---

## License

MIT
