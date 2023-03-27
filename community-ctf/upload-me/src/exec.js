const { spawn } = require('child_process')

async function runNodeJsFile(fileLocation) {
  return new Promise((res, rej) => {
    const child = spawn('node', [fileLocation]);
    let stdout = '';
    child.stdout.on('data', data => stdout += data);
    child.on('close', () => {
      res(stdout);
    });
    child.on('error', (error) => {
      res('');
    });
  });
}

module.exports = { runNodeJsFile };