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