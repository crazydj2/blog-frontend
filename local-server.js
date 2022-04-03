import http from 'http';
import path from 'path';
import fs from 'fs';
import url from 'url';

const __dirname = path.resolve();

const mimeType = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.eot': 'aplication/vnd.ms-fontobject',
  '.ttf': 'aplication/font-sfnt',
}

const server = http.createServer((request, response) => {
  
  const urlPath = url.parse(request.url).pathname;
  const ext = path.parse(request.url).ext

  let resFilePath = path.join(__dirname, './public');
  let resMimeType = mimeType[ext];

  // 확장자가 없다 --> url 이라 간주하고, url 인 경우에는 index.html 리턴하도록 처리
  if (!resMimeType) {
    resFilePath += '/index.html';
    resMimeType = 'text/html';
  } else {
    resFilePath += urlPath;
  }

  fs.readFile(resFilePath, (err, data) => {
    if (err) {
      response.statusCode = 404;
      response.end('Not found');
    } else {
      response.statusCode = 200;
      response.setHeader('Content-Type', resMimeType);
      response.end(data);
    }
  });
});

server.listen(8080, () => { 
    console.log('Server is running...');
});