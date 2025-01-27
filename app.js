// Global imports:
import fs from 'fs';
import http from 'http';
import path from 'path';
import url from 'url';

// Global veriables:
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Modules imports:
import templateRender from './src/modules/templateRender.js';

///////////////////////////////////////////////////////////////////

// Public route:
const publicDir = path.join(__dirname, 'public');

const servePublicFile = (filePath, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-type': 'text/html' });
      res.end('<h1>File not found</h1>');
    } else {
      const ext = path.extname(filePath).slice(1);
      const mimeTypes = {
        css: 'text/css',
      };
      res.writeHead(200, { 'Content-type': mimeTypes[ext] || 'text/plain' });
      res.end(data);
    }
  });
};

// File imports:
const data = fs.readFileSync(`${__dirname}/src/api/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const productTemplate = fs.readFileSync(
  `${__dirname}/src/templates/product-template.html`,
  'utf-8'
);
const overviewTemplate = fs.readFileSync(
  `${__dirname}/src/templates/overview-template.html`,
  'utf-8'
);
const cardTemplate = fs.readFileSync(
  `${__dirname}/src/templates/card-template.html`,
  'utf-8'
);
const icon = fs.readFileSync(`${__dirname}/src/img/icon.png`);
///////////////////////////////////////////////////////////////////

// Create server:
const server = http.createServer((req, res) => {
  const { query, pathname: path } = url.parse(req.url, true);

  // Overview page:
  if (path === '/overview' || path === '/') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const cardHtml = dataObj
      .map((product) => templateRender(cardTemplate, product))
      .join('');
    res.end(overviewTemplate.replace('{%PRODUCT_CARDS%}', cardHtml));

    // Product page:
  } else if (path === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    res.end(templateRender(productTemplate, product));

    // API page:
  } else if (path === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);

    // Icon request:
  } else if (path === '/icon') {
    res.writeHead(200, { 'Content-type': 'image/png' });
    res.end(icon);

    // Page not found:
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello world',
    });
    res.end('<h1>Page not found</h1>');
  }
});

// Server start:
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(
    `Server is live\nctrl + click to open => http://localhost:${PORT}\nctrl + c to terminate program`
  );
});
