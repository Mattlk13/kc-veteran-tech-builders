import { writeFile } from 'node:fs/promises';
import { pageConfig, workerConfig, maintenances } from './profile.mjs';

const output = process.argv[2];
if (!output) throw new Error('Usage: node monitoring/uptimeflare/export-config.mjs <new-config-path>');
const text = `// KC Veteran Tech Builders profile. No secrets or notifications.\nimport type { PageConfig, WorkerConfig, MaintenanceConfig } from './types/config';\n\nexport const pageConfig = ${JSON.stringify(pageConfig, null, 2)} satisfies PageConfig;\n\nexport const workerConfig = ${JSON.stringify(workerConfig, null, 2)} satisfies WorkerConfig;\n\nexport const maintenances = ${JSON.stringify(maintenances)} satisfies MaintenanceConfig[];\n`;
await writeFile(output, text, { flag: 'wx' });
console.log('Created UptimeFlare configuration. No deployment was performed.');
