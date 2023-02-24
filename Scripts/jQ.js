let news = false;

$(document).ready(function () {
  $(".news").click(function () {
    news = !news;
    if (news) {
      $(".left").css("width", "100%");
      $(".left").css("justify-content", "center");
      $(".left").css("align-items", "center");

      $(".news").css("width", "40%");
      $(".news").css("margin", "0");

      $(".right").hide();
      $(".about").hide();
    } else {
      $(".left").css("width", "32%");

      $(".news").css("width", "auto");

      $(".right").show();
      $(".about").show();
    }
  });

  $(".missions").click(function () {
    news = !news;
    if (news) {
      $(".right").css("width", "100%");
      $(".right").css("justify-content", "center");
      $(".right").css("align-items", "center");

      $(".missions").css("width", "40%");
      $(".missions").css("margin", "0");

      $(".left").hide();
      $(".topics").hide();
    } else {
      $(".right").css("width", "32%");

      $(".missions").css("width", "auto");

      $(".left").show();
      $(".topics").show();
    }
  });

  $(".btn-accept").click(function () {
    $("#modalSheet").fadeOut(200);
    $(".htmlbodywrapper").fadeIn(700);
    init();
    animate();
  });
});
