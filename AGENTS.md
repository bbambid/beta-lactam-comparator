# Project Working Rules

These rules apply to every future session working in this repository.

## Pediatric dose audit

- Read `pediatric-dose-audit/PMDA-AUDIT-PROTOCOL.md` before adding, changing, auditing, or publishing a pediatric medicine.
- A newly added medicine is provisional until its formulation-specific data has passed the protocol's three-way reconciliation and boundary tests. Never label an unverified record as PMDA-final.
- Audit work proceeds in groups of 10 medicines. Update the progress report after every group, report that checkpoint to the user, and keep the remaining queue explicit.
- Do not add new medicines while the current 139-unit final audit is in progress unless the user explicitly restarts additions.
- Do not infer an approved pediatric dose from clinical custom, a hospital table, an interview form, or an adult dose. When PMDA provides no pediatric-specific approved dose, display that fact instead of manufacturing a numeric range.

## Production changes

- Preserve unrelated UI and data behavior.
- Use the sequence: preview/worktree change -> user approval -> diff and validation -> GitHub backup of current production -> production update.
- Never publish pediatric dose changes if the required source URL, audit note, or validation evidence is missing.

