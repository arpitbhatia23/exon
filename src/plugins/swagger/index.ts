import path from 'node:path';
import fs from 'fs-extra';
import { ROOT_DIR } from '../../core/rootRes.js';
import type { Plugin } from '../types/index.js';
import { removeImport, removeStatement } from '../utils/injectCode.js';
import { injectswagger } from './injectSwagger.js';
import { execSync } from 'node:child_process';

export const swaggerPlugin: Plugin = {
  name: 'swagger',
  type: 'feature',
  shouldRun(context) {
    return !!context.options?.swagger;
  },
  files: ['src/swagger.config.js', 'src/swagger.config.ts'],
  async run(context) {
    const templatedir = path.resolve(
      ROOT_DIR,
      'plugins/templates/swagger',
      context.language === 'TypeScript' ? 'ts/src' : 'js/src'
    );
    const ext = context.language === 'TypeScript' ? 'ts' : 'js';
    await injectswagger(templatedir, context.targetDir, ext);
  },
  async install(context) {
    const templatedir = path.resolve(
      ROOT_DIR,
      'plugins/templates/swagger',
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
    const templatedir = path.resolve(
      ROOT_DIR,
      'plugins/templates/swagger',
      context.language === 'TypeScript' ? 'ts' : 'js'
    );

    const data = JSON.parse(fs.readFileSync(path.join(templatedir, 'deps.json'), 'utf-8'));
    if (!data) {
      console.log('deps not found');
      return;
    }
    const deps = data?.dependencies;
    const packages = Object.entries(deps)
      .map(([pkg]) => `${pkg}`)
      .join(' ');

    if (!packages) {
      console.log('no dependencies found in file');
    }

    try {
      execSync(`npm uninstall ${packages}`, { stdio: 'ignore' });
      const isTS = context.language === 'TypeScript';
      const ext = context.language === 'TypeScript' ? 'ts' : 'js';
      const appFile = isTS ? 'src/app.ts' : 'src/app.js';
      const appPath = path.join(context.targetDir, appFile);

      await removeImport(appPath, {
        namedImports: ['swaggerSpec'],
        moduleSpecifier: `./swagger.config${ext === 'js' ? '.js' : ''}`,
      });
      await removeImport(appPath, {
        defaultImport: 'swaggerUi',
        moduleSpecifier: `swagger-ui-express`,
      });
      await removeStatement(
        appPath,
        `app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));`
      );
    } catch (error) {
      console.log(error);
    }
  },
};
