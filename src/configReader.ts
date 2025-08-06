import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { QuickStarConfig } from './types';

export class ConfigReader {
  private static readonly CONFIG_DIR = '.quickstar';
  private static readonly CONFIG_FILE = 'setting.json';

  private static getConfigPath(): string {
    return path.join(os.homedir(), this.CONFIG_DIR, this.CONFIG_FILE);
  }

  private static getConfigDir(): string {
    return path.join(os.homedir(), this.CONFIG_DIR);
  }

  public static async readConfig(): Promise<QuickStarConfig | null> {
    try {
      const configPath = this.getConfigPath();

      if (!fs.existsSync(configPath)) {
        const selection = await vscode.window.showErrorMessage(
          `Configuration file not found: ${this.CONFIG_DIR}/${this.CONFIG_FILE}. Please create it in your home directory.`,
          'Create Config File'
        );
        
        if (selection === 'Create Config File') {
          await this.createSampleConfig();
          // After creating the config, try to read it again
          return await this.readConfig();
        }
        
        return null;
      }

      const configContent = fs.readFileSync(configPath, 'utf8');
      const config = JSON.parse(configContent) as QuickStarConfig;

      // Validate required fields
      if (!config.rule || !config.llmApiKey || !config.llmApiUrl) {
        vscode.window.showErrorMessage(
          'Invalid configuration: rule, llmApiKey, and llmApiUrl are required fields.'
        );
        return null;
      }

      // Set default model if not provided
      if (!config.model) {
        config.model = 'anthropic/claude-3-haiku';
      }

      return config;
    } catch (error) {
      vscode.window.showErrorMessage(
        `Error reading configuration: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      return null;
    }
  }

  public static async createSampleConfig(): Promise<void> {
    try {
      const configDir = this.getConfigDir();
      const configPath = this.getConfigPath();

      // Create directory if it doesn't exist
      if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
      }

      const sampleConfig: QuickStarConfig = {
        rule: 'translate to English',
        llmApiKey: 'your-openrouter-api-key-here',
        llmApiUrl: 'https://openrouter.ai/api/v1/chat/completions',
        model: 'anthropic/claude-3-haiku'
      };

      fs.writeFileSync(configPath, JSON.stringify(sampleConfig, null, 2));
      
      // Show success message with option to open the config file
      const selection = await vscode.window.showInformationMessage(
        `Sample configuration created at ${configPath}. Please update it with your API key.`,
        'Open Config File'
      );
      
      if (selection === 'Open Config File') {
        const document = await vscode.workspace.openTextDocument(configPath);
        await vscode.window.showTextDocument(document);
      }
    } catch (error) {
      vscode.window.showErrorMessage(
        `Error creating sample configuration: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}