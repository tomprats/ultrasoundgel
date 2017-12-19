twitterLoaded = false

$ ->
  if twitterLoaded
    loadWidgets()
  else
    loadTwitter ->
      twitterLoaded = true
      loadWidgets()

loadTwitter = (callback) ->
  $.getScript("//platform.twitter.com/widgets.js", callback)

loadWidgets = ->
  $(".twitter-container").each ->
    $container = $(this)
    $container.empty()
    $div = $("<div>").appendTo($container)
    options = $container.data()
    twttr.widgets.createTimeline options.id, $div[0], options
