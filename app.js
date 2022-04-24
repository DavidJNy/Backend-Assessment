const express = require('express');
const app = express();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const success = {success : true}
const needTag = {error : "Tags parameter is required"}
const needSort = {error: "sortBy parameter is invalid"}
const needDirection = {error: "direction parameter is invalid"}

const mainURL = new URL ('https://api.hatchways.io/assessment/blog/posts');

let searchResult = []

function getData (url) { fetch(url, {
  method: 'GET',
  })
  .then(data =>data.json())
  .then((text) => {
    searchResult = text
  }).catch(function (error) {
    console.log('request failed', error)
  });
}

const logger = (req, res, next) => {
  getData(mainURL.href)
  next()
}


app.get("/", (req, res) => {
  console.log(req.body)
  res.status(200).send("Response status code: 200")
  res.end
})

app.get("/api/ping", (req, res) => {
  res.status(200).send(success)
  res.end
})

app.get("/api/posts", logger, (req, res) => {
  const {tag, sortBy, direction } = req.query
  mainURL.searchParams.append("tag", tag)
  console.log(mainURL)
  res.send(searchResult)
  res.end()
})


app.listen(3000)

