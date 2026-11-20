function renderizarGraficoMundial(containerId, dados) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const largura = 620;
  const altura = 300;
  const margem = { topo: 24, direita: 24, baixo: 38, esquerda: 54 };
  const larguraInterna = largura - margem.esquerda - margem.direita;
  const alturaInterna = altura - margem.topo - margem.baixo;

  const maxContas = Math.max(...dados.mundo.contasVazadas) * 1.12;
  const maxAtaques = Math.max(...dados.mundo.ataquesSemanaisOrg) * 1.12;

  const pontosContas = dados.mundo.contasVazadas.map((valor, indice) => ({
    x: margem.esquerda + (indice * larguraInterna) / (dados.anos.length - 1),
    y: margem.topo + alturaInterna - (valor / maxContas) * alturaInterna,
    valor,
    ano: dados.anos[indice]
  }));

  const pontosAtaques = dados.mundo.ataquesSemanaisOrg.map((valor, indice) => ({
    x: margem.esquerda + (indice * larguraInterna) / (dados.anos.length - 1),
    y: margem.topo + alturaInterna - (valor / maxAtaques) * alturaInterna,
    valor,
    ano: dados.anos[indice]
  }));

  const criarLinha = (pontos) => pontos.map((ponto, indice) =>
    `${indice === 0 ? "M" : "L"} ${ponto.x} ${ponto.y}`
  ).join(" ");

  const linhaContas = criarLinha(pontosContas);
  const linhaAtaques = criarLinha(pontosAtaques);

  const grade = [0, 0.25, 0.5, 0.75, 1].map((nivel) => {
    const y = margem.topo + alturaInterna - nivel * alturaInterna;
    return `<line x1="${margem.esquerda}" y1="${y}" x2="${largura - margem.direita}" y2="${y}" class="chart-grid" />`;
  }).join("");

  const labelsAnos = dados.anos.map((ano, indice) => {
    const x = margem.esquerda + (indice * larguraInterna) / (dados.anos.length - 1);
    return `<text x="${x}" y="${altura - 10}" text-anchor="middle" class="chart-label">${ano}</text>`;
  }).join("");

  const pontosContasSvg = pontosContas.map((ponto, indice) => {
    const textoValor = ponto.valor >= 1000
      ? `${(ponto.valor / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} bi`
      : `${ponto.valor.toLocaleString("pt-BR")} mi`;

    return `
      <g class="chart-point chart-point-warning chart-point-${indice}">
        <circle cx="${ponto.x}" cy="${ponto.y}" r="5" fill="oklch(79% 0.16 83)" />
        <text x="${ponto.x}" y="${ponto.y + 20}" text-anchor="middle" class="chart-value chart-value-warning">${textoValor}</text>
      </g>
    `;
  }).join("");

  const pontosAtaquesSvg = pontosAtaques.map((ponto, indice) => `
    <g class="chart-point chart-point-error chart-point-${indice}">
      <circle cx="${ponto.x}" cy="${ponto.y}" r="5" fill="oklch(57% 0.22 27)" />
      <text x="${ponto.x}" y="${ponto.y - 12}" text-anchor="middle" class="chart-value chart-value-error">${ponto.valor.toLocaleString("pt-BR")}</text>
    </g>
  `).join("");

  container.innerHTML = `
    <svg id="svg-grafico-mundial" viewBox="0 0 ${largura} ${altura}" role="img" aria-label="Gráfico combinado de vazamentos e ataques semanais no mundo de 2021 a 2025">
      ${grade}
      ${labelsAnos}
      <path d="${linhaContas}" pathLength="1" fill="none" stroke="oklch(79% 0.16 83)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="chart-line chart-line-warning" />
      <path d="${linhaAtaques}" pathLength="1" fill="none" stroke="oklch(57% 0.22 27)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="chart-line chart-line-error" />
      ${pontosContasSvg}
      ${pontosAtaquesSvg}
      <g id="linha-tooltip" opacity="0">
        <line x1="0" y1="${margem.topo}" x2="0" y2="${margem.topo + alturaInterna}" class="chart-crosshair" />
      </g>
      <rect x="${margem.esquerda}" y="${margem.topo}" width="${larguraInterna}" height="${alturaInterna}" fill="transparent" id="area-tooltip" />
    </svg>
    <div id="tooltip-grafico-mundial" class="tooltip-grafico hidden"></div>
  `;

  const svg = container.querySelector("#svg-grafico-mundial");
  const areaTooltip = container.querySelector("#area-tooltip");
  const linhaTooltip = container.querySelector("#linha-tooltip");
  const tooltip = container.querySelector("#tooltip-grafico-mundial");

  const mostrarTooltip = (evento) => {
    const rectSvg = svg.getBoundingClientRect();
    const xPixel = (evento.clientX - rectSvg.left) * (largura / rectSvg.width);
    const indice = Math.max(0, Math.min(dados.anos.length - 1,
      Math.round(((xPixel - margem.esquerda) / larguraInterna) * (dados.anos.length - 1))
    ))
    const x = margem.esquerda + (indice * larguraInterna) / (dados.anos.length - 1);

    linhaTooltip.setAttribute("opacity", "1");
    const crosshair = linhaTooltip.querySelector("line");
    crosshair.setAttribute("x1", x);
    crosshair.setAttribute("x2", x);

    tooltip.innerHTML = `
      <strong>${dados.anos[indice]}</strong>
      <span><i class="legenda-ponto legenda-warning"></i> ${dados.mundo.contasVazadas[indice].toLocaleString("pt-BR")} milhões vazados</span>
      <span><i class="legenda-ponto legenda-error"></i> ${dados.mundo.ataquesSemanaisOrg[indice].toLocaleString("pt-BR")} ataques/semana</span>
    `;

    tooltip.classList.remove("hidden");

    const rectContainer = container.getBoundingClientRect();
    const xContainer = (x / largura) * rectSvg.width;
    const larguraTooltip = tooltip.offsetWidth;
    tooltip.style.left = `${Math.max(8, Math.min(xContainer - larguraTooltip / 2, rectContainer.width - larguraTooltip - 8))}px`;
    tooltip.style.top = "-7.25rem";
  };

  areaTooltip.addEventListener("mousemove", mostrarTooltip);
  areaTooltip.addEventListener("mouseleave", () => {
    linhaTooltip.setAttribute("opacity", "0");
    tooltip.classList.add("hidden");
  });
}

function renderizarGraficoGolpesBrasil() {
  const container = document.getElementById("grafico-golpes-brasil");
  if (!container) return;

  const percentual = 81;
  const raio = 82;
  const circunferencia = 2 * Math.PI * raio;
  const progresso = circunferencia * (percentual / 100);

  container.innerHTML = `
    <svg viewBox="0 0 220 220" role="img" aria-label="81 por cento dos brasileiros foram alvo de golpe nos últimos 12 meses">
      <circle cx="110" cy="110" r="${raio}" fill="none" stroke="oklch(88% 0.02 255)" stroke-width="24" />
      <circle
        cx="110"
        cy="110"
        r="${raio}"
        fill="none"
        stroke="oklch(88% 0.14 95)"
        stroke-width="24"
        stroke-linecap="round"
        stroke-dasharray="${progresso} ${circunferencia - progresso}"
        transform="rotate(-90 110 110)"
        class="pie-progress"
      />
      <text x="110" y="116" text-anchor="middle" dominant-baseline="middle" fill="#dc2626" class="pie-percent"><tspan id="pie-percent-value">0</tspan>%</text>
      <text x="110" y="143" text-anchor="middle" class="pie-caption">dos brasileiros</text>
    </svg>
  `;
}
