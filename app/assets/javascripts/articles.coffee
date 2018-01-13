$ ->
  $(document).on "change", ".pages-show select#article", (e) ->
    return unless e.target.value
    location.href = "#article"
    location.href = e.target.value
