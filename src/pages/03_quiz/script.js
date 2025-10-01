$(document).ready(function () {
  let timer = null;
  let elapsedTime = 0;
  let running = false;
  let startTime;
  let timeSegundos = 0;

  let questionsObj = {
    timer: 0,
    acertos: 0,
    correta1: 0,
    resposta1: 0,
    correta2: 0,
    resposta2: 0,
    correta3: 0,
    resposta3: 0,
    correta4: 0,
    resposta4: 0,
    correta5: 0,
    resposta5: 0,
  };

  function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    let minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    let seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  function start() {
    if (!running) {
      running = true;
      startTime = Date.now() - elapsedTime;
      timer = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timeSegundos += 1;
        $("#cronometro").text(formatTime(elapsedTime));
      }, 1000);
    }
  }

  function pause() {
    if (running) {
      clearInterval(timer);
      running = false;
    }
  }

  function reset() {
    clearInterval(timer);
    running = false;
    elapsedTime = 0;
    $("#cronometro").text("00:00:00");
  }

  setTimeout(() => {
    start();
  }, 1000 * 4);

  $(".question").addClass("hide");
  $("[question=1]").removeClass("hide");
  var total = $(".question").length;

  $(".question").each(function () {
    var question = $(this);
    question.find(".btnInit").addClass("hide");

    question.find(".it").each(function () {
      var it = $(this);
      var itIndice = parseInt(it.attr("it"));
      var resIndice = parseInt(it.attr("res"));

      if (resIndice == 1) {
        question.attr("correta", itIndice);
      }
    });

    question.find(".it").on("click", function () {
      var it = $(this);
      var itIndice = parseInt(it.attr("it"));
      question.find(".btnInit").removeClass("hide");
      question.find(".it").removeClass("active");
      it.addClass("active");

      question.attr("res", itIndice);
    });

    question.find(".btnInit").on("click", function () {
      questionsObj["correta" + question.attr("question")] = parseInt(
        question.attr("correta")
      );
      questionsObj["resposta" + question.attr("question")] = parseInt(
        question.attr("res")
      );

      var qNext = parseInt(question.attr("question")) + 1;

      if (qNext < total + 1) {
        $(".question").addClass("hide");
        $(`[question=${qNext}]`).removeClass("hide");
      } else {
        questionsObj.timer = timeSegundos;

        var acertos = 0;
        for (var i = 1; i <= total; i++) {
          var correto = questionsObj["correta" + i];
          var res = questionsObj["resposta" + i];
          if (correto == res) {
            acertos += 1;
          }
        }
        questionsObj.acertos = acertos;

        console.log(questionsObj);
        pause();

        $("body").trigger("quiz", [questionsObj]);
      }
    });
  });
});
