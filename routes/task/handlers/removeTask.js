function removeTask (req, res) {
  const id = req.params.id
  req.session.tasks = req.session.tasks.filter(task => task.ID !== id)
  res.status(200).send('ok delete')
}

module.exports = removeTask
