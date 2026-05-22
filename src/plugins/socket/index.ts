import path from 'path';
import type { Plugin } from '../types/index.js';
import { ROOT_DIR } from '../../core/rootRes.js';
import { injectSocket } from './injectSocket.js';
import { execSync } from 'node:child_process';
import fs from 'fs-extra';
import {
  injectImport,
  removeCode,
  removeImport,
  removeStatement,
  replaceExport,
  replacePropertyAccess,
} from '../utils/injectCode.js';
export const scoketPlugin: Plugin = {
  type: 'feature',
  name: 'socket',
  shouldRun(context) {
    return !!context.options?.socket;
  },
  files: ['src/socket/index.js', 'src/socket/index.ts'],
  async run(context) {
    await injectSocket(context);
  },
  async install(context) {
    const templatedir = path.resolve(
      ROOT_DIR,
      'plugins/templates/socket',
      context.language === 'TypeScript' ? 'ts' : 'js'
    );

    const data = JSON.parse(fs.readFileSync(path.join(templatedir, 'deps.json'), 'utf-8'));
    if (!data) {
      console.log('deps not found');
      return;
    }
    const deps = data?.dependencies;
    const packages = Object.entries(deps)
      .map(([pkg, ver]) => `${pkg}@${ver}`)
      .join(' ');

    if (!packages) {
      console.log('no dependencies found in file');
    }

    try {
      execSync(`npm install ${packages}`, { stdio: 'ignore' });
    } catch (error) {
      console.log(error);
    }
  },
  async uninstall(context) {
    const socketDir = path.resolve(
      ROOT_DIR,
      'plugins/templates/socket',
      context.language === 'TypeScript' ? 'ts' : 'js'
    );

    const depsPath = path.join(socketDir, 'deps.json');

    if (fs.existsSync(depsPath)) {
      const data = JSON.parse(fs.readFileSync(depsPath, 'utf-8'));
      const deps = data?.dependencies || {};

      const packages = Object.keys(deps).join(' ');

      if (packages) {
        execSync(`npm uninstall ${packages}`, {
          cwd: context.targetDir,
          stdio: 'inherit',
        });
      }
    }

    const isTS = context.language === 'TypeScript';
    const ext = isTS ? 'ts' : 'js';

    const appPath = path.join(context.targetDir, `src/app.${ext}`);

    console.log(appPath);
    await removeImport(appPath, {
      moduleSpecifier: 'http',
      defaultImport: 'http',
    });

    await removeImport(appPath, {
      moduleSpecifier: `./socket/index${ext == 'js' ? '.js' : ''}`,
      namedImports: ['initSocket'],
    });

    await removeStatement(appPath, `const server = http.createServer(app);`);
    await removeStatement(appPath, `initSocket(server);`);
    await replaceExport(appPath, 'server', 'app');

    const indexpath = path.join(context.targetDir, `src/index${ext === 'js' ? '.js' : '.ts'}`);
    await injectImport(indexpath, {
      namedImports: ['app'],
      moduleSpecifier: `./app${ext === 'js' ? '.js' : ''}`,
    });
    await removeImport(indexpath, {
      namedImports: ['server'],
      moduleSpecifier: `./app${ext === 'js' ? '.js' : ''}`,
    });
    await replacePropertyAccess(indexpath, 'server.listen', 'app.listen');

    await fs.remove(path.join(context.targetDir, 'src/socket'));

    console.log('✅ Socket.IO plugin removed successfully');
  },
};
