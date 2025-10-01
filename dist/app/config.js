var config = {
  salvarDados: true,
  debug: false,
  waterMark: false,
  language: "pt-br",
  lms: {
    name: "default",
  },
  acessibility: {
    tools: false,
    outlines: false,
    vlibras: false,
    customLibras: false,
  },
  behaviors: {
    adaptive: false,
    width: 1920,
    height: 1080,
    fontSize: 30,
  },
  modalVoltar: {
    active: false,
    msg: "Você quer continuar de onde parou ou reiniciar o curso?",
    yes: "CONTINUAR",
    no: "REINICIAR",
    color: "#0a698d",
  },
  pages: [
    {
      uid: "01_capa",
      src: "01_capa/index.html",
    },
    {
      uid: "02_form",
      src: "02_form/index.html",
    },
    {
      uid: "03_quiz",
      src: "03_quiz/index.html",
    },
    {
      uid: "04_contraCapa",
      src: "04_contraCapa/index.html",
    },
  ],
};
try {
  module.exports = config;
} catch (e) {}
