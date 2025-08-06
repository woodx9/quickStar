import axios, { AxiosError } from 'axios';
import { QuickStarConfig, OpenRouterRequest, OpenRouterResponse } from './types';

export class LLMClient {
  private config: QuickStarConfig;

  constructor(config: QuickStarConfig) {
    this.config = config;
  }

  public async transformText(selectedText: string): Promise<string> {
    try {
      const request: OpenRouterRequest = {
        model: this.config.model || 'anthropic/claude-3-haiku',
        messages: [
          {
            role: 'user',
            content: `${this.config.rule}: ${selectedText}`
          }
        ]
      };

      const response = await axios.post<OpenRouterResponse>(
        this.config.llmApiUrl,
        request,
        {
          headers: {
            'Authorization': `Bearer ${this.config.llmApiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://github.com/quickstar-vscode-extension',
            'X-Title': 'Quick Star VSCode Extension'
          },
          timeout: 30000 // 30 seconds timeout
        }
      );

      if (!response.data.choices || response.data.choices.length === 0) {
        throw new Error('No response from LLM API');
      }

      const transformedText = response.data.choices[0].message.content;
      if (!transformedText) {
        throw new Error('Empty response from LLM API');
      }

      return transformedText.trim();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          throw new Error('Invalid API key. Please check your configuration.');
        } else if (axiosError.response?.status === 429) {
          throw new Error('API rate limit exceeded. Please try again later.');
        } else if (axiosError.code === 'ECONNABORTED') {
          throw new Error('Request timeout. Please try again.');
        } else if (axiosError.response?.data && typeof axiosError.response.data === 'object' &&
                   'error' in axiosError.response.data &&
                   typeof (axiosError.response.data as any).error === 'object' &&
                   'message' in (axiosError.response.data as any).error) {
          throw new Error(`API Error: ${(axiosError.response.data as any).error.message}`);
        } else {
          throw new Error(`Network error: ${axiosError.message}`);
        }
      } else {
        throw new Error(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }

  public async transformTextWithContext(contextInfo: string): Promise<string> {
    try {
      const request: OpenRouterRequest = {
        model: this.config.model || 'anthropic/claude-3-haiku',
        messages: [
          {
            role: 'user',
            content: `${this.config.rule}

${contextInfo}`
          }
        ]
      };

      const response = await axios.post<OpenRouterResponse>(
        this.config.llmApiUrl,
        request,
        {
          headers: {
            'Authorization': `Bearer ${this.config.llmApiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://github.com/quickstar-vscode-extension',
            'X-Title': 'Quick Star VSCode Extension'
          },
          timeout: 30000 // 30 seconds timeout
        }
      );

      if (!response.data.choices || response.data.choices.length === 0) {
        throw new Error('No response from LLM API');
      }

      const transformedText = response.data.choices[0].message.content;
      if (!transformedText) {
        throw new Error('Empty response from LLM API');
      }

      return transformedText.trim();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          throw new Error('Invalid API key. Please check your configuration.');
        } else if (axiosError.response?.status === 429) {
          throw new Error('API rate limit exceeded. Please try again later.');
        } else if (axiosError.code === 'ECONNABORTED') {
          throw new Error('Request timeout. Please try again.');
        } else if (axiosError.response?.data && typeof axiosError.response.data === 'object' &&
                   'error' in axiosError.response.data &&
                   typeof (axiosError.response.data as any).error === 'object' &&
                   'message' in (axiosError.response.data as any).error) {
          throw new Error(`API Error: ${(axiosError.response.data as any).error.message}`);
        } else {
          throw new Error(`Network error: ${axiosError.message}`);
        }
      } else {
        throw new Error(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }
}