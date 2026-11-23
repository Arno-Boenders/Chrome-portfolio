// Builds the game versions of the portfolio and copies them into public/play/<game>/,
// where the /games/<game> pages load them. Run with `npm run games` after changing a game.
// The games are separate projects that live next to this one (../arno-slice, ../arno-blocks).
import { execSync } from 'node:child_process';
import { cpSync, existsSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';

const GAMES = { slice: '../arno-slice', blocks: '../arno-blocks' };

for (const [name, dir] of Object.entries(GAMES)) {
    const source = resolve(dir);
    if (!existsSync(source)) {
        console.warn(`Skipping ${name}: ${source} not found.`);
        continue;
    }
    console.log(`Building ${name} in ${source}…`);
    if (!existsSync(join(source, 'node_modules'))) execSync('npm install', { cwd: source, stdio: 'inherit' });
    execSync('npm run build', { cwd: source, stdio: 'inherit' });
    const target = resolve('public/play', name);
    rmSync(target, { recursive: true, force: true });
    cpSync(join(source, 'dist'), target, { recursive: true });
    console.log(`Copied to public/play/${name}/`);
}
