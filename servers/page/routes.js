const express = require('express');
const path = require('path');
const cors = require('cors');

const pageApp = express();

pageApp.use(cors());

const filePath = '../../public/index.html';
const absolutPath = path.join(`${__dirname}`, filePath);
pageApp.get('/', (req, res) => {
  res.sendFile(absolutPath);
});

pageApp.get('/style/index.css', (req, res) => {
  const filePath = path.join(__dirname, '../../public', 'style', 'index.css');
  res.set('Content-Type', 'text/css'); // Define o tipo MIME do arquivo para 'text/css'
  res.sendFile(filePath);
});

pageApp.get('/index.js', (req, res) => {
  const filePath = path.join(__dirname, '../../public', 'index.js');
  res.set('Content-Type', 'application/javascript'); // Define o tipo MIME do arquivo para 'application/javascript'
  res.sendFile(filePath);
});

module.exports = { pageApp }