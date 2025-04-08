const express = require('express');
const https = require('https');

const app = express();
const PORT = 3000;


app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} запрос от ${req.ip} к ${req.originalUrl}`);
  next();
});


app.get('/myip', (req, res) => {
  console.log(`[${new Date().toISOString()}] Запрос от: ${req.ip}`);

  https.get('https://api64.ipify.org?format=json', (apiRes) => {
    let data = '';
    apiRes.on('data', chunk => data += chunk);
    apiRes.on('end', () => {
      console.log(`[${new Date().toISOString()}] Отправлен IP: ${JSON.parse(data).ip}`);
      res.json(JSON.parse(data));
    });
  }).on('error', err => {
    console.error(`[${new Date().toISOString()}] Ошибка:`, err);
    res.status(500).json({ error: 'Ошибка получения IP' });
  });
});
 
app.listen(3000, '0.0.0.0', () => {
  console.log('Сервер запущен на порту 3000');
});