const express = require('express');
const app = express();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const reqTag = {error: "Tags parameter is required"}
const success = {success : true};
const needSort = {error: "sortBy parameter is invalid"};
const needDirection = {error: "direction parameter is invalid"};

let url = 'https://api.hatchways.io/assessment/blog/posts';

// Here is what you will need to do to complete this task:
// ● For every tag specified in the tags parameter, fetch the posts with that tag using
// the Hatchways API(make a separate API request for every tag specified)
// ● Combine all the results from the API requests above and remove all the repeated
// posts(try to be efficient when doing this)
// ● You will get a better score on our assessment if you can make concurrent
// requests to the API(making the requests in parallel)(we understand that this job
// is easier in some languages vs.others)

const sortByOptions = ['', 'id', 'reads', 'likes', 'popularity'];
const direct = ['', 'desc', 'asc'];

function veri (req, res, next) {
  var {tags, sortBy, direction } = req.query;
  // console.log(req.query);
  if (tags === undefined ) {
    next();
    return
  }
  // if (sortBy !== undefined && sortByOptions.includes(sortBy) === false) {
  //   next()
  // } else { 
  //   res.status(400).send(needSort)
  //   res.end()
  // }
  // if (direction !== undefined && direct.includes(direction) === false) {
  //   next()
  // } else {
  //   res.status(400).send(needDirection)
  //   res.end()
  // }
  // console.log("there are tags here and optional sort and direction")
  next()
}


app.get("/api/ping", (req, res) => {
  res.status(200).send(success);
  res.end;
})

app.get("/api/posts", veri , async (req, res) => {

  const listOfTags = req.query.tags
  const arrayOfTags = listOfTags.split(",")

  //map arry and fetch each one
  //put it all on one const
  //clean up. remove replicates

  
  const getJson =  arrayOfTags.map(tag => {
    console.log(url + "?tag=" + tag)
    fetch(url + "?tags=" + tag)
      .then(data => data.json())
      .then(poo => {return poo;})
      .catch((err) => {
        console.log(err.message);
      })
    
  }) 
  
  const testVar = fetch(url + "?tags=" + "tech")
    .then(data => data.json())
    .then(poo => { return poo; })
    .catch((err) => {
      console.log(err.message);
    })
  
    // sort and direction here after getting all the API request
  res.send(testVar);
  res.status(200);
  res.end();
  }
)


app.listen(5000)

