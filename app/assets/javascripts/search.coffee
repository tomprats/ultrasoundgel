$ ->
  $("#search-modal").on "shown.bs.modal", ->
    $(this).find("#search").focus()
