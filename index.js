var opcoes,
  opcoes2 = [],
  novo = null;
(rota = []), (criterio = null);

/* Inicia o jogo */
function start(ciclo) {
  alert("Pense em um prato que gosta");
  if (ciclo && novo) {
    opcoes2.push(novo);
  }
  rota = [];
  opcoes = [
    { nome: "Lasanha", props: ["massa"] },
    { nome: "Bolo de Chocolate", props: [] },
  ].concat(opcoes2);
  perguntaBase();
}

/* pergunta por um prato especifico no caso de não ter mais opcoes*/
function perguntaBase() {
  if (opcoes.length < 2) {
    for (const op of opcoes) {
      var proceed = confirm(`O prato que você pensou é ${op.nome}?`);
      if (proceed) {
        acertou();
      } else {
        errou();
      }
    }
  } else {
    pergunta();
  }
}

/* Criterios de decisão */
function getProperties() {
  var ps = [];
  opcoes.map((op) => {
    op.props.forEach((element) => {
      ps.push(element);
    });
  });
  return ps;
}

/* Perguntas por propiedades */
function pergunta() {
  var ps = getProperties();
  for (const p of ps) {
    if (
      !rota.some((x) => {
        return x == p;
      })
    ) {
      rota.push(p);
      criterio = p;
      break;
    } else {
      criterio = null;
    }
  }
  var proceed = confirm(`O prato que você pensou é ${criterio}?`);
  novo = {
    nome: "",
    props: [],
  };

  if (proceed) {
    novo.props.push(criterio);
    tmp_list = opcoes.filter((x) => x.props.some((b) => b == criterio));
    opcoes = tmp_list;
    perguntaBase();
  } else {
    tmp_list = opcoes.filter((x) => !x.props.some((b) => b == criterio));
    opcoes = tmp_list;
    perguntaBase();
  }
}

/* No caso de acertar mantendo o json de opcoes */
function acertou() {
  alert("Acertei de Novo!");
  start(false);
}

/* No caso de errar incluindo uma nova opção */
function errou() {
  novo.nome = prompt("Qual prato você pensou?");
  var novaProp = prompt(
    `${novo.nome} é _______ mas ${opcoes[opcoes.length - 1].nome} não`
  );
  novo.props.push(novaProp);
  start(true);
}
