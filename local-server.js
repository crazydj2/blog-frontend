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

  // html 파일이거나, 혹은 파일명이 아닌 url 인 경우, -> 타겟 html (혹은 inde.html) 리턴
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