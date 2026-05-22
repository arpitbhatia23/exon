import path from 'path';
import { ROOT_DIR } from '../../core/rootRes.js';
import type { pluginContext } from '../types/index.js';
import fs from 'fs-extra';
import { mergeDeps } from '../../core/dbHelper.js';
import {
  injectImport,
  injectStatementAfterVariable,
  removeImport,
  replaceExport,
  replacePropertyAccess,
} from '../utils/injectCode.js';

export const injectSocket = async (context: pluginContext) => {
  const socketdir = path.resolve(
    ROOT_DIR,
    'plugins/templates/socket',
    context.language === 'TypeScript' ? 'ts' : 'js'
  );
  if (!fs.existsSync(socketdir)) {
    throw new Error(`Template not found: ${socketdir}`);
  }
  fs.copySync(socketdir, path.join(context.targetDir, 'src/socket'), {
    filter: (src) => !['deps.json'].some((f) => src.includes(f)),
  });
  mergeDeps(context.targetDir, path.join(socketdir, 'deps.json'));
  const isTS = context.language === 'TypeScript';
  const ext = isTS ? 'ts' : 'js';

  const appFile = `src/app.${ext}`;
  const appPath = path.join(context.targetDir, appFile);

  await injectImport(appPath, {
    defaultImport: 'http',
    moduleSpecifier: 'http',
  });

  await injectImport(appPath, {
    namedImports: ['initSocket'],
    moduleSpecifier: `./socket/index${ext == 'js' ? '.js' : ''}`,
  });
  await injectStatementAfterVariable(
    appPath,
    'app',
    `const server = http.createServer(app);

   initSocket(server);
   `
  );

  await replaceExport(appPath, 'app', 'server');

  const indexpath = path.join(context.targetDir, `src/index.${ext}`);
  await injectImport(indexpath, {
    namedImports: ['server'],
    moduleSpecifier: `./app${ext === 'ts' ? '' : '.js'}`,
  });
  await removeImport(indexpath, {
    namedImports: ['app'],
    moduleSpecifier: `./app${ext === 'js' ? '.js' : ''}`,
  });
  await replacePropertyAccess(indexpath, 'app.listen', 'server.listen');
};
