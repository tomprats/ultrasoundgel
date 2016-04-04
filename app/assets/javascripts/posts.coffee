$ ->
  $(document).on "click", ".toggle-comments", (e) ->
    e.preventDefault()
    $this = $(this)
    text = $this.text()
    options = ["view", "hide"]
    [current, future] = if text.indexOf("view") >= 0 then options else options.reverse()
    $this.text(text.replace(current, future))
    $("#post-#{$this.data("post-id")}-comments").toggleClass("hidden")
    false

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
