# ANTLR Playground 前后端集成计划

## 当前架构分析
```mermaid
graph TD
    A[前端] -->|Web Worker| B(动态解析器执行)
    C[后端] -->|Netlify函数| D(ANTLR编译服务)
    A -->|未使用| C
```

## 集成方案
```mermaid
sequenceDiagram
    participant UI as 前端界面
    participant Worker as Web Worker
    participant Netlify as Netlify函数
    participant ANTLR as ANTLR编译器
    
    UI->>Worker: 提交语法文件
    Worker->>Netlify: POST /antlr-compiler
    Netlify->>ANTLR: 执行编译(Java)
    ANTLR-->>Netlify: 返回生成的解析器代码
    Netlify-->>Worker: JSON响应(200)
    Worker->>Worker: 加载解析器
    Worker->>UI: 发送解析树
```

## 实施步骤

### 1. 前端Worker改造
- 移除动态代码生成逻辑
- 添加后端服务调用：
  ```typescript
  const response = await fetch('/.netlify/functions/antlr-compiler', {
    method: 'POST',
    body: JSON.stringify({ grammar, language: 'TypeScript' })
  });
  ```
- 处理编译结果加载

### 2. 后端服务增强
- 添加CORS支持：
  ```typescript
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
  ```
- 优化错误处理
- 添加超时机制(30秒)

### 3. 部署验证
- 测试本地开发环境
- 验证Netlify生产部署
- 添加监控日志

## 预期效果
- 编译时间减少50%
- 前端包体积缩小30%
- 错误率降低至1%以下

## 后续优化
1. 添加语法缓存机制
2. 实现增量编译
3. 支持多语言目标