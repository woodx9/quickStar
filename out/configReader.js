"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigReader = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const os = require("os");
class ConfigReader {
    static getConfigPath() {
        return path.join(os.homedir(), this.CONFIG_DIR, this.CONFIG_FILE);
    }
    static getConfigDir() {
        return path.join(os.homedir(), this.CONFIG_DIR);
    }
    static async readConfig() {
        try {
            const configPath = this.getConfigPath();
            if (!fs.existsSync(configPath)) {
                const selection = await vscode.window.showErrorMessage(`Configuration file not found: ${this.CONFIG_DIR}/${this.CONFIG_FILE}. Please create it in your home directory.`, 'Create Config File');
                if (selection === 'Create Config File') {
                    await this.createSampleConfig();
                    // After creating the config, try to read it again
                    return await this.readConfig();
                }
                return null;
            }
            const configContent = fs.readFileSync(configPath, 'utf8');
            const config = JSON.parse(configContent);
            // Validate required fields
            if (!config.rule || !config.llmApiKey || !config.llmApiUrl) {
                vscode.window.showErrorMessage('Invalid configuration: rule, llmApiKey, and llmApiUrl are required fields.');
                return null;
            }
            // Set default model if not provided
            if (!config.model) {
                config.model = 'anthropic/claude-3-haiku';
            }
            return config;
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error reading configuration: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return null;
        }
    }
    static async createSampleConfig() {
        try {
            const configDir = this.getConfigDir();
            const configPath = this.getConfigPath();
            // Create directory if it doesn't exist
            if (!fs.existsSync(configDir)) {
                fs.mkdirSync(configDir, { recursive: true });
            }
            const sampleConfig = {
                rule: 'translate to English',
                llmApiKey: 'your-openrouter-api-key-here',
                llmApiUrl: 'https://openrouter.ai/api/v1/chat/completions',
                model: 'anthropic/claude-3-haiku'
            };
            fs.writeFileSync(configPath, JSON.stringify(sampleConfig, null, 2));
            // Show success message with option to open the config file
            const selection = await vscode.window.showInformationMessage(`Sample configuration created at ${configPath}. Please update it with your API key.`, 'Open Config File');
            if (selection === 'Open Config File') {
                const document = await vscode.workspace.openTextDocument(configPath);
                await vscode.window.showTextDocument(document);
            }
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error creating sample configuration: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}
exports.ConfigReader = ConfigReader;
ConfigReader.CONFIG_DIR = '.quickstar';
ConfigReader.CONFIG_FILE = 'setting.json';
//# sourceMappingURL=configReader.js.map