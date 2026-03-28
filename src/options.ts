type dbType = {
  value: string;
  label: string;
};

export const DB_OPTIONS: dbType[] = [
  { value: "Mongoose", label: "Mongoose" },
  { value: "Prisma", label: "Prisma" },
  { value: "Drizzle", label: "Drizzle" },
  { value: "None", label: "None" },
] as const;

type langType = {
  value: string;
  label: string;
};

export const LANG_OPTION: langType[] = [
  { value: "TypeScript", label: "TypeScript" },
  { value: "JavaScript", label: "JavaScript" },
] as const;
