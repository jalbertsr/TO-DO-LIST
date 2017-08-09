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

$('p.title').on('keypress', function(e){
  if (e.keyCode === 13 ) changeTaskName(e)
  else{
    $('p.title').blur(function(e){
      e.preventDefault()
      const text = $(this).text()
      const id = $(this).siblings('button').val()
      const data = {name:text, ID:id}

      $.ajax({
        url: '/edit/',
        method: 'PUT',
        data
      }).then( data => {}) 
    })
  }  
})


function changeTaskName(e){

  e.preventDefault()
      const text = $(this).text()
      const id = $(this).siblings('button').val()
      const data = {name:text, ID:id}

      $.ajax({
        url: '/edit/',
        method: 'PUT',
        data
      }).then( data => {}) 

}


