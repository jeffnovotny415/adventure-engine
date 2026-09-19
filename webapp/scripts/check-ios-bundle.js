import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Inspect the actual compiled app, so a successful compile cannot hide stale
// web assets or an accidentally shipped development-server configuration.
const root = fileURLToPath(new URL('../', import.meta.url));

async function filesIn(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === '.DS_Store') continue;
    if (entry.isDirectory()) {
      for (const file of await filesIn(path.join(directory, entry.name))) {
        files.push(path.join(entry.name, file));
      }
    } else {
      assert(entry.isFile(), `Unexpected non-file asset: ${entry.name}`);
      files.push(entry.name);
    }
  }
  return files.sort();
}

try {
  assert(process.argv.length === 3, 'Usage: node scripts/check-ios-bundle.js <built App.app>');
  const app = path.resolve(process.argv[2]);
  const config = JSON.parse(await readFile(path.join(app, 'capacitor.config.json'), 'utf8'));
  const source = JSON.parse(await readFile(path.join(root, 'capacitor.config.json'), 'utf8'));
  assert(!config.server?.url, 'Native app must launch bundled content, not a remote server');
  assert.equal(config.ios?.zoomEnabled, true, 'Native pinch zoom must remain enabled');
  for (const key of Object.keys(source)) {
    assert.deepEqual(config[key], source[key], `Bundled native configuration is stale: ${key}`);
  }

  const dist = path.join(root, 'dist');
  const publicDir = path.join(app, 'public');
  const assets = await filesIn(dist);
  assert(assets.includes('index.html'), 'Build web assets before validating the app');
  for (const file of assets) {
    assert((await readFile(path.join(dist, file))).equals(await readFile(path.join(publicDir, file))),
      `Bundled web asset differs from the current production build: ${file}`);
  }
  // Capacitor adds these two shims when copying the web build.
  const extras = (await filesIn(publicDir)).filter((file) => !assets.includes(file));
  assert(extras.every((file) => ['cordova.js', 'cordova_plugins.js'].includes(file)),
    `Unexpected/stale bundled assets: ${extras.join(', ')}`);

  const info = JSON.parse(execFileSync('/usr/bin/plutil',
    ['-convert', 'json', '-o', '-', path.join(app, 'Info.plist')], { encoding: 'utf8' }));
  assert.equal(info.CFBundleIdentifier, source.appId, 'Bundle identifier differs from native config');
  assert.deepEqual([...info.UIDeviceFamily].sort(), [1, 2], 'App must support iPhone and iPad');
  for (const key of ['UISupportedInterfaceOrientations', 'UISupportedInterfaceOrientations~ipad']) {
    for (const orientation of ['LandscapeLeft', 'LandscapeRight', 'Portrait']) {
      assert(info[key]?.includes(`UIInterfaceOrientation${orientation}`), `Missing ${key}: ${orientation}`);
    }
  }
  for (const file of [info.CFBundleExecutable, 'Assets.car', 'Base.lproj/LaunchScreen.storyboardc']) {
    await stat(path.join(app, file));
  }
  console.log(`iOS bundle verified: ${info.CFBundleIdentifier} ${info.CFBundleShortVersionString} (${info.CFBundleVersion}); ${assets.length} identical web assets, local launch, zoom, iPhone/iPad orientations, icon and launch screen.`);
} catch (error) {
  console.error(`iOS bundle check failed: ${error.message}`);
  process.exitCode = 1;
}
