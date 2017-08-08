console.log('Javascript ready to go...')

$('.remove').on('click', function (e) {
  e.preventDefault()
  let taskID = $(this).val()

  $.ajax({
    url: '/task/' + taskID,
    method: 'DELETE'
  })
  .then( data => {
    $(this).parent().remove()
  })

})

$('.done').on('click', function (e) {
  e.preventDefault()
  let taskID = $(this).val()

  $.ajax({
    url: '/task/' + taskID,
    method: 'PUT'
  })
  .then( data => {
    $(this).parent().remove()
  })

})

$('button.removeAll').on('click', function (e) { 
  e.preventDefault()
  var idsArray = $('.checkbox:checked').map(function() {
    return $(this).val()
  }).get()

  var ids = idsArray.join(',')

  $.ajax({
    url: '/tasks/'+ ids,
    method: 'PUT'
  })
  .then( data => {
    window.location.reload()
  })
})

$('p.title').on('click', function(){
  console.log('jjjjj')
  
});




