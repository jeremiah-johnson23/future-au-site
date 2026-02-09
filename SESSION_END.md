# End of Session: Future AU

> **Purpose:** Execute this at the end of every session to ensure quality and maintain continuity.

---

## EOS Checklist

### 1. Pre-Closure Verification

```bash
git status
git diff
```

- [ ] All session goals accomplished
- [ ] No debug comments or TODOs left behind
- [ ] All affected files updated consistently

### 2. Quality Checks

- [ ] Site builds without errors (`npm run build` if applicable)
- [ ] No secrets committed
- [ ] Changes look correct

### 3. Update Session Journal

**Append entry to [JOURNAL.md](JOURNAL.md):**

```markdown
## Session N: Brief title (YYYY-MM-DD)

What was done. Patterns observed. Next session recommendation.
```

### 4. Self-Improvement Introspection (MANDATORY)

**Scan for improvement opportunities:**

- Did communication patterns emerge? → Update COLLABORATION.md
- Did workflow friction occur? → Update CLAUDE.md workflow section
- Did Pod lack context? → Update relevant docs
- Did branding or standards need clarification? → Update CLAUDE.md standards

**At minimum, update ONE framework document if patterns emerged.**

### 5. Upstream Contribution Check

**Scan for discoveries that could help other Gordo Framework users:**
- Did framework guidance fail or fall short?
- Did you discover a pattern that should be in the framework?
- If yes: Generalize and present to Simon for approval

### 6. Commit and Push

```bash
git add [files]
git commit -m "Brief summary of changes"
git push
```

### 7. End of Session Summary

Provide:
- **Work completed:** [what was accomplished]
- **Issues closed:** [if any]
- **Files modified:** [list]
- **Journal updated:** [yes/no]
- **Framework improvements:** [what was improved, or why nothing needed]
- **Next session should focus on:** [recommendation]

### 8. Session Termination Signal

Provide one of:
- **CLEARED TO END** — All work complete, no blockers
- **RECOMMENDATION BEFORE ENDING** — Work complete but have suggestions
- **BLOCKING ISSUE - WAIT** — Critical issue to resolve first
