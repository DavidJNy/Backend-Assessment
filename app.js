const express = require('express');
const path = require('path');
const app = express();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const url = new URL('https://api.hatchways.io/assessment/blog/posts')

const params = new URLSearchParams(url.searchParams);
params.append('tag', 'tech');
console.log(params)


console.log( url)

fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
    })
  .then(data => data.text())
  .then((text) => {
    console.log('request succeeded with JSON response', text)
  }).catch(function (error) {
    console.log('request failed', error)
  });


app.get("/api/ping", (req, res) => {
    // res.json
    res.status(200).send("hi")
})



app.listen(3000)