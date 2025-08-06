export interface QuickStarConfig {
  rule: string;
  llmApiKey: string;
  llmApiUrl: string;
  model?: string;
}

export interface OpenRouterRequest {
  model: string;
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
}

export interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}