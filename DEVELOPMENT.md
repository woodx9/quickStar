# Quick Star Extension - Development Guide

## Installation for Development

Since the extension packaging requires Node.js 20+, here's how to install and test the extension in development mode:

### Prerequisites

- VSCode 1.74.0 or higher
- Node.js (any version that supports the dependencies)
- OpenRouter API key

### Setup Instructions

1. **Clone/Download the extension files** to a local directory
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Compile the TypeScript code**:
   ```bash
   npm run compile
   ```

4. **VSCode调试模式 (推荐方法)**:
   - 在VSCode中打开扩展项目文件夹
   - 按 `F5` 键或者点击菜单 `Run > Start Debugging`
   - 这会自动编译代码并启动一个新的"Extension Development Host"窗口
   - 扩展会自动加载到新窗口中

5. **手动调试步骤**:
   - 打开VSCode
   - 按 `Ctrl+Shift+P` 打开命令面板
   - 输入 "Developer: Reload Window" 重新加载窗口
   - 或者使用 "Developer: Install Extension from Location" 选择扩展文件夹

6. **调试配置说明**:
   - 项目包含完整的 `.vscode/` 调试配置
   - [`launch.json`](.vscode/launch.json:1) - 调试启动配置
   - [`tasks.json`](.vscode/tasks.json:1) - 编译任务配置
   - [`settings.json`](.vscode/settings.json:1) - 项目设置

### Configuration

1. **Create configuration file** in your home directory:
   ```bash
   mkdir ~/.quickstar
   ```

2. **Create `~/.quickstar/setting.json`** with your settings:
   ```json
   {
     "rule": "translate to English",
     "llmApiKey": "your-openrouter-api-key-here",
     "llmApiUrl": "https://openrouter.ai/api/v1/chat/completions",
     "model": "anthropic/claude-3-haiku"
   }
   ```

3. **Get an OpenRouter API key**:
   - Visit https://openrouter.ai/
   - Sign up and get your API key
   - Replace `your-openrouter-api-key-here` with your actual key

### Usage

1. **Select text** in any file
2. **Press `Ctrl+G`** (or use Command Palette: "Transform Text with LLM")
3. **Wait for the transformation** - the selected text will be replaced with the LLM's response

### Available Commands

- `Quick Star: Transform Text with LLM` - Transform selected text
- `Quick Star: Create Sample Configuration` - Create a sample config file

### Troubleshooting

1. **"Configuration file not found"** - 现在会显示"Create Config File"按钮，点击即可在用户主目录自动创建配置文件
2. **"Invalid API key"** - Check your OpenRouter API key in `~/.quickstar/setting.json`
3. **"No response from LLM API"** - Check your internet connection and API endpoint
4. **配置文件位置** - 配置文件现在位于 `~/.quickstar/setting.json`（用户主目录），全局生效

### 新功能特性

- **一键创建配置文件**: 当配置文件不存在时，错误提示会显示"Create Config File"按钮
- **自动打开配置文件**: 创建配置文件后，可选择"Open Config File"按钮直接编辑
- **智能重试**: 创建配置文件后会自动重新尝试读取配置
- **上下文感知**: 自动收集选中文本前后10行代码作为上下文，帮助LLM更好地理解代码结构
- **智能分析**: LLM会根据上下文判断选中内容是函数名、变量名、类名还是其他代码元素

### Development Commands

- `npm run compile` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for changes and auto-compile

### 快速调试步骤

1. **一键启动调试**:
   ```bash
   # 安装依赖并编译
   npm install && npm run compile
   ```

2. **在VSCode中**:
   - 打开项目文件夹
   - 按 `F5` 启动调试
   - 在新窗口中测试扩展功能

3. **调试快捷键**:
   - `F5` - 启动调试
   - `Ctrl+Shift+F5` - 重启调试
   - `Shift+F5` - 停止调试
   - `Ctrl+Shift+P` → "Developer: Reload Window" - 重新加载扩展

### File Structure

```
quick-star/
├── src/
│   ├── extension.ts          # Main extension entry point
│   ├── configReader.ts       # Configuration file handler
│   ├── llmClient.ts          # OpenRouter API client
│   ├── textProcessor.ts      # Text transformation logic
│   └── types.ts              # TypeScript type definitions
├── out/                      # Compiled JavaScript files
├── .vscode/                  # VSCode调试配置
│   ├── launch.json          # 调试启动配置
│   ├── tasks.json           # 编译任务配置
│   └── settings.json        # 项目设置
├── package.json              # Extension manifest
├── tsconfig.json            # TypeScript configuration
├── DEVELOPMENT.md           # Development guide
└── README.md                # User documentation

Global Configuration:
~/.quickstar/
└── setting.json             # Global configuration file (in user home directory)
```

## Testing

1. Create a test file with some text
2. Select the text you want to transform
3. Press `Ctrl+G`
4. Verify the text is replaced with the LLM response

## Notes

- The extension requires an active internet connection
- API calls may take a few seconds depending on the LLM model
- Make sure your API key has sufficient credits
- The extension will show progress notifications during processing