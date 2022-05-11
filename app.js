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
<<<<<<< HEAD

  Promise.all(arrayOfTags.map( e => {
    var allResults = fetchStuff(e)
    return allResults
  })).then(everyThing => {
    let listOfObjects = []
    for (const bigPoo of everyThing) {
      for (const smallPoo of bigPoo) {
        listOfObjects.push(smallPoo)
      }
    }
    // clean up. remove replicates
    
    // obj.arr = obj.arr.filter((value, index, self) =>
    //   index === self.findIndex((t) => (
    //     t.place === value.place && t.name === value.name
    //   ))
    // )

    // sort and direction here after getting all the API request

    
    return listOfObjects
  })
  .then(results => { res.send(results).status(200); })
  .catch((err) => {
    console.log(err.message);
  })
})
=======
  

  // var getJson = await fetch(url + "?tag=" + "tech")
  //   .then(data => data.json())
  //   .then(poo => { return poo.posts; })
  //   .catch((err) => {
  //     console.log(err.message);
  //   })

  // console.log(getJson)
  
  console.log(arrayOfTags)

  var getAllResults = (arrayOfTags.map(async tag => {
    const lastPost = await fetch(url + "?tag=" + tag)
      .then(data => data.json())
      .then(poo => { return poo.posts })
      .catch((err) => {
        console.log(err.message);
      })
    return lastPost
  }))


  // console.log(get_request("tech") + "console outside fxn")

  // clean up. remove replicates
  // sort and direction here after getting all the API request
  
  res.json(getAllResults).status(200);
  }
)
>>>>>>> 93f5606e9494c492cae7588c44eaaded321a211c

app.listen(5000)