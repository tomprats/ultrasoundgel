$ ->
  $(document).on "click", ".open-comment-modal", (e) ->
    id = $(this).closest("form").find("#comment_post_id").val()
    $modal = $("#comment-modal")
    $modal.data("post-id", id)
    $modal.modal("show")

  $(document).on "click", ".save-comment", (e) ->
    e.preventDefault()
    id = $("#comment-modal").data("post-id")
    recaptcha = grecaptcha.getResponse()
    $form = $("#post-#{id}-comments-new form")
    $form.find("#recaptcha").val(recaptcha)
    $form.submit()
    false
