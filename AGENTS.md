# AGENTS.md

## Work logging rule

Always keep a written log of work performed in this repository.

- Append every material task to `WORKLOG.md` before the final response.
- Use Asia/Seoul time and include the date.
- Log what the user asked for, what changed, commands/checks run, files touched, commit/push/PR/deploy results, and remaining blockers.
- Never record secrets, API keys, OAuth tokens, private auth URLs, or full sensitive command output.
- If a task is read-only, still log the inspection and conclusion when it materially affects project decisions.
- If a task creates no repo changes, log the operational result rather than forcing a code change.

Keep entries concise, factual, and useful for resuming work later.

## Versioning rule

Always maintain the web app version in `x.x.x` format.

- Use `package.json` `version` as the source of truth.
- Update the version whenever a user-visible app change ships.
- Keep `config.js` `window.MOI_CONFIG.appVersion` synchronized with `package.json`.
- Run `npm run check` or `npm run verify` after version changes so `scripts/check-version.mjs` catches mismatches.
- Record the version number in `WORKLOG.md` for every material task.
