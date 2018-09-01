$ ->
  # To polyfill datetime-local for Safari
  $.webshims.polyfill("forms forms-ext")

  $(document).on "show.bs.modal", (e) ->
    $modal = $(this)
    $invoker = $(e.relatedTarget)
    action = $invoker.data("action")
    $modal.find("form").attr("action", action)
    $modal.find(".btn.btn-danger").attr("href", action)
