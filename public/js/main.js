console.log('Javascript ready to go...')

$('.remove').on('click', function (e) {
  let $input = $(this).siblings('input')
  let tasksPosition = $input.val()

  $.ajax({
    url: '/tasks/' + tasksPosition,
    method: 'DELETE'
  })
  .then( data => {
    console.log(data)
    window.location.reload()
  })

})

$('.done').on('click', function (e) {
  let $input = $(this).siblings('input')
  let tasksPosition = $input.val()

  $.ajax({
    url: '/done/' + tasksPosition,
    method: 'DELETE'
  })
  .then( data => {
    console.log(data)
    window.location.reload()
  })

})

$('button.removeAll').on('click', function (e) {
  e.preventDefault()
  $.ajax({
    url: '/deleteAll/',
    method: 'DELETE'
  })
  .then( data => {
    console.log(data)
    window.location.reload()
  })
})
