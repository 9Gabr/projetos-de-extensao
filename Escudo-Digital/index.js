const perguntasDiagnostico = [
  {
    categoria: "WhatsApp",
    pergunta: "A confirmação em duas etapas (aquele PIN de 6 dígitos) está ativada no seu WhatsApp?",
    positivas: "Sim, está ativada",
    negativas: "Não / Não sei o que é",
    tituloAusente: "Ative o PIN de 6 dígitos no WhatsApp",
    explicacao: "Mesmo que um golpista consiga clonar seu chip ou descobrir o código que chega por SMS, ele não consegue entrar na sua conta sem esse PIN. Sem ele, criminosos assumem seu número para pedir dinheiro aos seus contatos."
  },
  {
    categoria: "Pix",
    pergunta: "Você reduziu o limite de transferência Pix do seu banco para valores mais baixos no dia a dia e à noite?",
    positivas: "Sim, já ajustei",
    negativas: "Não, deixei o padrão do banco",
    tituloAusente: "Ajuste seus limites diários e noturnos do Pix",
    explicacao: "Deixar o limite alto por padrão permite que, em caso de roubo de celular desbloqueado ou invasão de conta, toda a sua reserva seja transferida em segundos. Com limite baixo, o prejuízo fica travado e o banco leva de 24h a 48h para liberar aumentos."
  },
  {
    categoria: "Senhas",
    pergunta: "Você usa senhas diferentes para seu e-mail principal, aplicativos de banco e redes sociais?",
    positivas: "Sim, são diferentes",
    negativas: "Não, repito a mesma senha",
    tituloAusente: "Pare de repetir a mesma senha",
    explicacao: "Quando um site sofre um vazamento, criminosos testam aquele mesmo e-mail e senha em bancos, lojas e redes sociais automaticamente. Ter uma senha exclusiva para o e-mail e para cada banco impede o efeito dominó."
  },
  {
    categoria: "Links e mensagens suspeitas",
    pergunta: "Quando recebe uma mensagem urgente sobre entrega, boleto ou bloqueio de conta, você confere direto no aplicativo oficial antes de clicar no link?",
    positivas: "Sim, sempre confiro fora do link",
    negativas: "Não, costumo clicar para ver",
    tituloAusente: "Nunca resolva urgências pelo link da mensagem",
    explicacao: "Golpistas usam dados reais vazados, como seu nome e CPF, para criar mensagens falsas convincentes. Clicar no link pode instalar programas espiões ou levar a páginas idênticas às do banco que roubam sua senha na hora."
  },
  {
    categoria: "Gov.br",
    pergunta: "Sua conta Gov.br está no nível Prata ou Ouro e com a verificação em duas etapas ativada?",
    positivas: "Sim, está protegida",
    negativas: "Não / Nunca configurei",
    tituloAusente: "Proteja sua conta Gov.br com verificação em duas etapas",
    explicacao: "O Gov.br é a chave da sua vida digital no Brasil: INSS, Receita Federal, CNH e assinatura eletrônica. Sem a verificação em duas etapas, terceiros com seus dados vazados podem tentar recuperar sua senha e assumir sua identidade oficial."
  }
];

const dadosSeguranca = {
  anos: ["2021", "2022", "2023", "2024", "2025"],

  brasil: {
    tentativasGolpe: [4.1, 3.9, 9.9, 10.9, 13.5],
    contasVazadas: [24.2, 13.8, 18.5, 32.4, 38.1]
  },

  mundo: {
    ataquesSemanaisOrg: [925, 1168, 1158, 1673, 1925],
    contasVazadas: [984, 316, 300, 732, 1100]
  }
};

