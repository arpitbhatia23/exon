import path from "path";
import fs from "fs/promises";

export const createDockerFile = async (
  language: string,
  targetDir: string,
): Promise<void> => {
  const dockerfilePath = path.join(targetDir, "Dockerfile");

  let content: string = ``;
  if (language == "JavaScript") {
    content += `
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
Run npm ci
COPY . .
RUN npm run dev
EXPOSE 3000
CMD [ "npm","run","dev"]
    `;
  }
  if (language == "TypeScript") {
    content += `
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# production build

FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD [ "npm","start" ]    `;
  }
  // Write Dockerfile
  await fs.writeFile(dockerfilePath, content.trim(), "utf-8");
  console.log(`Dockerfile with build stage created at ${dockerfilePath}`);
};

// export const createDockerComposeFile = async (
//   serviceName: string,
//   language: string,
//   targetDir: string,
//   port: number = 3000,
// ): Promise<void> => {
//   const composeFilePath = path.join(targetDir, "docker-compose.yml");

//   // Compose content
//   let content = `
// version: "3.9"

// services:
//   ${serviceName}:
//     build: .
//     ports:
//       - "${port}:${port}"
//     environment:
//       NODE_ENV: ${language === "TypeScript" ? "production" : "development"}
//     volumes:
//       - ./:/app
// `;

//   // For JS dev mode, run dev command; for TS prod mode, run npm start
//   content += `
//     command: ${language === "JavaScript" ? "npm run dev" : "npm start"}
// `;

//   await fs.writeFile(composeFilePath, content.trim(), "utf-8");
//   console.log(`Docker Compose file created at ${composeFilePath}`);
// };
