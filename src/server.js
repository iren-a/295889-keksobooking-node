const http = require(`http`);
const fs = require(`fs`);
const url = require(`url`);
const util = require(`util`);
const path = require(`path`);
const stat = util.promisify(fs.stat);
const readdir = util.promisify(fs.readdir);
const readfile = util.promisify(fs.readFile);

const HOSTNAME = `127.0.0.1`;
const PORT = 3000;
const STATIC_PATH = __dirname + `/../static`;

const EXTENSION_MAP = {
  '.css': `text/css`,
  '.html': `text/html`,
  '.jpg': `image/jpeg`,
  '.jpeg': `image/jpeg`,
  '.png': `image/png`,
  '.gif': `image/gif`,
  '.ico': `image/x-icon`,
};

const printDirectory = (filepath, files) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Directory content</title>
</head>
<body>
<ul>
    ${files.map((it) => `<li><a href="${path.relative(STATIC_PATH, filepath)}/${it}">${it}</a></li>`).join(``)}
</ul>
</body>
</html>`;
};

const readFile = async (filepath, res) => {
  const data = await readfile(filepath);
  const extension = path.extname(filepath);
  res.setHeader(`content-type`, EXTENSION_MAP[extension] || `text/plain`);
  res.setHeader(`content-length`, Buffer.byteLength(data));
  res.end(data);
};


const readDir = async (filepath, res) => {
  const files = await readdir(filepath);
  res.setHeader(`content-type`, `text/html`);
  const content = printDirectory(filepath, files);
  res.setHeader(`content-length`, Buffer.byteLength(content));
  res.end(content);
};

const server = http.createServer((req, res) => {
  const reqPathName = url.parse(req.url).pathname;
  const filepath = STATIC_PATH + (reqPathName === `/` ? `/index.html` : reqPathName);

  (async () => {
    try {
      const pathStat = await stat(filepath);

      res.statusCode = 200;
      res.statusMessage = `OK`;
      res.setHeader(`content-type`, `text/plain`);

      if (pathStat.isDirectory()) {
        await readDir(filepath, res);
      } else {
        await readFile(filepath, res);
      }

    } catch (err) {
      res.writeHead(404, `Not found`, {
        'content-type': `text/plain`
      });
      res.end(err.message);
    }


  })().catch((err) => {
    res.writeHead(500, err.message, {
      'content-type': `text/plain`
    });
    res.end(err.message);
  });

});


module.exports = {
  name: `--server`,
  description: `Запуск сервера`,
  execute() {
    server.listen(PORT, HOSTNAME, () => {
      console.log(`Server running at http://${HOSTNAME}:${PORT}`);
    });
  }
};

