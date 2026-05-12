import fs from "fs-extra";
import path from "path";

export const injectCode = async (
  filePath: string,
  marker: string,
  code: string,
): Promise<void> => {
  if (!fs.existsSync(filePath)) return;

  let content = await fs.readFile(filePath, "utf-8");
  if (content.includes(code)) return; // Already injected

  content = content.replace(marker, `${marker}\n${code}`);
  await fs.writeFile(filePath, content);
};

export const removeCode = async (
  filePath: string,
  code: string,
): Promise<void> => {
  if (!fs.existsSync(filePath)) return;

  let content = await fs.readFile(filePath, "utf-8");
  if (!content.includes(code)) return;

  content = content.replace(`\n${code}`, "");
  content = content.replace(code, "");
  await fs.writeFile(filePath, content);
};
