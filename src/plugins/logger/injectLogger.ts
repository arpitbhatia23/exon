import path from 'node:path';
import fs from 'fs-extra';
import { cancel } from '@clack/prompts';
import {
  injectAfterText,
  injectCode,
  injectImport,
  injectStatementAfterVariable,
} from '../utils/injectCode.js';
import { mergeDeps } from '../../core/dbHelper.js';
import type { pluginContext } from '../types/index.js';
import { ROOT_DIR } from '../../core/rootRes.js';
export const injectLogger = async (context: pluginContext): Promise<void> => {
  const templatedir = path.resolve(
    ROOT_DIR,
    'plugins/templates/logger',
    context.language === 'TypeScript' ? 'ts' : 'js'
  );

  const exts = context.language === 'TypeScript' ? 'ts' : 'js';

  const middlewaresrc = path.join(templatedir, 'src/middleware', `morgan.middleware.${exts}`);
  const uitlssrc = path.join(templatedir, 'src/utils', `logger.${exts}`);
  const middlewareExists = await fs.pathExists(middlewaresrc);
  const utilsExists = await fs.pathExists(uitlssrc);
  if (!middlewareExists || !utilsExists) {
    cancel('logger plugin template not found');
    process.exit(1);
  }

  const middlewaredist = path.join(
    context.targetDir,
    'src',
    'middleware',
    `morgan.middleware.${exts}`
  );

  const uitlsdist = path.join(context.targetDir, 'src', 'utils', `logger.${exts}`);

  try {
    // ensure parent directories exist
    await fs.ensureDir(path.dirname(middlewaredist));
    await fs.ensureDir(path.dirname(uitlsdist));

    // copy files
    await fs.copy(middlewaresrc, middlewaredist);
    await fs.copy(uitlssrc, uitlsdist);
    const isTS = exts === 'ts';
    //  Inject into app.ts/js
    const appFile = isTS ? 'src/app.ts' : 'src/app.js';
    const appPath = path.join(context.targetDir, appFile);
    const asyncHandlerPath = path.join(context.targetDir, `src/utils/asyncHandler.${exts}`);

    await injectImport(appPath, {
      defaultImport: 'morganLogger',
      moduleSpecifier: `./middleware/morgan.middleware${exts === 'js' ? '.js' : ''}`,
    });
    await injectImport(asyncHandlerPath, {
      defaultImport: 'logger',
      moduleSpecifier: `./logger${exts === 'js' ? '.js' : ''}`,
    });

    await injectStatementAfterVariable(asyncHandlerPath, 'message', 'logger.error(error);');
    await injectAfterText(appPath, 'app.use(cookieParser());', 'app.use(morganLogger);');

    const depsPath = path.join(templatedir, '..', 'deps.json');
    if (fs.existsSync(depsPath)) {
      mergeDeps(context.targetDir, depsPath);
    }
  } catch (error) {
    cancel('failed to inject logger plugin');
    console.error(error);
  }
};
