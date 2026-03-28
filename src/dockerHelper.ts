import path from "path";
import fs from "fs/promises";

export const createDockerFile = async (
  language: string,
  targetDir: string,
): Promise<void> => {
  const dockerfilePath = path.join(targetDir, "Dockerfile");
  const dockerIgnorePath = path.join(targetDir, ".dockerignore");

  let content: string = ``;
  if (language == "JavaScript") {
    content += `
FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3802
CMD [ "npm","run","dev"]
    `;
  }
  if (language == "TypeScript") {
    content += `
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3802
CMD [ "npm","start" ]
    `;
  }

  const ignoreContent = `
node_modules
npm-debug.log
dist
.env
.git
  `.trim();

  // Write Dockerfile and .dockerignore
  await fs.writeFile(dockerfilePath, content.trim(), "utf-8");
  await fs.writeFile(dockerIgnorePath, ignoreContent, "utf-8");
  console.log(`Dockerfile and .dockerignore created at ${targetDir}`);
};

export const createDockerComposeFile = async (
  serviceName: string,
  language: string,
  targetDir: string,
  database: string,
  port: number = 3802,
): Promise<void> => {
  const composeFilePath = path.join(targetDir, "docker-compose.yml");

  let dbService = "";
  let dbUrl = "";
  let dependsOn = "";

  if (database === "Mongoose") {
    dbService = `
  mongodb:
    image: mongo:7.0-rc-alpine # Note: Official mongo alpine is not available, using common community tag if applicable or specific version
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
`;
    dbUrl = "mongodb://mongodb:27017/exon-db";
    dependsOn = "    depends_on:\n      - mongodb";
  } else if (database === "Prisma" || database === "Drizzle") {
    dbService = `
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: exon_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
`;
    dbUrl = "postgresql://user:password@postgres:5432/exon_db?schema=public";
    dependsOn = "    depends_on:\n      - postgres";
  }

  // Compose content
  let content = `
services:
  ${serviceName}:
    build: .
    ports:
      - "${port}:${port}"
    environment:
      NODE_ENV: ${language === "TypeScript" ? "production" : "development"}
      DATABASE_URL: ${dbUrl || "your_database_url"}
    volumes:
      - ./:/app
      - /app/node_modules
    command: ${language === "JavaScript" ? '["npm", "run", "dev"]' : '["npm", "start"]'}
${dependsOn}
${dbService}
`;

  if (dbService) {
    content += `
volumes:
  ${database === "Mongoose" ? "mongodb_data:" : "postgres_data:"}
`;
  }

  await fs.writeFile(composeFilePath, content.trim(), "utf-8");
  console.log(`Docker Compose file with ${database} support created at ${composeFilePath}`);
};
