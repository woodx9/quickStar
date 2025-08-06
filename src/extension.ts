import * as vscode from 'vscode';
import { TextProcessor } from './textProcessor';
import { ConfigReader } from './configReader';

export function activate(context: vscode.ExtensionContext) {
  console.log('Quick Star extension is now active!');

  // Register the transform text command
  const transformTextCommand = vscode.commands.registerCommand(
    'quickstar.transformText',
    async () => {
      await TextProcessor.transformSelectedText();
    }
  );

  // Register command to create sample configuration
  const createConfigCommand = vscode.commands.registerCommand(
    'quickstar.createSampleConfig',
    async () => {
      await ConfigReader.createSampleConfig();
    }
  );

  // Add commands to subscriptions
  context.subscriptions.push(transformTextCommand);
  context.subscriptions.push(createConfigCommand);

  // Show welcome message on first activation
  const hasShownWelcome = context.globalState.get('quickstar.hasShownWelcome', false);
  if (!hasShownWelcome) {
    vscode.window.showInformationMessage(
      'Quick Star extension activated! Use Ctrl+G to transform selected text with LLM.',
      'Create Sample Config'
    ).then(selection => {
      if (selection === 'Create Sample Config') {
        vscode.commands.executeCommand('quickstar.createSampleConfig');
      }
    });
    context.globalState.update('quickstar.hasShownWelcome', true);
  }
}

export function deactivate() {
  console.log('Quick Star extension is now deactivated.');
}