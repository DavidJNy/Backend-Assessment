const express = require('express');
const app = express();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const success = {success : true}
const needSort = {error: "sortBy parameter is invalid"}
const needDirection = {error: "direction parameter is invalid"}

let mainURL = new URL ('https://api.hatchways.io/assessment/blog/posts')

const verify = async function  (req, res, next) {
    const {tag, sortBy, direction } = req.query
    if (tag === undefined) {
      next();
    }
    else {
      next();
    } 
}

app.get("/api/ping", (req, res) => {
  res.status(200).send(success)
  res.end
})

app.get("/api/posts", verify , async (req, res) => {
  const getJson = await fetch(mainURL)
    .then(data => data.json())
    .then(poo => {return poo})
    .catch((err) => {
      console.log(err.message);
    })
  res.send(getJson)
  res.status(200);
  res.end();
  }
)


app.listen(3000)

