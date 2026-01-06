type answeroption = {
  language: string;
  database: string;
};

export function resolveDbTemplate(a: answeroption) {
  if (a.database === "None") return null;
  const lang = a.language === "TypeScript" ? "ts" : "js";

  if (a.database === "Mongoose") {
    return `mongoose/${lang}`;
  }

  if (a.database === "Prisma") {
    return `prisma/${lang}`;
  }

  if (a.database === "Drizzle") {
    return `drizzle/${lang}`;
  }

  return null;
}
