/*
  Obra360 - JavaScript básico (simulações)
  Objetivo: interações simples, fáceis de entender.

  Funcionalidades:
  - Ajustar barras de progresso usando data-percent
  - Botão "comprar" em materiais (muda status)
  - Chat (chat.html): perguntas com alternativas (radio) + resposta automática
*/

// Utilitário: seleciona 1 elemento (atalho para estudantes)
function $(selector, root) {
  return (root || document).querySelector(selector);
}

// Utilitário: seleciona vários elementos
function $all(selector, root) {
  return Array.from((root || document).querySelectorAll(selector));
}

function clampPercent(value) {
  var n = Number(value);
  if (Number.isNaN(n)) return 0;
  if (n < 0) return 0;
  if (n > 100) return 100;
  return n;
}

function initProgressBars() {
  // Qualquer elemento com .progress__bar e data-percent vira uma barra preenchida
  $all(".progress__bar").forEach(function (bar) {
    var pct = clampPercent(bar.getAttribute("data-percent"));
    bar.style.width = pct + "%";
    bar.setAttribute("aria-valuenow", String(pct));
  });
}

function initNavActiveLink() {
  // Marca como ativo o link do menu referente à página atual
  var current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $all(".nav a").forEach(function (link) {
    var href = (link.getAttribute("href") || "").toLowerCase();
    if (href === current) link.classList.add("is-active");
  });
}

function initMaterialsBuyButtons() {
  // Em materiais.html: botão "comprar" altera texto e status (simulado)
  $all("[data-buy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var row = btn.closest("[data-material]");
      if (!row) return;

      var status = $("[data-status]", row);
      if (!status) return;

      status.textContent = "Comprado";
      status.classList.remove("pill--warn");
      status.classList.add("pill--ok");

      btn.textContent = "Comprado ✓";
      btn.disabled = true;
      btn.classList.remove("btn--primary");
      btn.classList.add("btn--ghost");
    });
  });
}

/**
 * Respostas automáticas por pergunta e valor da alternativa (chat.html).
 * Chave = name do grupo de radio; valor = atributo value do input.
 */
var CHAT_AUTO_REPLIES = {
  pergunta_piso: {
    fornecedor:
      "Ótimo. Sugestão Obra360: abra Materiais, compare prazo e frete de 2 fornecedores e registre a decisão no chat com a equipe.",
    manter:
      "Entendido. Sugestão Obra360: atualize o Cronograma (+2 a +4 dias na etapa de revestimento) e avise o cliente sobre a nova data prevista.",
    pausar:
      "Combinado. Sugestão Obra360: redirecione a equipe para elétrica/acabamento leve enquanto o piso não chega, evitando ociosidade."
  },
  pergunta_prioridade: {
    eletrica:
      "Prioridade aceita. Resposta automática: amanhã foco em quadro, testes e pontos — isso destrava iluminação e segurança antes do piso.",
    base:
      "Prioridade aceita. Resposta automática: preparar contrapiso/nivelamento hoje acelera o assentamento quando o material chegar.",
    limpeza:
      "Prioridade aceita. Resposta automática: canteiro organizado reduz perda de material e retrabalho; combine 2h de limpeza + checklist."
  },
  pergunta_custo: {
    dashboard:
      "Resposta automática: use o Dashboard para comparar planejado vs atual semanalmente; qualquer desvio acima de 5% merece ajuste de escopo.",
    alertas:
      "Resposta automática: alertas de materiais e prazo reduzem imprevisto — confira a seção de alertas inteligentes no Dashboard.",
    reuniao:
      "Resposta automática: reunião semanal de 30 min com arquiteto alinha decisões e evita mudanças caras em cima da hora."
  }
};

function scrollChatListToEnd() {
  var list = $("#chatList");
  if (!list) return;
  list.scrollTop = list.scrollHeight;
}

function appendChatBubble(list, opts) {
  var title = opts.title;
  var text = opts.text;
  var isMe = opts.isMe;
  var meta = opts.meta || new Date().toLocaleString();

  var bubble = document.createElement("div");
  bubble.className = "bubble" + (isMe ? " bubble--me" : "");

  var strong = document.createElement("strong");
  strong.textContent = title;

  var msg = document.createElement("div");
  msg.style.marginTop = "6px";
  msg.textContent = text;

  var metaEl = document.createElement("div");
  metaEl.className = "bubble__meta";
  metaEl.textContent = meta;

  bubble.appendChild(strong);
  bubble.appendChild(msg);
  bubble.appendChild(metaEl);
  list.appendChild(bubble);
}

function initChatQna() {
  // Em chat.html: ao marcar uma alternativa (radio), exibe resposta automática
  var list = $("#chatList");
  if (!list) return;

  $all("[data-qna]").forEach(function (block) {
    var fieldset = $(".qna__fieldset", block);
    var repliesBox = $(".qna__replies", block);
    if (!fieldset || !repliesBox) return;

    $all('input[type="radio"]', fieldset).forEach(function (radio) {
      radio.addEventListener("change", function () {
        if (fieldset.getAttribute("data-answered") === "1") return;
        fieldset.setAttribute("data-answered", "1");

        var name = radio.name;
        var value = radio.value;
        var table = CHAT_AUTO_REPLIES[name];
        var autoText = table && table[value] ? table[value] : "Resposta automática: obrigado pelo retorno. Registre a decisão com arquiteto e equipe.";

        // Texto da alternativa escolhida (label)
        var label = radio.closest("label");
        var choiceText = label ? (label.querySelector("span") && label.querySelector("span").textContent.trim()) : value;

        fieldset.disabled = true;
        fieldset.classList.add("qna__fieldset--done");

        repliesBox.hidden = false;
        repliesBox.innerHTML = "";

        appendChatBubble(repliesBox, {
          title: "Você (escolha)",
          text: choiceText,
          isMe: true,
          meta: "Resposta imediata"
        });

        appendChatBubble(repliesBox, {
          title: "Obra360 (resposta automática)",
          text: autoText,
          isMe: false,
          meta: "Gerado ao selecionar a alternativa"
        });

        scrollChatListToEnd();
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initNavActiveLink();
  initProgressBars();
  initMaterialsBuyButtons();
  initChatQna();
});

