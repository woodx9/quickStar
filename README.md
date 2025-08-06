## 使用地址

[在 Visual Studio Marketplace 上查看 Quick Star 扩展](https://marketplace.visualstudio.com/items?itemName=woodx9.quick-star)

# Quick Star VSCode 扩展

使用 LLM API 和可自定义规则转换选中的文本。

## 功能特性

- 使用任何兼容 OpenRouter 的 LLM API 转换选中文本
- 可自定义转换规则
- 简单的键盘快捷键 (Ctrl+G)
- 通过 JSON 文件轻松配置

## 安装

1. 在 VSCode 中安装扩展
2. 在项目根目录创建 `.quickstar` 文件夹
3. 在 `.quickstar` 文件夹内创建 `setting.json` 配置文件

## 配置

在您的主目录中创建 `.quickstar/setting.json` 文件，结构如下：

```json
{
  "rule": "翻译成英文",
  "llmApiKey": "your-openrouter-api-key",
  "llmApiUrl": "https://openrouter.ai/api/v1/chat/completions",
  "model": "anthropic/claude-3-haiku"
}
```

**配置文件位置**: `~/.quickstar/setting.json` (在您的主目录中)

### 配置参数

- `rule`: 发送给LLM的指令（例如："翻译成英文"、"重构这段代码"、"总结这段文本"）
- `llmApiKey`: 您的OpenRouter API密钥
- `llmApiUrl`: API端点URL（默认：OpenRouter）
- `model`: 要使用的LLM模型（可选，默认为"anthropic/claude-3-haiku"）

## 使用方法

1. 在任意文件中选择文本
2. 按下 `Ctrl+G`（或使用命令面板："Transform Text with LLM"）
3. 所选文本将被LLM的响应替换

## 命令

- `Quick Star: Transform Text with LLM` - 使用LLM转换选定文本
- `Quick Star: Create Sample Configuration` - 创建示例配置文件

## 要求

- VSCode 1.74.0 或更高版本
- OpenRouter API密钥（或兼容的API）
- 有效的网络连接

## 扩展设置

此扩展提供以下设置：

- 配置通过项目根目录中的 `.quickstar/setting.json` 文件管理

## 已知问题

- 需要网络连接进行API调用
- 根据您的计划，可能会有API速率限制

## 发布说明

### 1.0.0

Quick Star扩展的首次发布。

## 许可证

MIT许可证

## Marketplace Link

[View Quick Star Extension on Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=woodx9.quick-star)

# Quick Star VSCode Extension

Transform selected text using LLM API with customizable rules.

## Features

- Transform selected text using any OpenRouter-compatible LLM API
- Customizable transformation rules
- Simple keyboard shortcut (Ctrl+G)
- Easy configuration through JSON file

## Installation

1. Install the extension in VSCode
2. Create a `.quickstar` folder in your project root
3. Create a `setting.json` file inside the `.quickstar` folder with your configuration

## Configuration

Create a `.quickstar/setting.json` file in your home directory with the following structure:

```json
{
  "rule": "translate to English",
  "llmApiKey": "your-openrouter-api-key",
  "llmApiUrl": "https://openrouter.ai/api/v1/chat/completions",
  "model": "anthropic/claude-3-haiku"
}
```

**Configuration file location**: `~/.quickstar/setting.json` (in your home directory)

### Configuration Parameters

- `rule`: The instruction to send to the LLM (e.g., "translate to English", "refactor this code", "summarize this text")
- `llmApiKey`: Your OpenRouter API key
- `llmApiUrl`: The API endpoint URL (default: OpenRouter)
- `model`: The LLM model to use (optional, defaults to "anthropic/claude-3-haiku")

## Usage

1. Select text in any file
2. Press `Ctrl+G` (or use Command Palette: "Transform Text with LLM")
3. The selected text will be replaced with the LLM's response

## Commands

- `Quick Star: Transform Text with LLM` - Transform selected text
- `Quick Star: Create Sample Configuration` - Create a sample configuration file

## Requirements

- VSCode 1.74.0 or higher
- OpenRouter API key (or compatible API)
- Active internet connection

## Extension Settings

This extension contributes the following settings:

- Configuration is managed through `.quickstar/setting.json` file in your project root

## Known Issues

- Requires internet connection for API calls
- API rate limits may apply depending on your plan

## Release Notes

### 1.0.0

Initial release of Quick Star extension.

## License

MIT License