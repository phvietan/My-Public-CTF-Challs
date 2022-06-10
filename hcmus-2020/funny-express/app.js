require('dotenv').config()
const express = require('express');
const fs = require('fs');

const PORT = process.env.PORT;
const FLAG = process.env.FLAG || "<REDACTED>";
const SOURCE = fs.readFileSync('app.js');

const app = express();
const filterChars = '!@#$%^&*()_+|\\{},./;:"\'\n\r';

app.get('/', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain;charset=utf-8');

  if (!('query' in req.query)) {
    res.end(SOURCE);
    return;
  }
  const { query: q } = req.query

  // Check 1
  let q1 = ''
  for (let i = 0; i < q.length; i += 1) {
    if (filterChars.includes(q[i])) continue;
    q1 += q[i];
  }
  if (q1.length == q.length) {
    res.end("Fail level 1 check");
    return;
  }

  // Check 2
  let q2 = ''
  for (let i = 0; i < q.length; i += 1) {
    if (!filterChars.includes(q[i])) continue;
    q2 += q[i];
  }
  if (q2.length != q1.length) {
    res.end("Fail level 2 check");
    return;
  }

  // Check 3
  if (q1.length + q2.length == q.length) {
    res.end("Fail level 3 check\nYou got trolled so hard xD");
    return;
  }

  // This is the last check
  try {
    const lastCheck = 'Hello ' + q + ' World';
    res.end(`Almost there.\nI received ${lastCheck}`);
  } catch {
    res.end(`Well done\n${FLAG}`);
  }
})

app.listen(PORT, () => {
  console.log(`Challenge listening at port ${PORT}`)
})
