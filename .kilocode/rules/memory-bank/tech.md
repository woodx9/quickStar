# Quick Star Extension - Technical Stack

## 核心技术栈

### 开发语言和框架
- **TypeScript 4.9.4** - 主要开发语言，提供类型安全
- **Node.js 16.x** - 运行时环境
- **VSCode Extension API 1.74.0+** - 扩展开发框架

### 依赖库
- **axios 1.6.0** - HTTP客户端，用于API调用
- **vscode** - VSCode扩展API类型定义

### 开发工具
- **@vscode/vsce 3.6.0** - VSCode扩展打包工具
- **TypeScript Compiler** - 代码编译

## 项目结构

```
quick-star/
├── src/                          # 源代码目录
│   ├── extension.ts              # 扩展入口点
│   ├── configReader.ts           # 配置文件管理
│   ├── llmClient.ts              # LLM API客户端
│   ├── textProcessor.ts          # 文本处理逻辑
│   └── types.ts                  # TypeScript类型定义
├── out/                          # 编译输出目录
├── .vscode/                      # VSCode调试配置
│   ├── launch.json               # 调试启动配置
│   ├── tasks.json                # 编译任务配置
│   └── settings.json             # 项目设置
├── .kilocode/                    # Kilo Code配置
│   └── rules/memory-bank/        # Memory Bank文档
├── package.json                  # 项目配置和依赖
├── tsconfig.json                 # TypeScript编译配置
├── README.md                     # 用户文档
└── DEVELOPMENT.md                # 开发文档
```

## 编译配置

### TypeScript配置 ([`tsconfig.json`](tsconfig.json:1))
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2020",
    "outDir": "out",
    "lib": ["ES2020", "DOM"],
    "sourceMap": true,
    "rootDir": "src",
    "strict": true
  }
}
```

### 构建脚本 ([`package.json`](package.json:40))
- `npm run compile` - 编译TypeScript代码
- `npm run watch` - 监听文件变化自动编译
- `npm run vscode:prepublish` - 发布前编译

## 开发环境配置

### VSCode调试配置 ([`.vscode/launch.json`](.vscode/launch.json:1))
- **Run Extension** - 启动扩展开发主机
- **Extension Tests** - 运行扩展测试
- 自动编译前置任务配置

### 编译任务 ([`.vscode/tasks.json`](.vscode/tasks.json:1))
- TypeScript编译任务
- 监听模式编译
- 问题匹配器配置

### 项目设置 ([`.vscode/settings.json`](.vscode/settings.json:1))
- TypeScript自动导入禁用
- 文件排除配置
- 搜索排除配置

## API集成

### OpenRouter API
- **端点**: `https://openrouter.ai/api/v1/chat/completions`
- **认证**: Bearer Token
- **请求格式**: OpenAI兼容格式
- **超时设置**: 30秒
- **错误处理**: 401, 429, 超时等状态码

### HTTP客户端配置
```typescript
// 请求头配置
headers: {
  'Authorization': `Bearer ${apiKey}`,
  'Content-Type': 'application/json',
  'HTTP-Referer': 'https://github.com/quickstar-vscode-extension',
  'X-Title': 'Quick Star VSCode Extension'
}
```

## 配置管理

### 全局配置文件
- **位置**: `~/.quickstar/setting.json`
- **格式**: JSON
- **自动创建**: 首次使用时提示创建
- **验证**: 必填字段检查

### 配置结构
```typescript
interface QuickStarConfig {
  rule: string;        // 转换规则
  llmApiKey: string;   // API密钥
  llmApiUrl: string;   // API端点
  model?: string;      // 模型名称（可选）
}
```

## 错误处理策略

### API错误处理
- **401 Unauthorized** - API密钥无效
- **429 Rate Limited** - 请求频率限制
- **ECONNABORTED** - 请求超时
- **网络错误** - 连接问题

### 配置错误处理
- 文件不存在检查
- JSON格式验证
- 必填字段验证
- 用户友好的错误提示

## 性能优化

### 上下文收集优化
- 限制上下文行数（默认10行）
- 避免过大的文本传输
- 智能上下文截取

### API调用优化
- 30秒超时设置
- 错误重试机制
- 进度提示用户体验

## 安全考虑

### API密钥管理
- 本地配置文件存储
- 不在代码中硬编码
- 用户自行管理密钥

### 数据传输
- HTTPS加密传输
- 不存储用户代码内容
- 实时处理，不缓存

## 扩展性设计

### 模块化架构
- 独立的功能模块
- 清晰的接口定义
- 易于单元测试

### 配置灵活性
- 支持多种LLM模型
- 自定义API端点
- 可配置转换规则

### 未来技术栈扩展
- 支持更多LLM提供商
- 本地模型集成可能性
- 插件系统扩展

## 开发工作流

### 本地开发
1. `npm install` - 安装依赖
2. `npm run compile` - 编译代码
3. `F5` - 启动调试模式
4. 在Extension Development Host中测试

### 调试流程
1. 设置断点
2. 启动调试会话
3. 在新窗口中触发功能
4. 查看调试输出和变量

### 发布准备
1. `npm run vscode:prepublish` - 预发布编译
2. 使用vsce打包扩展
3. 发布到VSCode Marketplace