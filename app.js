const express = require('express');
const app = express();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

let url = 'https://api.hatchways.io/assessment/blog/posts';
let testURL = 'https://api.hatchways.io/assessment/blog/posts?tag=tech'

const sortByOptions = ['', 'id', 'reads', 'likes', 'popularity'];
const direct = ['', 'desc', 'asc'];

async function fetchStuff(e) {
    let results = await fetch(url + '?tag=' + e)
      .then(data => {
        return data.json()
      })
      .then(poo => { return poo.posts } )
      .catch((err) => {
        console.log(err.message);
      })
    return results;
}

function verifyTag (req, res, next) {
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

app.get("/api/posts", verifyTag, async (req, res) => {
  const listOfTags = req.query.tags
  const arrayOfTags = listOfTags.split(",")

  Promise.all(arrayOfTags.map( e => {
    var allResults = fetchStuff(e)
    return allResults
  }))
  .then(everyThing => {
    let listOfObjects = []
    for (const bigPoo of everyThing) {
      for (const smallPoo of bigPoo) {
        listOfObjects.push(smallPoo)
      }
    }
    const cleanObjects = Array.from(new Set(listOfObjects.map(a => a.id)))
      .map(id => {
        return listOfObjects.find(a => a.id === id)
      })
      return cleanObjects    
  })
  .then(preSortObj => {
    let finalProduct
    var { sortBy, direction } = req.query;

    finalProduct = preSortObj.sort((a,b) => {
      return a.id - b.id
    })

    if ( sortBy !== undefined) {

      finalProduct = preSortObj.sort((a, b) => {

        return a[sortBy] - b[sortBy]
      })
    }

    if ( direction == 'desc') {
      Array.prototype.reverse.call(finalProduct)
    }

    return finalProduct
  })
  .then(results => { res.send(results).status(200); })
  .catch((err) => {
    console.log(err.message);
  })
})

app.listen(5000)