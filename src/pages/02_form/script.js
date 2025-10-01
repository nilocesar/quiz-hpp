$(document).ready(function () {
  var game = localStorage.getItem("game");

  function getRandomNumber() {
    return Math.floor(Math.random() * (99 - 10 + 1)) + 10;
  }

  $(".cadastro").on("click", function () {
    var name = $("#name").val();
    var email = $("#email").val();

    $(".alertName").css("display", "none");
    $(".alertMail").css("display", "none");

    if (name.length == 0) {
      $(".alertName").css("display", "block");
      return false;
    }
    if (email.length == 0 || !validateEmail(email)) {
      $(".alertEmail").css("display", "block");
      return false;
    }

    var data = {
      name: name,
      email: email,
      uid: Date.now(),
    };

    //localstorage
    $("body").trigger("setOrUpdateObject", ["user", data]);

    setTimeout(() => {
      navigate.next();
    }, 1000 * 0.12);
  });

  function validateEmail(email) {
    // Advanced regex for email validation
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
});
