"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextProcessor = void 0;
const vscode = require("vscode");
const configReader_1 = require("./configReader");
const llmClient_1 = require("./llmClient");
class TextProcessor {
    static getContextAroundSelection(document, selection, contextLines = 10) {
        const selectedText = document.getText(selection);
        const startLine = Math.max(0, selection.start.line - contextLines);
        const endLine = Math.min(document.lineCount - 1, selection.end.line + contextLines);
        // Get the context range
        const contextRange = new vscode.Range(new vscode.Position(startLine, 0), new vscode.Position(endLine, document.lineAt(endLine).text.length));
        const contextText = document.getText(contextRange);
        // Create context information
        const contextInfo = `
Context (lines ${startLine + 1}-${endLine + 1}):
\`\`\`
${contextText}
\`\`\`

Selected text (lines ${selection.start.line + 1}-${selection.end.line + 1}):
\`\`\`
${selectedText}
\`\`\`

Please analyze the selected text within its context to understand whether it's a function name, variable name, class name, or other code element, then apply the transformation rule accordingly.`;
        return { contextText, selectedText, contextInfo };
    }
    static async transformSelectedText() {
        try {
            // Get the active text editor
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showErrorMessage('No active text editor found.');
                return;
            }
            // Get the selected text
            const selection = editor.selection;
            if (selection.isEmpty) {
                vscode.window.showErrorMessage('Please select some text to transform.');
                return;
            }
            // Get context around selection
            const { selectedText, contextInfo } = this.getContextAroundSelection(editor.document, selection);
            if (!selectedText.trim()) {
                vscode.window.showErrorMessage('Selected text is empty.');
                return;
            }
            // Show progress indicator
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: 'Transforming text with LLM...',
                cancellable: false
            }, async (progress) => {
                try {
                    // Read configuration
                    progress.report({ message: 'Reading configuration...' });
                    const config = await configReader_1.ConfigReader.readConfig();
                    if (!config) {
                        return; // Error already shown by ConfigReader
                    }
                    // Transform text using LLM with context
                    progress.report({ message: 'Analyzing context and calling LLM API...' });
                    const llmClient = new llmClient_1.LLMClient(config);
                    const transformedText = await llmClient.transformTextWithContext(contextInfo);
                    // Replace the selected text
                    progress.report({ message: 'Updating text...' });
                    await editor.edit(editBuilder => {
                        editBuilder.replace(selection, transformedText);
                    });
                    vscode.window.showInformationMessage('Text transformed successfully!');
                }
                catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
                    vscode.window.showErrorMessage(`Failed to transform text: ${errorMessage}`);
                }
            });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            vscode.window.showErrorMessage(`Error: ${errorMessage}`);
        }
    }
}
exports.TextProcessor = TextProcessor;
//# sourceMappingURL=textProcessor.js.map