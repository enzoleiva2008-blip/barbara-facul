/*
  Obra360 - JavaScript básico (simulações)
  Objetivo: interações simples, fáceis de entender.

  Funcionalidades:
  - Ajustar barras de progresso usando data-percent
  - Botão "comprar" em materiais (muda status)
  - Envio de mensagem no chat (apenas no front)
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

function initChat() {
  // Em chat.html: envia mensagem local (sem servidor)
  var form = $("#chatForm");
  var input = $("#chatMessage");
  var list = $("#chatList");
  var who = $("#chatWho");

  if (!form || !input || !list || !who) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var text = (input.value || "").trim();
    if (!text) return;

    var sender = who.value;

    var bubble = document.createElement("div");
    bubble.className = "bubble " + (sender === "cliente" ? "bubble--me" : "");

    var strong = document.createElement("strong");
    strong.textContent =
      sender === "cliente"
        ? "Você (Cliente)"
        : sender === "arquiteto"
        ? "Arquiteto"
        : "Equipe";

    var msg = document.createElement("div");
    msg.style.marginTop = "6px";
    msg.textContent = text;

    var meta = document.createElement("div");
    meta.className = "bubble__meta";
    meta.textContent = new Date().toLocaleString();

    bubble.appendChild(strong);
    bubble.appendChild(msg);
    bubble.appendChild(meta);
    list.appendChild(bubble);

    input.value = "";
    input.focus();

    // Rola para a última mensagem
    list.scrollTop = list.scrollHeight;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initNavActiveLink();
  initProgressBars();
  initMaterialsBuyButtons();
  initChat();
});

