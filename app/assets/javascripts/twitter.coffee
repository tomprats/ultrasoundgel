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
    twttr.widgets.createTimeline $container.data(), $div[0], {dnt: true, height: 600}
