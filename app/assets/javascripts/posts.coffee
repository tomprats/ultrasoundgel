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

  $(document).on "click", ".posts-show .fa-facebook-square", ->
    url = "http://www.facebook.com/sharer?u=#{encodeURIComponent location.href}"
    window.open(url, "Traitify Sharer", "width=400, height=400")

  $(document).on "click", ".posts-show .fa-twitter-square", ->
    url = "http://twitter.com/share?hashtags=FOAMus&url=#{encodeURIComponent location.href}"
    window.open(url, "Traitify Sharer", "width=400, height=400")

  $(document).on "click", "#share-modal .btn-primary", ->
    shareLink = document.querySelector("#share-link")
    shareLink.select()

    try
      error = !document.execCommand("copy")
    catch
      error = true

    if error
      klass = "danger"
      text = "There was a problem copying the link. Try copying it manually"
    else
      klass = "success"
      text = "Link Copied"

    $("#share-modal .modal-body").prepend("<p class=\"text-center text-#{klass}\">#{text}</p>")