window.addEventListener("load", () => {
  const modalDiagnostico = document.getElementById("modal-diagnostico");
  const botaoAbrir = document.getElementById("abrir-diagnostico");
  const botaoFechar = document.getElementById("fechar-diagnostico");
  const conteudoQuiz = document.getElementById("conteudo-quiz");
  const progressoQuiz = document.getElementById("progresso-quiz");
  const etapaQuiz = document.getElementById("etapa-quiz");
  let perguntaAtual = 0;
  let respostas = [];

  const iniciarQuiz = () => {
    perguntaAtual = 0;
    respostas = [];
    renderizarPergunta();
  };

  const renderizarPergunta = () => {
    const pergunta = perguntasDiagnostico[perguntaAtual];
    progressoQuiz.value = perguntaAtual + 1;
    etapaQuiz.textContent = `Pergunta ${perguntaAtual + 1} de ${perguntasDiagnostico.length}`;

    conteudoQuiz.innerHTML = `
      <div class="space-y-5">
        <span class="badge badge-outline">${pergunta.categoria}</span>
        <h3 class="text-xl md:text-2xl font-bold leading-snug">${pergunta.pergunta}</h3>
        <div class="grid gap-3">
          <button type="button" class="btn btn-outline btn-lg justify-start text-left resposta-quiz" data-resposta="sim">
            ${pergunta.positivas}
          </button>
          <button type="button" class="btn btn-outline btn-lg justify-start text-left resposta-quiz" data-resposta="nao">
            ${pergunta.negativas}
          </button>
        </div>
      </div>
    `;

    conteudoQuiz.querySelectorAll(".resposta-quiz").forEach((botao) => {
      botao.addEventListener("click", () => {
        respostas.push({
          pergunta,
          protege: botao.dataset.resposta === "sim"
        });

        perguntaAtual += 1;
        if (perguntaAtual < perguntasDiagnostico.length) {
          renderizarPergunta();
        } else {
          renderizarResultado();
        }
      });
    });
  };

  const renderizarResultado = () => {
    const acertos = respostas.filter((resposta) => resposta.protege).length;
    const vulnerabilidades = respostas
      .filter((resposta) => !resposta.protege)
      .map((resposta) => resposta.pergunta.tituloAusente);

    let classificacao;
    if (acertos <= 1) {
      classificacao = {
        titulo: "Risco Alto — Porta Aberta",
        texto: "Seus dados estão muito expostos a golpes comuns. A boa notícia é que resolver os pontos abaixo leva menos de 10 minutos.",
        cor: "alert-error"
      };
    } else if (acertos <= 3) {
      classificacao = {
        titulo: "Risco Moderado — Escudo Parcial",
        texto: "Você já tem bons hábitos, mas deixou brechas importantes que os golpistas mais exploram hoje.",
        cor: "alert-warning"
      };
    } else {
      classificacao = {
        titulo: "Bem Protegido — Escudo Ativo",
        texto: "Parabéns! Seus hábitos já bloqueiam a grande maioria dos golpes digitais. Mantenha esses cuidados sempre atualizados.",
        cor: "alert-success"
      };
    }

    progressoQuiz.value = 5;
    etapaQuiz.textContent = "Resultado do diagnóstico";

    conteudoQuiz.innerHTML = `
      <div class="space-y-4">
        <form id="form-nome" class="grid gap-4">
          <div>
            <h3 class="text-xl md:text-2xl font-bold">Para ver seu resultado</h3>
            <p class="mt-2 opacity-80">Digite seu nome ou apelido.</p>
          </div>
          <label class="form-control">
            <span class="label-text mb-1">Nome ou apelido</span>
            <input id="nome-participante" name="nome" type="text" class="input input-bordered w-full" required />
          </label>
          <button type="submit" class="btn btn-primary">Ver meu resultado</button>
        </form>

        <div id="resultado-diagnostico" class="hidden space-y-4">
        <div class="alert ${classificacao.cor}">
          <div>
            <p class="text-sm opacity-80">Sua pontuação: ${acertos} de 5</p>
            <h3 class="font-bold text-lg">${classificacao.titulo}</h3>
            <p>${classificacao.texto}</p>
          </div>
        </div>

        ${vulnerabilidades.length > 0 ? `
          <div>
            <h3 class="font-bold mb-2">Pontos para reforçar</h3>
            <div class="grid gap-2">
              ${vulnerabilidades.map((titulo) => {
                const resposta = respostas.find((item) => item.pergunta.tituloAusente === titulo);
                return `
                  <article class="rounded-box border border-base-300 bg-base-100 p-4">
                    <h4 class="font-bold">${titulo}</h4>
                    <p class="mt-1 text-sm leading-relaxed opacity-80">${resposta.pergunta.explicacao}</p>
                  </article>
                `;
              }).join("")}
            </div>
          </div>
        ` : `
          <div class="alert alert-success"><span>Você respondeu que já possui todas as proteções deste diagnóstico.</span></div>
        `}

        <form id="form-diagnostico" class="grid gap-3 pt-4 pb-2">
          <label class="form-control">
            <span class="label-text mb-1">Comentário opcional</span>
            <textarea id="comentario-participante" name="comentario" class="textarea textarea-bordered w-full" rows="3" placeholder="Escreva o que achou das informações, seu feedback ou qualquer experiência que queira compartilhar."></textarea>
          </label>
          <button type="submit" class="btn btn-primary">Enviar resultado</button>
        </form>

        </div>

        <div id="mensagem-envio" class="hidden space-y-5 py-2">
          <div class="text-center">
            <div class="text-5xl mb-3">Obrigado!</div>
          </div>

          <div class="divider"></div>

          <div>
            <h4 class="font-bold mb-3">Continue aprendendo</h4>
            <div class="grid gap-3">
              <a href="https://cartilha.cert.br/fasciculos/" target="_blank" rel="noopener noreferrer" class="card card-compact border border-base-300 bg-base-100 hover:bg-base-200 transition-colors">
                <div class="card-body">
                  <h5 class="card-title text-base">Cartilhas do CERT.br <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-4 shrink-0" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H18v4.5M18 6l-7.5 7.5M10.5 4.5h-3A3 3 0 004.5 7.5v10.5h10.5a3 3 0 003-3v-3" /></svg></h5>
                  <p class="text-sm opacity-80">Fascículos bem ilustrados sobre diversos assuntos de segurança cibernética.</p>
                </div>
              </a>

              <a href="https://www.instagram.com/InternetSeguraBR/" target="_blank" rel="noopener noreferrer" class="card card-compact border border-base-300 bg-base-100 hover:bg-base-200 transition-colors">
                <div class="card-body">
                  <h5 class="card-title text-base">Instagram da Internet Segura <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-4 shrink-0" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H18v4.5M18 6l-7.5 7.5M10.5 4.5h-3A3 3 0 004.5 7.5v10.5h10.5a3 3 0 003-3v-3" /></svg></h5>
                  <p class="text-sm opacity-80">Conteúdos rápidos e acessíveis sobre proteção na internet.</p>
                </div>
              </a>

              <a href="https://www.youtube.com/playlist?list=PLQq8-9yVHyOZRRVDecvSEXwEI9A-Y7-Na" target="_blank" rel="noopener noreferrer" class="card card-compact border border-base-300 bg-base-100 hover:bg-base-200 transition-colors">
                <div class="card-body">
                  <h5 class="card-title text-base">Vídeos rápidos de segurança na rede <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-4 shrink-0" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H18v4.5M18 6l-7.5 7.5M10.5 4.5h-3A3 3 0 004.5 7.5v10.5h10.5a3 3 0 003-3v-3" /></svg></h5>
                  <p class="text-sm opacity-80">Playlist com explicações curtas para reconhecer riscos e se proteger.</p>
                </div>
              </a>
            </div>
          </div>
        </div>
        </div>
      </div>
    `;

    const formNome = document.getElementById("form-nome");
    formNome.addEventListener("submit", (evento) => {
      evento.preventDefault();
      formNome.classList.add("hidden");
      document.getElementById("resultado-diagnostico").classList.remove("hidden");
    });

    const formulario = document.getElementById("form-diagnostico");
    formulario.addEventListener("submit", (evento) => {
      evento.preventDefault();

      const dados = new FormData();
      dados.append("entry.1880669046", document.getElementById("nome-participante").value);
      dados.append("entry.436510219", String(acertos));
      dados.append("entry.1115164872", vulnerabilidades.length > 0 ? vulnerabilidades.join(", ") : "Proteção completa");
      dados.append("entry.1738061936", document.getElementById("comentario-participante").value);

      fetch("https://docs.google.com/forms/d/e/1FAIpQLSdSxjTW0ijlXOVz7jkm5shZBYrnqhGSROBlqRsu8zPwMcZmXw/formResponse", {
        method: "POST",
        mode: "no-cors",
        body: dados
      }).catch(() => {});

      formulario.classList.add("hidden");
      document.getElementById("resultado-diagnostico").classList.add("hidden");
      document.getElementById("mensagem-envio").classList.remove("hidden");
      document.getElementById("progresso-quiz").classList.add("hidden");
      document.getElementById("etapa-quiz").classList.add("hidden");
    });
  };

  if (botaoAbrir) {
    botaoAbrir.addEventListener("click", () => {
      iniciarQuiz();
      modalDiagnostico.showModal();
    });
  }

  if (modalDiagnostico) {
    modalDiagnostico.addEventListener("cancel", (evento) => {
      evento.preventDefault();
    });
  }

  if (botaoFechar) {
    botaoFechar.addEventListener("click", () => modalDiagnostico.close());
  }

  document.body.classList.add("page-loaded");

  if (typeof renderizarGraficoMundial === "function") {
    renderizarGraficoMundial("grafico-mundial", dadosSeguranca);
  }

  if (typeof renderizarGraficoGolpesBrasil === "function") {
    renderizarGraficoGolpesBrasil();
  }

  const animarValoresBrasil = () => {
    const valorPie = document.getElementById("pie-percent-value");
    const valorPerdas = document.getElementById("valor-perdas");
    const rotuloPerdas = document.getElementById("rotulo-perdas");

    if (!valorPie || !valorPerdas || valorPie.dataset.animado === "true") return;

    valorPie.dataset.animado = "true";
    const inicio = performance.now();
    const duracao = 1500;

    const animarValores = (tempoAtual) => {
      const progresso = Math.min((tempoAtual - inicio) / duracao, 1);
      const suavizado = 1 - Math.pow(1 - progresso, 3);

      valorPie.textContent = String(Math.round(81 * suavizado));
      const valorAtual = Math.max(1, Math.round(21 * suavizado));
      valorPerdas.textContent = String(valorAtual);

      if (rotuloPerdas) {
        rotuloPerdas.textContent = valorAtual === 1 ? "bilhão" : "bilhões";
      }

      if (progresso < 1) requestAnimationFrame(animarValores);
    };

    requestAnimationFrame(animarValores);
  };

  const elementosContexto = document.querySelectorAll('section[id^="contexto-1"] > .container > *, section[id^="contexto-2"] > .container > *');
  elementosContexto.forEach((elemento) => elemento.classList.add("contexto-reveal"));

  if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("is-visible");

          if (entrada.target.closest("#contexto-2")) {
            entrada.target.classList.add("is-visible");
          }

          observador.unobserve(entrada.target);
        }
      });
    }, {
      threshold: 0.18,
      rootMargin: "0px 0px -25% 0px"
    });

    elementosContexto.forEach((elemento) => observador.observe(elemento));
  } else {
    elementosContexto.forEach((elemento) => elemento.classList.add("is-visible"));
  }

  const graficoBrasil = document.getElementById("grafico-golpes-brasil");

  const graficoMundial = document.getElementById("grafico-mundial");

  if (graficoMundial && "IntersectionObserver" in window) {
    const observadorMundial = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          graficoMundial.classList.add("chart-animado");
          observadorMundial.unobserve(graficoMundial);
        }
      });
    }, {
      threshold: 0.75,
      rootMargin: "0px 0px -5% 0px"
    });

    observadorMundial.observe(graficoMundial);
  }

  if (graficoBrasil && "IntersectionObserver" in window) {
    const observadorPie = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          graficoBrasil.classList.add("pie-animado");
          animarValoresBrasil();
          observadorPie.unobserve(graficoBrasil);
        }
      });
    }, {
      threshold: 0.35,
      rootMargin: "0px 0px -10% 0px"
    });

    observadorPie.observe(graficoBrasil);
  }

});
