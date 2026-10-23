[CmdletBinding(SupportsShouldProcess=$true)]
param([switch]$Install, [switch]$IncludeUniGetUI)
$ErrorActionPreference = 'Stop'
# Preview is the default. No elevation, execution-policy changes, or blanket upgrades.
$packages = @('Git.Git', 'GitHub.cli')
if ($IncludeUniGetUI) { $packages += 'Devolutions.UniGetUI' }
foreach ($package in $packages) {
  if (-not $Install) { Write-Output "Plan: winget install --id $package --exact --source winget --no-upgrade"; continue }
  if (-not (Get-Command winget -ErrorAction SilentlyContinue)) { throw 'Install Microsoft App Installer / WinGet first.' }
  $drive = Get-PSDrive -Name $env:SystemDrive.TrimEnd(':')
  if ($drive.Free -lt 2GB) { throw 'Less than 2 GB free. Free disk space before installing development tools.' }
  if ($PSCmdlet.ShouldProcess($package, 'Install missing developer tool via WinGet')) {
    & winget install --id $package --exact --source winget --no-upgrade
    if ($LASTEXITCODE -ne 0) { throw "WinGet failed for $package (exit $LASTEXITCODE). Inspect before retrying." }
  }
}
Write-Output 'Use the repository-supported Node version; run npm.cmd ci in a clean checkout before building.'
Write-Output 'Wrangler remains a repository dependency. This script does not authenticate, deploy, or alter CI.'
