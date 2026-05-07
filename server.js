const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

const pages = ['home', 'history', 'login', 'search', 'watch', 'settings', 'trend', 'short'];

pages.forEach(page => {
  app.get(`/${page === 'home' ? '' : page}`, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', `${page}.html`));
  });
  app.get(`/${page}`, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', `${page}.html`));
  });
});

app.listen(PORT, () => {
  console.log(`Nuvis running at http://localhost:${PORT}`);
});
