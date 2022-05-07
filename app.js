const express = require('express');
const app = express();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

let url = 'https://api.hatchways.io/assessment/blog/posts';
let testURL = 'https://api.hatchways.io/assessment/blog/posts?tag=tech'

const sortByOptions = ['', 'id', 'reads', 'likes', 'popularity'];
const direct = ['', 'desc', 'asc'];

function veri (req, res, next) {
  var {tags, sortBy, direction } = req.query;
  if (tags === undefined ) {
    res.status(400).json({ error: "Tags parameter is required" })
    return
  } else if (sortBy !== undefined && sortByOptions.includes(sortBy) === false) {
    res.status(400).json({ error: "sortBy parameter is invalid" })
    return
  } else if (direction !== undefined && direct.includes(direction) === false) {
    res.status(400).send({ error: "direction parameter is invalid" })
    return
  }
  next()
}

app.get("/api/ping", (req, res) => {
  res.status(200).json({ success: "true"});
})

app.get("/api/posts", veri , async (req, res) => {
  const listOfTags = req.query.tags
  const arrayOfTags = listOfTags.split(",")
  
  var getJson = await fetch(testURL)
    .then(data => data.json())
    .then(poo => { return poo; })
    .catch((err) => {
      console.log(err.message);
    })

  console.log(getJson)


  // var getAllResults = arrayOfTags.map(async tag => {
  //   const resp = await fetch(url + "?tag=" + tag);
  //   const data = await resp.json(); //assuming data is json
  //   // console.log(data.posts)
  //   return data.posts
  // })

  // console.log(get_request("tech") + "console outside fxn")

  // clean up. remove replicates
  // sort and direction here after getting all the API request
  
  res.send(getJson).status(200);
  }
)

app.listen(5000)