$ ->
  $("#published_at").inputmask("mm/dd/yyyy hh:mm xm")
  $(document).on "show.bs.modal", (e) ->
    $modal = $(this)
    $invoker = $(e.relatedTarget)
    $modal.find("form").attr("action", $invoker.data("action"))
