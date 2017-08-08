const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const strftime = require('strftime')
const app = express()

app.set('view engine', 'pug')
app.locals.pretty = true;

app.use( express.static ( path.join(__dirname,'public')) )

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

let tasks = []
let completed = []

app.get('/', (req,res) => {
  res.render('pages/index', { tasks })
})

app.post('/tasks', (req,res) => {
  const taskName = req.body.task
  const date = strftime('%F %T', new Date())

  const newTask = `${taskName} \n (Created at: ${date})`

  tasks.push(newTask)
  res.redirect('/')
})

app.delete('/tasks/:position', (req, res) => {
  tasks.splice(req.params.position, 1)
  res.status(200).send('ok delete')
})

app.delete('/done/:position', (req, res) => {
  completed.push(tasks[req.params.position])
  tasks.splice(req.params.position, 1)
  res.status(200).send('ok done')
})

app.delete('/deleteAll/', (req, res) => {
  tasks.forEach((task) => {
    completed.push(task)
  })
  tasks.splice(0, tasks.length)
  res.status(200).send('ok makeAll done')
})

app.get('/completed/', (req, res) => {
  res.render('pages/completed', {completed})
})

app.listen(3001)
