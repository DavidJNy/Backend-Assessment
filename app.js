const express = require('express');
const app = express();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const success = {
  "success": true
}


console.log(module)




// const response = 

// fetch('https://api.hatchways.io/assessment/blog/posts', {
//   method: 'GET',
// })
//   .then(data => data.text(), console.log(data))
//   .then((text) => {
//     console.log('request succeeded with JSON response', text)
//   }).catch(function (error) {
//     console.log('request failed', error)
//   });


app.get("/api/ping", (req, res) => {
    console.log(req.body)
    res.status(200).send("Response status code: 200")
})


app.listen(3000)

