const express = require('express')
const generate = require('shortid').generate

const app = express()
app.use(express.json())

const PORT = 5000

let users = [
   { 
      id: generate(), 
      name: 'Trevor Armes', 
      bio: 'Indiana raised, worldwide livin' 
   }
]

// [GET]/ALL USERS REQUEST
app.get('/api/users', (req, res) => {
   res.status(200).json(users)
})

// [GET]:ID USER REQUEST
app.get('/api/users/:id', (req, res) => {
   const { id } = req.params
   const user = users.find(user => id === user.id)
   if (!user) {
      res.status(404).json( { message: `No user with id ${id}`} )
   } else {
      res.status(200).json(user)
   }
})

// [POST] NEW USER REQUEST
app.post('/api/users', (req, res) => {
   const { name, bio } = req.body
   if (!name || !bio) {
      res.status(400).json({ message: 'Name and bio are required!' })
   } else {
      const newUser = {
         id: generate(),
         name,
         bio
      }
      users.push(newUser)
      res.status(201).json(newUser)
   }
})

// [PUT] EDIT USER REQUEST
app.put('/api/users/:id', (req, res) => {
   const { id } = req.params
   const { name, bio } = req.body
   const indexOfUser = users.findIndex(user => id === user.id)
   if (!name || !bio) {
      res.status(400).json({ message: 'Name and bio are required!'})
   } else if (indexOfUser === -1) {
         res.status(404).json({ message: `No user with id ${id} found!`})
      } else {
         users[indexOfUser] = { id, name, bio }
         res.status(200).json({ id, name, bio })
      }
})

app.all('*', (req, res) => {
   res.status(404).json({ message: 'Not found!'})
})

app.listen(PORT, () => {
   console.log(`LISTENING ON PORT ${PORT}`)
})