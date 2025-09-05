const path = require('path');

async function generateBanner() {
  console.log('🚀 开始生成LinkedIn封面图片...');

  // 动态导入puppeteer
  const puppeteer = require('puppeteer');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // 设置视口尺寸为LinkedIn封面图片尺寸
    await page.setViewport({
      width: 1584,
      height: 396,
      deviceScaleFactor: 2 // 提高清晰度
    });

    // 获取HTML文件的绝对路径
    const htmlPath = path.resolve(__dirname, 'linkedin-cover.html');
    const fileUrl = `file://${htmlPath}`;

    console.log(`📄 加载页面: ${fileUrl}`);
    await page.goto(fileUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // 等待所有图片加载完成
    await page.waitForFunction(() => {
      const images = document.querySelectorAll('img');
      return Array.from(images).every(img => img.complete);
    }, { timeout: 10000 });

    console.log('📸 开始截图...');

    // 截图并保存 - 只截取container区域
    const containerElement = await page.$('.container');
    await containerElement.screenshot({
      path: 'linkedin-banner.png',
      type: 'png'
    });

    console.log('✅ 图片生成成功！保存为: linkedin-banner.png');
    console.log('📏 尺寸: 1584 x 396 像素');
    console.log('🎯 可以直接用作LinkedIn封面图片');

  } catch (error) {
    console.error('❌ 生成失败:', error.message);
  } finally {
    await browser.close();
  }
}

// 检查是否安装了puppeteer
async function checkDependencies() {
  try {
    require.resolve('puppeteer');
    return true;
  } catch (e) {
    console.log('📦 正在安装Puppeteer...');
    const { execSync } = require('child_process');
    try {
      execSync('npm install puppeteer', { stdio: 'inherit' });
      console.log('✅ Puppeteer安装完成！');
      return true;
    } catch (installError) {
      console.error('❌ Puppeteer安装失败:', installError.message);
      console.log('💡 请手动运行: npm install puppeteer');
      return false;
    }
  }
}

// 主函数
async function main() {
  console.log('🎨 LinkedIn封面图片生成器');
  console.log('================================');

  const hasPuppeteer = await checkDependencies();
  if (hasPuppeteer) {
    await generateBanner();
  } else {
    console.log('❌ 无法继续，请先安装Puppeteer');
    process.exit(1);
  }
}

// 运行脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { generateBanner };
