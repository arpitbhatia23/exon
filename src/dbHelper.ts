import fs from "fs-extra";
import path from "path";

export function mergeDeps(targetDir: string, depsPath: string) {
  if (!fs.existsSync(depsPath)) return;

  const pkgPath = path.join(targetDir, "package.json");
  const pkg = fs.readJsonSync(pkgPath);
  const deps = fs.readJsonSync(depsPath);

  pkg.dependencies = { ...pkg.dependencies, ...deps.dependencies };
  pkg.devDependencies = {
    ...pkg.devDependencies,
    ...deps.devDependencies,
  };

  pkg.scripts = {
    ...pkg.scripts,
    ...deps.scripts,
  };

  fs.writeJsonSync(pkgPath, pkg, { spaces: 2 });
}

export function appendEnv(targetDir: string, envPath: string) {
  if (!fs.existsSync(envPath)) return;

  fs.appendFileSync(
    path.join(targetDir, ".env"),
    "\n" + fs.readFileSync(envPath, "utf-8")
  );
}

export function mergeDbConfigToRoot(targetDir: string, templateDir: string) {
  fs.copySync(templateDir, targetDir, {
    filter: (src) =>
      !["env.append", "deps.json", "index.ts", "index.js"].some((f) =>
        src.includes(f)
      ),
  });
}
