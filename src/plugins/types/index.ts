export interface Plugin {
  name: string;
  shouldRun(context: pluginContext): boolean;
  type: PluginType;
  run(context: pluginContext): Promise<void>;
  install?(context: pluginContext): Promise<void>;
  uninstall?(context: pluginContext): Promise<void>;
  files?: string[];
}

export interface pluginContext {
  projectName: string;
  language: string;
  targetDir: string;
  database?: string;
  options?: {
    docker?: string;
    logger?: string;
    swagger?: string;
    socket?: string;
  };
}
export type PluginType = 'database' | 'feature' | 'deployment';
