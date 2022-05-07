const express = require('express');
const app = express();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

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


const verify = async function  (req, res, next) {
    var {tags, sortBy, direction } = req.query;
    console.log(req.query.tags);
    console.log(req.query);
    if (tags === undefined) {
      next();
    }
    else {
      
      next();
    }
}

app.get("/api/ping", (req, res) => {
  res.status(200).send(success);
  res.end;
})

app.get("/api/posts", verify , async (req, res) => {

  
  var getJson = await fetch(url)
    .then(data => data.json())
    .then(poo => {return poo;})
    .catch((err) => {
      console.log(err.message);
    })
  
  
    // sort and direction here after getting all the API request
  res.send(getJson);
  res.status(200);
  res.end();
  }
)


app.listen(3000)

