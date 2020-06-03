import compression from 'compression';
import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import Hello from './public/components/Hello';
import MultipleRoutes from './public/components/MultipleRoutes';

const app = express();

app.use(compression());

app.use('/static', express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
  const { name = 'Marvelous Wololo' } = req.query;

  const componentStream = ReactDOMServer.renderToNodeStream(<Hello name={name} />);

  const htmlStart = `<!doctype html>
    <html>
    <head>
      <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <style>
        body { font-family: Arial, sans-serif; font-size: 15px; }
      </style>
      <script>window.__INITIAL__DATA__ = ${JSON.stringify({ name })}</script>
    </head>
    <body>
    <div id="root">`;

  res.write(htmlStart);

  componentStream.pipe(res, { end: false });

  const htmlEnd = `</div>
    <script src="/static/vendors~home.js~multipleRoutes.js"></script>
    <script src="/static/home.js"></script>
  </body>
  </html>`;

  componentStream.on('end', () => {
    res.write(htmlEnd);

    res.end();
  });
});

app.get('/with-react-router*', (req, res) => {
  const context = {};

  const component = ReactDOMServer.renderToString(
    <Router location={req.url} context={context}>
      <MultipleRoutes />
    </Router>
  );

  const html = `
    <!doctype html>
      <html>
      <head>
        <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <style>
          body { font-family: Arial, sans-serif; font-size: 15px; }
        </style>
      </head>
      <body>
        <div id="root">${component}</div>

        <script src="/static/vendors~home.js~multipleRoutes.js"></script>
        <script src="/static/vendors~multipleRoutes.js"></script>
        <script src="/static/multipleRoutes.js"></script>
      </body>
      </html>`;

  if (context.url) {
    res.writeHead(301, { Location: context.url });
    res.end();
  } else {
    res.send(html);
  }
});

app.get('/tutorial.json', (req, res) => {
  fs.readFile(path.join(__dirname, '../README.md'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);

      return;
    } else {
      res.json({ data });
    }
  });
});

app.get('*', (req, res) => {
  res.status(404).send(`
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; font-size: 15px; }
          h1 { color: #c7c7c7; text-align: center; }
        </style>
      </head>

      <body>
        <h1>404 - Not Found</h1>
      </body>
    </html>`);
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => console.log('######## app running ########'));
