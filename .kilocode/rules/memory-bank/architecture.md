# Quick Star Extension - Architecture

## 系统架构概览

Quick Star扩展采用模块化架构，将功能分离为独立的模块，便于维护和扩展。

## 核心模块

### 1. Extension Entry Point
**文件**: [`src/extension.ts`](src/extension.ts:1)
- 扩展的主入口点
- 注册命令和快捷键绑定
- 管理扩展生命周期（激活/停用）
- 处理首次使用欢迎消息

**关键功能**:
- [`activate()`](src/extension.ts:5) - 扩展激活时的初始化
- [`deactivate()`](src/extension.ts:43) - 扩展停用时的清理
- 命令注册: [`quickstar.transformText`](src/extension.ts:9) 和 [`quickstar.createSampleConfig`](src/extension.ts:16)

### 2. Text Processing Module
**文件**: [`src/textProcessor.ts`](src/textProcessor.ts:1)
- 核心文本处理逻辑
- 上下文收集和分析
- 与编辑器的交互

**关键功能**:
- [`getContextAroundSelection()`](src/textProcessor.ts:6) - 收集选中文本前后10行作为上下文
- [`transformSelectedText()`](src/textProcessor.ts:40) - 主要的文本转换流程
- 进度提示和错误处理

### 3. Configuration Management
**文件**: [`src/configReader.ts`](src/configReader.ts:1)
- 全局配置文件管理
- 配置验证和错误处理
- 自动创建示例配置

**关键功能**:
- [`readConfig()`](src/configReader.ts:19) - 读取和验证配置
- [`createSampleConfig()`](src/configReader.ts:63) - 创建示例配置文件
- 配置文件路径: `~/.quickstar/setting.json`

### 4. LLM API Client
**文件**: [`src/llmClient.ts`](src/llmClient.ts:1)
- OpenRouter API集成
- HTTP请求处理和错误管理
- 支持上下文感知的文本转换

**关键功能**:
- [`transformText()`](src/llmClient.ts:11) - 基础文本转换
- [`transformTextWithContext()`](src/llmClient.ts:70) - 带上下文的文本转换
- 完善的错误处理（401, 429, 超时等）

### 5. Type Definitions
**文件**: [`src/types.ts`](src/types.ts:1)
- TypeScript类型定义
- API接口定义

**关键类型**:
- [`QuickStarConfig`](src/types.ts:1) - 配置文件结构
- [`OpenRouterRequest`](src/types.ts:8) - API请求格式
- [`OpenRouterResponse`](src/types.ts:16) - API响应格式

## 数据流

```
用户选择文本 → 按Ctrl+G
    ↓
TextProcessor.transformSelectedText()
    ↓
ConfigReader.readConfig() → 读取~/.quickstar/setting.json
    ↓
TextProcessor.getContextAroundSelection() → 收集上下文
    ↓
LLMClient.transformTextWithContext() → 调用OpenRouter API
    ↓
编辑器替换选中文本 → 显示成功消息
```

## 配置系统

### 配置文件位置
- **全局配置**: `~/.quickstar/setting.json`
- **自动创建**: 首次使用时提示创建
- **一次配置**: 全局生效，所有项目共享

### 配置结构
```json
{
  "rule": "转换规则描述",
  "llmApiKey": "OpenRouter API密钥",
  "llmApiUrl": "API端点URL",
  "model": "使用的LLM模型"
}
```

## 上下文感知机制

### 上下文收集
- 自动收集选中文本前后各10行代码
- 保持代码结构和缩进
- 提供行号信息

### 上下文分析
- LLM根据上下文判断选中内容类型
- 支持函数名、变量名、类名等不同代码元素
- 基于上下文应用相应的转换规则

## 错误处理策略

### 配置错误
- 配置文件不存在 → 提示创建
- 配置格式错误 → 显示具体错误信息
- 必填字段缺失 → 验证提示

### API错误
- 401 Unauthorized → API密钥错误提示
- 429 Rate Limited → 速率限制提示
- 超时 → 网络超时提示
- 其他错误 → 通用错误处理

### 用户体验
- 进度提示显示处理状态
- 友好的错误消息
- 自动重试机制（配置创建后）

## 扩展性设计

### 模块化结构
- 每个功能模块独立
- 清晰的接口定义
- 易于添加新功能

### 配置灵活性
- 支持自定义转换规则
- 支持不同LLM模型
- 支持自定义API端点

### 未来扩展点
- 批量文本转换
- 转换历史记录
- 自定义快捷键
- 预设转换规则库