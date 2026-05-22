import fs from 'fs-extra';
import path from 'path';
import { Project, SyntaxKind } from 'ts-morph';
import type { ImportDeclarationStructure, OptionalKind } from 'ts-morph';
export const injectCode = async (filePath: string, marker: string, code: string): Promise<void> => {
  if (!fs.existsSync(filePath)) return;

  let content = await fs.readFile(filePath, 'utf-8');
  if (content.includes(code)) return; // Already injected

  content = content.replace(marker, `${marker}\n${code}`);
  await fs.writeFile(filePath, content);
};

export const removeCode = async (filePath: string, code: string): Promise<void> => {
  if (!fs.existsSync(filePath)) return;

  let content = await fs.readFile(filePath, 'utf-8');
  if (!content.includes(code)) return;

  content = content.replace(`\n${code}`, '');
  content = content.replace(code, '');
  await fs.writeFile(filePath, content);
};

const project = new Project({
  skipAddingFilesFromTsConfig: true,
});

type InjectImportOptions = {
  defaultImport?: string;
  namedImports?: string[];
  moduleSpecifier: string;
};

export const injectImport = async (
  filePath: string,
  options: InjectImportOptions
): Promise<void> => {
  const sourceFile = project.addSourceFileAtPath(filePath);

  const existingImport = sourceFile.getImportDeclaration(
    (i) => i.getModuleSpecifierValue() === options.moduleSpecifier
  );

  if (existingImport) {
    if (options.defaultImport && !existingImport.getDefaultImport()) {
      existingImport.setDefaultImport(options.defaultImport);
    }

    if (options.namedImports?.length) {
      const existingNamed = new Set(existingImport.getNamedImports().map((n) => n.getName()));

      for (const name of options.namedImports) {
        if (!existingNamed.has(name)) {
          existingImport.addNamedImport(name);
        }
      }
    }

    await sourceFile.save();
    return;
  }

  const importConfig: OptionalKind<ImportDeclarationStructure> = {
    moduleSpecifier: options.moduleSpecifier,
  };

  if (options.defaultImport) {
    importConfig.defaultImport = options.defaultImport;
  }

  if (options.namedImports?.length) {
    importConfig.namedImports = options.namedImports;
  }

  sourceFile.addImportDeclaration(importConfig);

  await sourceFile.save();
};

export const injectStatementAfterVariable = async (
  filePath: string,
  variableName: string,
  statement: string
): Promise<void> => {
  const sourceFile = project.addSourceFileAtPath(filePath);

  const variable = sourceFile
    .getDescendantsOfKind(SyntaxKind.VariableDeclaration)
    .find((v) => v.getName() === variableName);

  if (!variable) {
    console.log(`Variable not found: ${variableName}`);
    return;
  }

  const variableStatement = variable.getFirstAncestorByKind(SyntaxKind.VariableStatement);

  if (!variableStatement) return;

  const block = variableStatement.getFirstAncestorByKind(SyntaxKind.Block);

  if (!block) return;

  const statements = block.getStatements();
  const index = statements.findIndex((s) => s.getStart() === variableStatement.getStart());

  if (index === -1) return;

  const alreadyExists = statements.some((s) => s.getText() === statement);

  if (!alreadyExists) {
    block.insertStatements(index + 1, statement);
  }

  await sourceFile.save();
};
export const removeStatement = async (filePath: string, statementText: string) => {
  const sourceFile = project.addSourceFileAtPath(filePath);

  sourceFile.getDescendantsOfKind(SyntaxKind.ExpressionStatement).forEach((stmt) => {
    if (stmt.getText().trim() === statementText.trim()) {
      stmt.remove();
    }
  });

  await sourceFile.save();
};

export const replaceExport = async (filePath: string, from: string, to: string) => {
  const sourceFile = project.addSourceFileAtPath(filePath);
  const exportdecl = sourceFile.getExportDeclaration((decl) => {
    return decl.getNamedExports().some((e) => e.getName() === from);
  });
  if (!exportdecl) {
    return;
  }
  const namedExport = exportdecl.getNamedExports().find((e) => e.getName() === from.trim());
  if (!namedExport) return;

  namedExport.replaceWithText(to);
  await sourceFile.save();
};

export const replacePropertyAccess = async (filePath: string, from: string, to: string) => {
  const sourcefile = project.addSourceFileAtPath(filePath);
  sourcefile.getDescendantsOfKind(SyntaxKind.PropertyAccessExpression).forEach((exps) => {
    if (exps.getText() === from.trim()) {
      exps.replaceWithText(to);
    }
  });
  sourcefile.save();
};
export const removeImport = async (
  filePath: string,
  options: {
    moduleSpecifier: string;
    namedImports?: string[];
    defaultImport?: string;
  }
) => {
  const sourceFile = project.addSourceFileAtPath(filePath);

  const importDecl = sourceFile.getImportDeclaration(
    (i) => i.getModuleSpecifierValue() === options.moduleSpecifier
  );

  if (!importDecl) return;

  // Remove specific named imports
  if (options.namedImports?.length) {
    options.namedImports.forEach((name) => {
      const namedImport = importDecl.getNamedImports().find((n) => n.getName() === name);

      namedImport?.remove();
    });
  }

  // Remove default import
  if (options.defaultImport && importDecl.getDefaultImport()?.getText() === options.defaultImport) {
    importDecl.removeDefaultImport();
  }

  // If import is empty, remove whole declaration
  const hasDefault = !!importDecl.getDefaultImport();
  const hasNamed = importDecl.getNamedImports().length > 0;
  const hasNamespace = !!importDecl.getNamespaceImport();

  if (!hasDefault && !hasNamed && !hasNamespace) {
    importDecl.remove();
  }

  await sourceFile.save();
};

export const injectAfterText = async (filePath: string, target: string, code: string) => {
  const sourceFile = project.addSourceFileAtPath(filePath);

  const text = sourceFile.getFullText();

  if (text.includes(code)) return;

  sourceFile.replaceWithText(text.replace(target, `${target}\n${code}`));

  await sourceFile.save();
};
