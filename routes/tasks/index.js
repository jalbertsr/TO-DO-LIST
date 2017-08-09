const express = require('express')
const router = express.Router()

//no deberia ser necesario requerirlo aqui
const strftime = require('strftime')

let tasks = global.tasks
let completed = global.completed

router.get('/', (req, res) => {
  res.render('pages/index', { tasks: req.session.tasks })
})

router.get('/completed/', (req, res) => {
  res.render('pages/completed', { completed: req.session.completed })
})

router.post('/tasks/', (req, res) => {
  const taskName = req.body.task
  const date = strftime('%B %d, %Y %H:%M', new Date())
  const createId = () => '_' + Math.random().toString(36).substr(2, 9)
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.

  const newTask = {name: `${taskName}`, time: `(Created at: ${date})`, ID: createId()}

  req.session.tasks.push(newTask)
  res.redirect('/')
})

router.put('/tasks/:ids', (req, res) => {
  const idsArray = req.params.ids.split(',')

  for (let i = 0; i < idsArray.length; i++) {
    for(let j = 0; j< req.session.tasks.length; j++) {
        if(idsArray[i] === req.session.tasks[j].ID){
         req.session.completed.push(req.session.tasks[j])
         req.session.tasks.splice(j, 1)
       }
    }
  }

  res.status(200).send('ok checkboxes done')
})

router.put('/edit/', (req, res) => {
  const newName = req.body.name
  const editedID = req.body.ID

  for (let i = 0; i < req.session.tasks.length; i++) {
    if(req.session.tasks[i].ID === editedID){
      req.session.tasks[i].name = newName
    }
  }
  res.status(200).send('ok edits done')
})

module.exports = router
