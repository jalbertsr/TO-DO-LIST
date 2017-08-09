const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const fileStore = require('session-file-store')(session)
const strftime = require('strftime')

const routesTasks = require('./routes/tasks/')
const routesTask = require('./routes/task/')

const app = express()
const PORT = 3001

app.use ( express.static ( path.join(__dirname, 'public')) )

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: '.',
  store: new fileStore()
}))

app.use(function(req, res, next){
	req.session.tasks = req.session.tasks || []
	req.session.completed = req.session.completed || []
	next()
})

app.set('view engine', 'pug')
app.locals.pretty = true

app.use(routesTasks)
app.use(routesTask)

app.listen(PORT)
console.log(`Listening on PORT ${PORT}`)
