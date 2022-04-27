const express = require('express');
const app = express();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
// import { fetch } from 'node-fetch';

const success = { success: true }
const needTag = { error: "Tags parameter is required" }
const needSort = { error: "sortBy parameter is invalid" }
const needDirection = { error: "direction parameter is invalid" }

let mainURL = new URL('https://api.hatchways.io/assessment/blog/posts')
let secURL = 'https://api.hatchways.io/assessment/blog/posts'

const verify = function (req, res, next) {
    const { tag, sortBy, direction } = req.query
    if (tag === undefined) {
        next();
    }
    else {
        console.log(tag)
        const finalData = getData(mainURL)
        // res.send(finalData)
        // mainURL.searchParams.append("tag", tag)
        // console.log(mainURL)
        // searchResult = getData(mainURL)
        // res.send(searchResult)
        next()
    }
}

app.get("/api/ping", (req, res) => {
    res.status(200).send(success)
    res.end
})

app.get("/api/posts", verify, (req, res) => {

    function getData(url) {
        fetch(url)
        .then(data => {
            return data.json();
        })
        .then(poo => {
            console.log(poo);
            return poo;
        })
        .catch((err) => console.log(err));
    };

    const searchResult = getData('https://api.hatchways.io/assessment/blog/posts');
    console.log(searchResult);
    res.send(searchResult);
    res.status(200);
    res.end();
}
)


app.listen(3000)

// async function getData(url) {
//     const weather = await fetch(url);
//     let searchResult = await weather.json();
//     console.log(searchResult);
// }
// getData(mainURL);