// implement your API here
const express = require('express'); // built in node.js module to handle http traffic
let db = require('./data/db.js')
const server = express(); // the local computer where the server is running

server.get("/", (req, res) => {
	// log the user's ip address
	console.log("ip:", req.ip)

	// res.send(`<html><body><h1>The current time is ${Date.now()}</h1></body></html>`)
	res.json({ message: "Welcome to our API" })
})

const port = 8080
const host = "127.0.0.1" // another way to say "localhost"

server.listen(port, host, () => {
	console.log(`Server running at http://${host}:${port}`)
})
