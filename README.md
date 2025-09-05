# LinkedIn Banner Generator

一个简单的工具，用于将HTML页面转换为高质量的LinkedIn封面图片。

## 功能特点

- 🎯 精确尺寸：1584 x 396 像素
- 🖼️ 高质量输出：PNG格式，2倍分辨率
- 🚀 自动安装依赖
- 📸 等待图片加载完成
- 🎨 支持所有CSS效果和字体

## 使用方法

### 方法1：直接运行（推荐）
```bash
node generate-banner.js
```

### 方法2：使用npm脚本
```bash
npm run generate
```

## 输出文件

- 文件名：`linkedin-banner.png`
- 尺寸：1584 x 396 像素
- 格式：PNG
- 质量：高清（2倍分辨率）

## 系统要求

- Node.js 14+ 
- 足够的磁盘空间（约50MB用于Puppeteer）

## 故障排除

如果遇到问题：

1. **权限问题**：确保有写入权限
2. **网络问题**：确保能访问外部字体和图标
3. **内存不足**：关闭其他程序释放内存

## 文件结构

```
├── linkedin-cover.html    # HTML源文件
├── generate-banner.js     # 生成脚本
├── package.json          # 依赖配置
└── linkedin-banner.png   # 生成的图片（运行后出现）
```

## 注意事项

- 确保所有图片文件（IMG_*.jpg, Portrait.png）都在同一目录
- 首次运行会自动安装Puppeteer（约100MB）
- 生成的图片可以直接上传到LinkedIn
