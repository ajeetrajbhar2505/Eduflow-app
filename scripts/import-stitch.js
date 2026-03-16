#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src', 'assets', 'stitch');
const destDir = path.join(__dirname, '..', 'src', 'app', 'features', 'pages');

if (!fs.existsSync(srcDir)) {
  console.error('Stitch assets not found at', srcDir);
  process.exit(1);
}
fs.rmSync(destDir, { recursive: true, force: true });
fs.mkdirSync(destDir, { recursive: true });

const toPascal = (name) =>
  name
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');

const folders = fs
  .readdirSync(srcDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const routes = [];

for (const folder of folders) {
  const codePath = path.join(srcDir, folder, 'code.html');
  if (!fs.existsSync(codePath)) continue;
  const raw = fs.readFileSync(codePath, 'utf8');
  const bodyMatch = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const inner = bodyMatch ? bodyMatch[1].trim() : raw;

  const componentName = toPascal(folder) + 'Component';
  const fileBase = folder.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const htmlOut = path.join(destDir, `${fileBase}.component.html`);
  const tsOut = path.join(destDir, `${fileBase}.component.ts`);

  fs.writeFileSync(htmlOut, inner, 'utf8');

  const ts = `import { CommonModule } from '@angular/common';\nimport { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-${fileBase}',\n  standalone: true,\n  imports: [CommonModule],\n  templateUrl: './${fileBase}.component.html',\n  styleUrls: [],\n})\nexport class ${componentName} {}\n`;
  fs.writeFileSync(tsOut, ts, 'utf8');

  routes.push({ path: fileBase, component: componentName, fileBase });
}

const routeLines = routes
  .map((r) => `  { path: '${r.path}', loadComponent: () => import('./${r.fileBase}.component').then(m => m.${r.component}) },`)
  .join('\n');

const imports = routes
  .map((r) => `export { ${toPascal(r.fileBase.replace(/-/g, ' ')) + 'Component'} } from './${r.fileBase}.component';`)
  .join('\n');

const routeFile = `import { Routes } from '@angular/router';\n\nexport const PAGES_ROUTES: Routes = [\n  { path: '', redirectTo: '${routes[0]?.path || ''}', pathMatch: 'full' },\n${routeLines}\n  { path: '**', redirectTo: '${routes[0]?.path || ''}' },\n];\n`;

fs.writeFileSync(path.join(destDir, 'stitch-generated.routes.ts'), routeFile, 'utf8');
fs.writeFileSync(path.join(destDir, 'index.ts'), imports + '\n', 'utf8');

console.log(`Generated ${routes.length} components from Stitch HTML.`);
