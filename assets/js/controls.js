(function($, window, document, undefined) {
  // Burger menu Toggle Script
  $("#toggle").click(function(e) {
    e.preventDefault();
    $(".wrapper").toggleClass("toggled");
  });

  // Make table row to link
  $(".table-hover").dblclick(function(e) {
    if ($(e.target).is("a,input")) return;
    location.href = $(this).find("a").attr("href");
  });

  // Collapse accordion in Bootstrap 3 without id's
  $('[data-toggle=next]').click(function(e) {
    $(this).toggleClass('collapsed');
    $(this).next().collapse('toggle');
  });

}(jQuery, window, document));
