const fs = require('fs');
const http = require('http');
const { visit } = require('./pupeteer');
const html = fs.readFileSync('./index.html', 'utf-8');

function serve({ error, success }) {
  if (!error) error = '';
  if (!success) success = '';
  return html.replace('{error}', error.toString()).replace('{success}', success.toString());
}

function serveGet(req, res) {
  res.writeHead(200);
  res.end(serve({}));
}

async function parseBody(req) {
  return new Promise(resolve => {
    let data = '';
    req.on('data', chunk => { data += chunk });
    req.on('end', () => {
      resolve(data);
    });
  });
}

async function parseBodyUrl(req) {
  try {
    const body = await parseBody(req);
    const found = body.match(/^url=(.+)$/i);
    if (!found) return null;
    const url = new URL(decodeURIComponent(found[1]));
    return url.toString();
  } catch (err) {
    console.log(err);
    return null;
  }
}

function getProtocol(url) {
  try {
    const u = new URL(url);
    return u.protocol;
  } catch (err) { return undefined; }
}

async function servePost(req, res) {
  const url = await parseBodyUrl(req);
  const protocol = getProtocol(url);
  if (protocol !== 'http:' && protocol !== 'https:') {
    return res.end(serve({error:'URL protocol must be http or https'}));
  }
  if (url) {
    visit(url).then(() => {
      console.log(`Done visitted ${url}`);
    });
    res.end(serve({success:'Success'}));
  } else {
    res.end(serve({error:'Some error happened'}));
  }
}

const server = http.createServer(async (req, res) => {
  switch (req.method) {
    case 'GET': serveGet(req, res); break;
    case 'POST': await servePost(req, res); break;
  }
});
server.listen(8080, '0.0.0.0');
