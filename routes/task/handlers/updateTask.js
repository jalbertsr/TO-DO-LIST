function updateTask (req, res) {
    const id = req.params.id
    for (let i = 0; i < req.session.tasks.length; i++) {
        if (req.session.tasks[i].ID === id) {
            req.session.completed.push(req.session.tasks[i])
            req.session.tasks.splice(i, 1)
        }
    }
    res.status(200).send('ok done')
}

module.exports = updateTask
