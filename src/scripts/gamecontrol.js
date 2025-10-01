function getObjectFromLocalStorage(key) {
  const jsonString = localStorage.getItem(key);
  return jsonString ? JSON.parse(jsonString) : null;
}

function checkAndSaveOrUpdateObject(storageKey, newData) {
  // Recuperar o objeto do localStorage
  const storedObject = getObjectFromLocalStorage(storageKey);
  let data = storedObject ? { ...storedObject, ...newData } : newData;
  console.log(`${storedObject ? "Updating" : "Creating"} stored`, data);

  // Salvar o objeto atualizado ou novo no localStorage
  const jsonString = JSON.stringify(data);
  localStorage.setItem(storageKey, jsonString);
}

function fullscreen() {
  $(".fullscreen").on("click", function () {
    bridge.fullScreen();
  });
}

$(document).ready(function () {
  fullscreen();

  // navigate.goto(`01_capa`); /// sempre abre o curso na capa

  $("body").on("setOrUpdateObject", function (e, storageKey, newData) {
    checkAndSaveOrUpdateObject(storageKey, newData);
  });

  $("body").on("quiz", function (e, questions) {
    const user = getObjectFromLocalStorage("user");
    bridge.handlerGameDB(user, questions);
    setTimeout(() => {
      navigate.next();
    }, 1000 * 0.12);
  });

  // setupInactivityChecker(1000 * 50, function () {
  //   navigate.goto(`01_capa`);
  //   // Coloque aqui qualquer outra ação que você deseja executar após 30 segundos de inatividade
  // });
});

function setupInactivityChecker(interval, onInactive) {
  let timeout;

  function startTimer() {
    // Clear any existing timeout to avoid multiple timers running
    clearTimeout(timeout);

    // Set a new timeout to check for inactivity after the specified interval
    timeout = setTimeout(function () {
      console.log(
        "Nenhuma interação do usuário detectada nos últimos " +
          interval / 1000 +
          " segundos."
      );
      if (typeof onInactive === "function") {
        onInactive();
      }
    }, interval); // Intervalo em milissegundos
  }

  // Função para resetar o timer a cada clique ou toque
  function resetTimer() {
    startTimer();
  }

  // Escute os eventos de clique e toque em todo o documento
  $(document).on("click touchstart", resetTimer);

  // Inicie o timer inicialmente quando a página carregar
  startTimer();
}

function clearLocalStorage() {
  console.log("entrou clearLocalStorage");
  localStorage.clear();
}
