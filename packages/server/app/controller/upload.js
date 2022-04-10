'use strict';

const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path');
const pump = require('mz-modules/pump');

// const dayjs = require('dayjs');

function createRandomFileName(filename) {
  // const now = dayjs().format('YYYY-MM-DD');
  const rnd = Math.floor(Math.random() * 10000);
  return `${+new Date()}_${rnd}_${filename}`;
}

class UploadController extends Controller {
  // 上传到磁盘
  async upload() {
    const {ctx /* app*/} = this;
    const files = ctx.request.files;
    if (!files) {
      throw new Error('未找到上传文件');
    }

    try {
      const ans = [];
      for (const file of files) {
        const filename = file.filename.toLowerCase();
        let filePath = path.join('public/upload', createRandomFileName(filename));
        const targetPath = path.join(this.config.baseDir, 'app', filePath);
        const source = fs.createReadStream(file.filepath);
        const target = fs.createWriteStream(targetPath);
        await pump(source, target);
        ctx.logger.info('upload file', filePath);
        // ans.push({ url: `${app.localHost}/${filePath}` });
        if (process.env.NODE_ENV === 'development') {
          // filePath = 'http://172.16.20.31:7001/' + filePath;
          filePath = 'http://192.168.0.5:7001/' + filePath;
        } else {
          filePath = 'http://139.186.169.45:7001/' + filePath;
        }
        ans.push({url: `${filePath}`});
      }
      ctx.body = ans;
    } finally {
      // delete those request tmp files
      await ctx.cleanupRequestFiles();
    }
  }
}

module.exports = UploadController
