# Beginning of Session: Future AU

> **Purpose:** Execute this at the start of every session to rebuild context efficiently.

---

## BOS Checklist

**Copy-paste or execute these steps at the start of every session:**

### 1. Update Session Count

```bash
cat config.json  # Check current session count
```

- Increment `sessions.count` by 1 (update config.json)
- Check if health check is due: `count - lastHealthCheck >= healthCheckCadence`

**If health check due:** Offer after completing BOS summary (Step 7)

### 2. Pull Latest Changes

```bash
git pull
```

### 3. Read Core Documentation

- **[CLAUDE.md](CLAUDE.md)** — Project config and context
- **[COLLABORATION.md](COLLABORATION.md)** — Communication patterns

### 4. Read Session Journal

- **[JOURNAL.md](JOURNAL.md)** — Last 10+ entries for session continuity
- Learn what happened in previous sessions
- Don't repeat mistakes already documented

### 5. Review Recent Activity

```bash
git log --oneline -5
gh issue list --state open  # If gh CLI available
```

### 6. Check Site Status

```bash
npm run dev  # Verify site builds locally (optional, if relevant to session work)
```

### 7. Provide Session Start Summary

Summarize:
- **Last commit:** [hash + message]
- **Open issues:** [count]
- **Recent context:** [from journal — what's been happening]
- **Session count:** [updated to N]

If health check is due, offer it after the summary.

---

**Then await instructions for what to work on this session.**
