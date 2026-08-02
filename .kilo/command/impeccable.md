---
description: Design craft and anti-slop via Impeccable skill
---

Load and follow the impeccable skill immediately using the skill tool (name: impeccable).

User arguments: $ARGUMENTS

If arguments are empty, follow the skill no-argument routing menu and do not auto-run a subcommand.
If arguments include a subcommand such as critique, quieter, polish, audit, adapt, init, document, live, hooks, or doctor, load that reference from the skill and execute it.

Detector CLI:
- npm run impeccable:detect
- npx impeccable detect src
- node .kilo/skills/impeccable/scripts/detect.mjs --json src
