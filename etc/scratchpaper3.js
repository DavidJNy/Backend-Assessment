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
  })).then(everyThing => {
    
    // clean up. remove replicates
  // sort and direction here after getting all the API request
  })
  .then(results => { res.send(results).status(200); })
  

  // clean up. remove replicates
  // sort and direction here after getting all the API request
  
  }
)

app.listen(5000)

//Notes

// let userToken = AuthUser(data)
// console.log(userToken) // Promise { <pending> }



// userToken.then(function (result) {
//   console.log(result) // "Some User token"
// })



// let getJson1 = await getStuff('tech').then(data => {return data}) 


//THIS WORKS DON"T TOUCH IT!!!!!!!!!!!!!!!!
  // async function getStuff (e) {
  //   // console.log(url + '?tag=' + e)
  //   let results = await fetch(url + '?tag=' + e)
  //     .then(data => {
  //       // console.log(data);
  //       return data.json()
  //     })
  //     .then(poo => { return poo.posts } )
  //     .catch((err) => {
  //       console.log(err.message);
  //     })
  //     // console.log(results)
  //   return results;
  //   // array
  // }
  // //THIS WORKS DON"T TOUCH IT!!!!!!!!!!!!!!!! 


  // THIS WORKS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // var getJson1 = await fetch(testURL)
  //   .then(data => data.json())
  //   .then(poo => { return poo; })
  //   .catch((err) => {
  //     console.log(err.message);
  //   })
  // THIS WORKS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
