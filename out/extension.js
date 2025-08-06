"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const textProcessor_1 = require("./textProcessor");
const configReader_1 = require("./configReader");
function activate(context) {
    console.log('Quick Star extension is now active!');
    // Register the transform text command
    const transformTextCommand = vscode.commands.registerCommand('quickstar.transformText', async () => {
        await textProcessor_1.TextProcessor.transformSelectedText();
    });
    // Register command to create sample configuration
    const createConfigCommand = vscode.commands.registerCommand('quickstar.createSampleConfig', async () => {
        await configReader_1.ConfigReader.createSampleConfig();
    });
    // Add commands to subscriptions
    context.subscriptions.push(transformTextCommand);
    context.subscriptions.push(createConfigCommand);
    // Show welcome message on first activation
    const hasShownWelcome = context.globalState.get('quickstar.hasShownWelcome', false);
    if (!hasShownWelcome) {
        vscode.window.showInformationMessage('Quick Star extension activated! Use Ctrl+G to transform selected text with LLM.', 'Create Sample Config').then(selection => {
            if (selection === 'Create Sample Config') {
                vscode.commands.executeCommand('quickstar.createSampleConfig');
            }
        });
        context.globalState.update('quickstar.hasShownWelcome', true);
    }
}
exports.activate = activate;
function deactivate() {
    console.log('Quick Star extension is now deactivated.');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map