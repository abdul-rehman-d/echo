import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";

const routes = [
  '/api/echo',
  '/docs',
]

const custom404 = (req, res, next) => {
  if (!routes.includes(req.url)) {
    res.status(404).sendFile('custom404.html', { root: './public' })
  } else {
    next()
  }
}

function main() {
  const app = express()
  const port = process.env.PORT || 5000

  // middlewares
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.raw());
  app.use(custom404)

  // routes
  app.get('/docs', (req, res) => {
    res
      .status(200)
      .sendFile('docs.html', { root: './public' })
  })
  app.post('/api/echo', (req, res) => {
    const reqBody = req.body
    res
      .status(200)  
      .json(reqBody)
    res.end()
  })
  
  // start server
  app.listen(port, () => {
    console.log(`Server up on ${port}`)
  })
}

main();
