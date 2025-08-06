"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLMClient = void 0;
const axios_1 = require("axios");
class LLMClient {
    constructor(config) {
        this.config = config;
    }
    async transformText(selectedText) {
        try {
            const request = {
                model: this.config.model || 'anthropic/claude-3-haiku',
                messages: [
                    {
                        role: 'user',
                        content: `${this.config.rule}: ${selectedText}`
                    }
                ]
            };
            const response = await axios_1.default.post(this.config.llmApiUrl, request, {
                headers: {
                    'Authorization': `Bearer ${this.config.llmApiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://github.com/quickstar-vscode-extension',
                    'X-Title': 'Quick Star VSCode Extension'
                },
                timeout: 30000 // 30 seconds timeout
            });
            if (!response.data.choices || response.data.choices.length === 0) {
                throw new Error('No response from LLM API');
            }
            const transformedText = response.data.choices[0].message.content;
            if (!transformedText) {
                throw new Error('Empty response from LLM API');
            }
            return transformedText.trim();
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                const axiosError = error;
                if (axiosError.response?.status === 401) {
                    throw new Error('Invalid API key. Please check your configuration.');
                }
                else if (axiosError.response?.status === 429) {
                    throw new Error('API rate limit exceeded. Please try again later.');
                }
                else if (axiosError.code === 'ECONNABORTED') {
                    throw new Error('Request timeout. Please try again.');
                }
                else if (axiosError.response?.data && typeof axiosError.response.data === 'object' &&
                    'error' in axiosError.response.data &&
                    typeof axiosError.response.data.error === 'object' &&
                    'message' in axiosError.response.data.error) {
                    throw new Error(`API Error: ${axiosError.response.data.error.message}`);
                }
                else {
                    throw new Error(`Network error: ${axiosError.message}`);
                }
            }
            else {
                throw new Error(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }
    }
    async transformTextWithContext(contextInfo) {
        try {
            const request = {
                model: this.config.model || 'anthropic/claude-3-haiku',
                messages: [
                    {
                        role: 'user',
                        content: `${this.config.rule}

${contextInfo}`
                    }
                ]
            };
            const response = await axios_1.default.post(this.config.llmApiUrl, request, {
                headers: {
                    'Authorization': `Bearer ${this.config.llmApiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://github.com/quickstar-vscode-extension',
                    'X-Title': 'Quick Star VSCode Extension'
                },
                timeout: 30000 // 30 seconds timeout
            });
            if (!response.data.choices || response.data.choices.length === 0) {
                throw new Error('No response from LLM API');
            }
            const transformedText = response.data.choices[0].message.content;
            if (!transformedText) {
                throw new Error('Empty response from LLM API');
            }
            return transformedText.trim();
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                const axiosError = error;
                if (axiosError.response?.status === 401) {
                    throw new Error('Invalid API key. Please check your configuration.');
                }
                else if (axiosError.response?.status === 429) {
                    throw new Error('API rate limit exceeded. Please try again later.');
                }
                else if (axiosError.code === 'ECONNABORTED') {
                    throw new Error('Request timeout. Please try again.');
                }
                else if (axiosError.response?.data && typeof axiosError.response.data === 'object' &&
                    'error' in axiosError.response.data &&
                    typeof axiosError.response.data.error === 'object' &&
                    'message' in axiosError.response.data.error) {
                    throw new Error(`API Error: ${axiosError.response.data.error.message}`);
                }
                else {
                    throw new Error(`Network error: ${axiosError.message}`);
                }
            }
            else {
                throw new Error(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }
    }
}
exports.LLMClient = LLMClient;
//# sourceMappingURL=llmClient.js.map