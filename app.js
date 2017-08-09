const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const strftime = require('strftime')
const app = express()

app.set('view engine', 'pug')
app.locals.pretty = true

app.use ( express.static ( path.join(__dirname, 'public')) )

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



let tasks = []
let completed = []

// --------------- views routes ----------- 
app.get('/', (req, res) => {
  res.render('pages/index', { tasks })
})

app.get('/completed/', (req, res) => {
  res.render('pages/completed', { completed })
})

// -------------- route calls -------------
app.post('/tasks', (req, res) => {
  const taskName = req.body.task
  const date = strftime('%B %d, %Y %H:%M', new Date())
  const createId = () => '_' + Math.random().toString(36).substr(2, 9)
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.

  const newTask = {name: `${taskName}`, time: `(Created at: ${date})`, ID: createId()}

  tasks.push(newTask)
  res.redirect('/')
})

app.delete('/task/:id', (req, res) => {

  const id = req.params.id

  tasks = tasks.filter( task => task.ID !== id)

  res.status(200).send('ok delete')
})

app.put('/task/:id', (req, res) => {

  const id = req.params.id

  for (let i = 0; i < tasks.length; i++) {
    if(tasks[i].ID === id){
      completed.push(tasks[i])
      tasks.splice(i,1)
    }
  }

  res.status(200).send('ok done')
})

app.put('/tasks/:ids', (req, res) => {
  
  const idsArray = req.params.ids.split(',')

  for (let i = 0; i < idsArray.length; i++) {
    for(let j = 0; j< tasks.length; j++) {
        if(idsArray[i] === tasks[j].ID){
         completed.push(tasks[j])
         tasks.splice(j, 1)
       }
    }
  }

  res.status(200).send('ok checkboxes done')
})

app.put('/edit/', (req, res) => {
  const newName = req.body.name
  const editedID = req.body.ID
  console.log(editedID)
  console.log(newName)
  for (let i = 0; i < tasks.length; i++) {
    if(tasks[i].ID === editedID){
      tasks[i].name = newName
    }
  }
  res.status(200).send('ok edits done')
})

app.listen(3001)

