// Global imports:
const fs = require("fs");
const http = require("http");
const url = require("url");
const templateRender = require("./js-modules/templateRender");

// File imports:
const data = fs.readFileSync(`${__dirname}/api-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const productTemplate = fs.readFileSync(
  `${__dirname}/html-templates/product-template.html`,
  "utf-8"
);
const overviewTemplate = fs.readFileSync(
  `${__dirname}/html-templates/overview-template.html`,
  "utf-8"
);
const cardTemplate = fs.readFileSync(
  `${__dirname}/html-templates/card-template.html`,
  "utf-8"
);
const icon = fs.readFileSync(`${__dirname}/images/icon.png`);
///////////////////////////////////////////////////////////////////

// Create server:
const server = http.createServer((req, res) => {
  const { query, pathname: path } = url.parse(req.url, true);

  // Overview page:
  if (path === "/overview" || path === "/") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardHtml = dataObj
      .map((product) => templateRender(cardTemplate, product))
      .join("");
    res.end(overviewTemplate.replace("{%PRODUCT_CARDS%}", cardHtml));

    // Product page:
  } else if (path === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    res.end(templateRender(productTemplate, product));

    // API page:
  } else if (path === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);

    // Icon request:
  } else if (path === "/icon") {
    res.writeHead(200, { "Content-type": "image/png" });
    res.end(icon);

    // Page not found:
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello world",
    });
    res.end("<h1>Page not found</h1>");
  }
});

// Server start:
const PORT = process.env.PORT || 3000;
server.listen(PORT, "127.0.0.1", () => {
  console.log(`Listning on port ${PORT}`);
});

///////////////////////////////////////////////////////////////////
