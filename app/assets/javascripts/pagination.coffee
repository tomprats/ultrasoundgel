$ ->
  $(".paginate-panel-table").each ->
    $(this).append("""
<div class="panel-body text-center">
  <div class="btn-group">
    <button class="btn btn-themed disabled pagination-first" type="button">
      <i class="fa fa-angle-double-left" />
    </button>
    <button class="btn btn-themed disabled pagination-back" type="button">
      <i class="fa fa-angle-left" />
    </button>
    <button class="btn btn-themed pagination-toggle" type="button">All</button>
    <button class="btn btn-themed disabled pagination-next" type="button">
      <i class="fa fa-angle-right" />
    </button>
    <button class="btn btn-themed disabled pagination-last" type="button">
      <i class="fa fa-angle-double-right" />
    </button>
  </div>
</div>""")

    $base = $(this)
    $elements = $base.find("tbody tr")
    limit = 10
    total = $elements.length
    totalPages = Math.ceil(total / limit)
    $base.find(".pagination-first").data({page: 1})
    $base.find(".pagination-last").data({page: totalPages})
    $base.find(".pagination-toggle").data({page: "off"})

    $elements.each (index) ->
      page = Math.ceil((index + 1) / limit)
      $(this).data({page: page})

    pageTo = (currentPage) ->
      if currentPage == "off"
        $elements.removeClass("hidden")
        $base.find(".pagination-first, .pagination-back, .pagination-next, .pagination-last").addClass("disabled")
        $base.find(".pagination-toggle").data({page: "reset"}).text("Paginate")

        return
      else if currentPage == "reset"
        $base.find(".pagination-toggle").data({page: "off"}).text("All")
        currentPage = 1

      $elements.addClass("hidden")
      $elements.filter(-> $(this).data("page") == currentPage).removeClass("hidden")

      if currentPage - 1 >= 1
        $base.find(".pagination-back").data({page: currentPage - 1})
        $base.find(".pagination-back").removeClass("disabled")
        $base.find(".pagination-first").removeClass("disabled")
      else
        $base.find(".pagination-back").addClass("disabled")
        $base.find(".pagination-first").addClass("disabled")

      if currentPage + 1 <= totalPages
        $base.find(".pagination-next").data({page: currentPage + 1})
        $base.find(".pagination-next").removeClass("disabled")
        $base.find(".pagination-last").removeClass("disabled")
      else
        $base.find(".pagination-next").addClass("disabled")
        $base.find(".pagination-last").addClass("disabled")

    $base.on "click", ".btn", (e) ->
      $btn = $(this)
      return if $btn.hasClass("disabled")

      pageTo($btn.data("page"))

    pageTo(1)
