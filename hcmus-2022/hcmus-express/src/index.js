const path = require('path');
const express = require('express');

// Get news file
const news = require(path.join(__dirname, 'news.json'));
const packageJson = require(path.join(__dirname, 'package.json'));
news[0].title += " version " + packageJson.dependencies.express;
news[1].title += " version " + packageJson.dependencies.hbs;

function getSearchedNews(req) {
  try {
    const search = req.query.search.toString();
    const searchedNews = news.filter(
      n => n.description.toLowerCase().includes(search.toLowerCase())
    );
    return searchedNews;
  } catch(err) { return news; }
}

const app = express();
app.use('/static', express.static(path.join(__dirname, 'static')))
app.get('/', (req, res) => {
  const news = getSearchedNews(req);
  res.render('index.hbs', {
    ...req.query,
    news,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
