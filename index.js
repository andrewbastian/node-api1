// implement your API here
const express = require('express'); // built in node.js module to handle http traffic
let db = require('./data/db.js')
const server = express(); // the local computer where the server is running
server.use(express.json())


server.get("/", (req, res) => {
	// log the user's ip address
	console.log("ip:", req.ip)
	// res.send(`<html><body><h1>The current time is ${Date.now()}</h1></body></html>`)
	res.json({ message: "Welcome to our API" })
})

//get all Users

server.get('/api/users', (req, res) => {

    db.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        res.status(500).json({ errorMessage: "The users information could not be retrieved."})
    })
})

//get user by ID

server.get('/api/users/:id', (req, res) =>{
  db.findById(req.params.id)
      .then(user => {
          if (user) {
              res.status(200).json(user)
          } else {
              res.status(404).json({ message: "The User with the specified ID doesn't exist." })
          }
      })
      .catch(error => {
          console.log('GET not working', error)
          res.status(500).json({ errorMessage: "The User information couldn't be retrieved." })
      })
})

// create a new user
server.post('/api/users', (req,res) =>{
  if(!req.body.name){
    return res.status(400).json({error:"Please provide name and bio for the user."})
  }
  const newUser ={
    id: String(db.length + 1),
    name: req.body.name,
    bio: req.body.bio
  }
  db.insert(newUser)
  res.status(201).json(newUser)
})




const port = 8080
const host = "127.0.0.1" // another way to say "localhost"

server.listen(port, host, () => {
	console.log(`Server running at http://${host}:${port}`)
})
