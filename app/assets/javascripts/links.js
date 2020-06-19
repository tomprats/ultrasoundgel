$(document).ready(function() {
  document.querySelectorAll("a").forEach(function(a) {
    if(a.host !== window.location.host) {
      a.setAttribute("target", "_blank");
    }
  });
});
