import type { Plugin } from './types/index.js';
import { dockerPlugin } from './docker/index.js';
import { drizzlePlugin } from './drizzle/index.js';
import { MongoosePlugin } from './mongoose/index.js';
import { prismaPlugin } from './prisma/index.js';
import { loggerPlugin } from './logger/index.js';
import { swaggerPlugin } from './swagger/index.js';
import { scoketPlugin } from './socket/index.js';
export const plugins: Plugin[] = [
  dockerPlugin,
  drizzlePlugin,
  MongoosePlugin,
  prismaPlugin,
  loggerPlugin,
  swaggerPlugin,
  scoketPlugin,
];
