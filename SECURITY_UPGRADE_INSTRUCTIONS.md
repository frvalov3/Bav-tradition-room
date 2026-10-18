I updated package.json to bump direct dependencies and add overrides to block vulnerable transitive versions. Please run `npm install` on this branch to refresh package-lock.json and verify tests.

Changes made:
- axios -> ^1.20.0
- vite (dev) -> ^6.4.3
- added npm "overrides" to pin: form-data@4.0.4, follow-redirects@1.16.0, esbuild@0.25.0

Why I didn't update package-lock.json here:
- I can't run `npm install` in this environment, so I committed only the package.json changes. After you (or CI) run `npm install` on this branch, package-lock.json will be updated to reflect the secure versions.

Next steps (suggested):
1. Locally: git fetch && git checkout fix/security/upgrade-deps-bav-tradition-room
2. Run: npm ci (or npm install) to regenerate package-lock.json
3. Run: npm audit && npm test
4. Push updated package-lock.json if all checks pass

Suggested PR title: "chore: upgrade vulnerable deps (axios, form-data, vite, esbuild)"
Suggested PR description:
- Upgrade axios to ^1.20.0 to address prototype-pollution and related critical advisories.
- Pin transitive packages via `overrides`: form-data@4.0.4 (CVE-2025-7783), follow-redirects@1.16.0, esbuild@0.25.0.
- Bump vite to ^6.4.3 (patched dev-server issues).

I can open the PR for you, but I don't have permission to create pull requests via the available tools. You can create a PR from this branch using the GitHub UI: https://github.com/frvalov3/Bav-tradition-room/compare/main...fix/security/upgrade-deps-bav-tradition-room

If you want, I can also prepare the package-lock.json diff here if you paste the output of `npm install` (or upload the updated lockfile).