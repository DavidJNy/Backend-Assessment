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
        next();
    }
}

app.get("/api/ping", (req, res) => {
    res.status(200).send(success)
    res.end
})

app.get("/api/posts", verify, (req, res) => {


    res.status(200);
    res.end();
}
)


app.listen(3000)

