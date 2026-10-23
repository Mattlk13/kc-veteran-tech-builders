# Windows developer tools

Run `./tools/windows/setup.ps1` to preview. Run with `-Install` to install missing Git and GitHub CLI from the explicit WinGet community source, without upgrading existing installations. `-WhatIf` previews an install invocation. Add `-IncludeUniGetUI` only if you want the optional graphical package manager. Scripts must run under your existing PowerShell policy; this setup never changes it.

UniGetUI's current stable package ID was verified with WinGet on 2026-10-23: `Devolutions.UniGetUI`. The older `MartiCliment.UniGetUI` ID was unavailable. WinGet was already installed on the authoring workstation. No packages were installed because only 0.8 GB was free.

This standardizes contributor tools, not app dependencies or Cloudflare runtimes. Select the Node major required by the repository and CI; do not automatically upgrade it through UniGetUI. For npm projects run `npm.cmd ci` in a clean checkout before its next build. Use the lockfile's local Wrangler. For Python/Unreal subprojects follow their own toolchain requirements. Do not use global npm upgrades, automatic UniGetUI upgrades, or `winget upgrade --all` for these projects.

The installer is opt-in, respects package prompts, checks at least 2 GB of free system-drive space, and does not download engine SDKs or containers. This is a basic preflight, not an estimate for Unreal or Docker. Installation status is not proof that authentication, tests, CI, or deployment passed.

References:
- https://learn.microsoft.com/en-us/windows/package-manager/winget/install
- https://github.com/Devolutions/UniGetUI
