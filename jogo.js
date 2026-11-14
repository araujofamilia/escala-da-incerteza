/* A Escala da Incerteza: lógica da atividade. Sem dependências.
   Mesmo desenho visual de O Fechamento (araujofamilia/o-fechamento). */
(function () {
  "use strict";

  var VERSAO = "2026-11-14a";
  var PREF = "escala-incerteza:v1:";
  var ULTIMO = "escala-incerteza:ultimo";

  var app = document.getElementById("app");
  var barra = document.getElementById("barra");
  var toastEl = document.getElementById("toast");
  var S = null;
  var porJornal = {}; JORNAIS.forEach(function (j) { porJornal[j.id] = j; });
  var porMesa = {}; MESAS.forEach(function (m) { porMesa[m.id] = m; });
  var ETAPAS = ["fato", "titulo", "fvi", "placar", "veredicto", "depois"];

  /* ---------------- utilidades ---------------- */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function embaralha(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function idx(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return a; }
  function palavras(t) { return (String(t || "").trim().match(/\S+/g) || []).length; }
  function agora() { return new Date().toISOString(); }
  function dataBR(iso) { try { var d = new Date(iso); return d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }); } catch (e) { return iso; } }
  function emailValido(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e); }
  function temAspas(t) { return /["“”«»]/.test(t || ""); }
  function toast(msg) { toastEl.textContent = msg; toastEl.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(function () { toastEl.classList.remove("on"); }, 3200); }
  function flutua(txt, el) {
    try {
      var r = el ? el.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0 };
      var d = document.createElement("div"); d.className = "xpfloat"; d.textContent = txt;
      d.style.left = (r.left + r.width / 2 - 20) + "px"; d.style.top = (r.top - 10) + "px";
      document.body.appendChild(d); setTimeout(function () { d.remove(); }, 1200);
    } catch (e) {}
  }
  function confirma(msg, sim) {
    var fundo = document.createElement("div");
    fundo.style.cssText = "position:fixed;inset:0;background:rgba(29,27,24,.55);z-index:70;display:flex;align-items:center;justify-content:center;padding:18px";
    fundo.innerHTML = '<div class="box" style="max-width:460px"><p style="margin-top:0">' + esc(msg) + '</p><div class="acoes"><button class="btn verm" data-r="1">Sim</button><button class="btn sec" data-r="0">Não</button></div></div>';
    document.body.appendChild(fundo);
    fundo.addEventListener("click", function (e) { var b = e.target.closest("[data-r]"); if (!b && e.target !== fundo) return; fundo.remove(); if (b && b.dataset.r === "1") sim(); });
  }
  function topo() { window.scrollTo(0, 0); }

  /* ---------------- estado ---------------- */
  function novo(email, nome, ra) {
    return { v: 1, email: email, nome: nome, ra: ra, inicio: agora(), xp: 0, acertos: 0, erros: 0, seq: 0, melhorSeq: 0,
      mesas: {}, placar: null, veredicto: null, depois: null, rascunhos: {}, rodada: null, entregue: false };
  }
  function salvar() { try { localStorage.setItem(PREF + S.email, JSON.stringify(S)); localStorage.setItem(ULTIMO, S.email); } catch (e) {} }
  function carregar(email) { try { var t = localStorage.getItem(PREF + email); return t ? JSON.parse(t) : null; } catch (e) { return null; } }
  function mesaEst(id) { if (!S.mesas[id]) S.mesas[id] = { rodadas: 0, melhor: 0, concluida: false }; return S.mesas[id]; }
  function feita(id) {
    if (porMesa[id]) return !!(S.mesas[id] && S.mesas[id].concluida);
    if (id === "placar") return !!S.placar;
    if (id === "veredicto") return !!S.veredicto;
    if (id === "depois") return !!S.depois;
    return false;
  }
  function aberta(id) { var i = ETAPAS.indexOf(id); return i === 0 || feita(ETAPAS[i - 1]); }
  function feitas() { return ETAPAS.filter(feita).length; }
  function nivel() { var n = NIVEIS[0], prox = null; for (var i = 0; i < NIVEIS.length; i++) { if (S.xp >= NIVEIS[i].xp) { n = NIVEIS[i]; prox = NIVEIS[i + 1] || null; } } return { n: n, prox: prox }; }
  function ganha(x, el) { S.xp += x; if (x > 0) flutua("+" + x, el); }

  /* ---------------- barra ---------------- */
  function desenhaBarra() {
    if (!S) { barra.hidden = true; return; }
    barra.hidden = false;
    var nv = nivel();
    var pct = nv.prox ? Math.round((S.xp - nv.n.xp) / (nv.prox.xp - nv.n.xp) * 100) : 100;
    barra.innerHTML = '<div class="in"><span class="marca" data-ir="redacao">A Escala da Incerteza</span>' +
      '<span class="chip" title="Seu cargo na redação">' + esc(nv.n.nome) + ' · ' + S.xp + ' XP<span class="xpbar"><i style="width:' + pct + '%"></i></span></span>' +
      '<span class="chip" title="Etapas feitas">Etapas ' + feitas() + '/6</span>' +
      '<span class="esp"></span>' +
      '<button data-ir="caderno">Caderno de trechos</button>' +
      '<button data-ir="ficha">Minha ficha' + (S.entregue ? ' ✓' : '') + '</button>' +
      '<button data-ir="redacao">Redação</button></div>';
  }
  barra.addEventListener("click", function (e) {
    var b = e.target.closest("[data-ir]"); if (!b) return;
    if (b.dataset.ir === "caderno") telaCaderno(); else if (b.dataset.ir === "ficha") telaFicha(); else telaRedacao();
  });

  /* ---------------- capa ---------------- */
  function telaCapa() {
    S = null; desenhaBarra();
    var ult = ""; try { ult = localStorage.getItem(ULTIMO) || ""; } catch (e) {}
    var prev = ult ? carregar(ult) : null;
    app.innerHTML =
      '<header class="masthead"><div class="kicker">Fundamentos de Jornalismo · PUC-Campinas · Turma 0101</div>' +
      '<h1>A Escala da Incerteza</h1><div class="sub">o plantão do apagão aéreo</div></header>' +
      '<div class="dateline"><span>Atividade digital · 2026/2</span><span>Fundamentos 1 e 7</span><span>5 jornais · edições de 14/11/2026</span></div>' +
      '<div class="cols"><div class="c-intro">' +
      '<div class="selo">Plantão</div>' +
      '<div class="manchete">' + esc(CASO.titulo) + '</div>' +
      '<p class="linhafina">' + esc(CASO.linhafina) + '</p>' +
      '</div><div class="c-resto">' +
      '<div class="aviso"><b>Atividade de oficina.</b> A entrega conta como ficha de participação. A régua é a da disciplina: veredicto sem trecho citado não pontua.</div>' +
      '<h2 class="secao">Como funciona</h2><ul class="lista">' +
      '<li><b>Três mesas de treino</b> (o fato e os números, a fonte e o título, fato, versão ou interpretação): você responde e recebe a explicação na hora.</li>' +
      '<li><b>Três etapas escritas</b>, como na ficha de papel: o placar da incerteza de dois jornais, o veredicto e, depois do fechamento, a pergunta final.</li>' +
      '<li><b>O caderno de trechos</b> fica no alto da tela o tempo todo: são os trechos reais dos cinco jornais, com a página.</li>' +
      '<li><b>Seu progresso</b> fica salvo neste navegador. No fim, ' + (CONFIG.envio.acao ? 'a ficha vai direto para o professor, e você ainda pode baixar uma cópia.' : 'baixe a ficha e mande ao professor do jeito que ele indicar no Canvas.') + '</li></ul>' +
      '</div><div class="c-entrada"><div class="box"><div class="tipo" style="--c:var(--vermelho)">Crachá de entrada</div>' +
      '<label class="l" for="nome">Nome completo</label><input class="campo" id="nome" autocomplete="name" value="' + esc(prev ? prev.nome : "") + '">' +
      '<label class="l" for="ra">RA</label><input class="campo" id="ra" inputmode="numeric" value="' + esc(prev ? prev.ra : "") + '">' +
      '<label class="l" for="email">E-mail</label><input class="campo" id="email" type="email" autocomplete="email" placeholder="seu.nome@puccampinas.edu.br" value="' + esc(ult) + '">' +
      '<div class="erro" id="erro"></div>' +
      '<div class="acoes"><button class="btn verm" id="entrar">Entrar no plantão</button></div>' +
      '<p class="mini">Use sempre o mesmo e-mail: ele guarda seu progresso e identifica sua ficha.</p>' +
      '<div id="retorno"></div></div></div></div>' +
      '<div class="rodape">Trechos reais, transcritos das edições de 14/11/2026 com veículo e página, para uso didático. "Depois do fechamento" resume o que se sabia na manhã de 14/11 (FAA, NBC, Al Jazeera). Atividade feita com apoio de IA, sob supervisão do professor. Versão ' + VERSAO + '.</div>';
    var inp = document.getElementById("email");
    function mostraRetorno() {
      var e = inp.value.trim().toLowerCase(); var s = emailValido(e) ? carregar(e) : null;
      document.getElementById("retorno").innerHTML = s ? '<p class="mini" style="color:var(--verde)">Bem-vindo de volta: ' + s.xp + ' XP.</p>' : "";
    }
    inp.addEventListener("input", mostraRetorno); mostraRetorno();
    function entrar() {
      var nome = document.getElementById("nome").value.trim(), ra = document.getElementById("ra").value.trim(), e = inp.value.trim().toLowerCase();
      var er = document.getElementById("erro");
      if (palavras(nome) < 2) { er.textContent = "Digite seu nome completo."; return; }
      if (!/^\d{5,}$/.test(ra.replace(/\D/g, ""))) { er.textContent = "Digite seu RA (só números)."; return; }
      if (!emailValido(e)) { er.textContent = "Digite um e-mail válido."; return; }
      S = carregar(e) || novo(e, nome, ra); S.nome = nome; S.ra = ra.replace(/\D/g, ""); salvar(); telaRedacao();
    }
    document.getElementById("entrar").onclick = entrar;
    inp.addEventListener("keydown", function (ev) { if (ev.key === "Enter") entrar(); });
  }

  /* ---------------- redação (painel das etapas) ---------------- */
  var EXTRAS = {
    placar: { n: 4, nome: "Placar da incerteza", cor: "#8a6d3b", simbolo: "▦", st: "Escolha dois jornais e meça cada um." },
    veredicto: { n: 5, nome: "Veredicto", cor: "#1d1b18", simbolo: "§", st: "De 2 a 4 linhas, com trecho." },
    depois: { n: 6, nome: "Depois do fechamento", cor: "#c0392b", simbolo: "☾", st: "O que se soube no dia seguinte." }
  };
  function telaRedacao() {
    desenhaBarra(); topo();
    var c = feitas();
    var html = '<div class="dateline" style="margin-top:18px"><span>' + esc(S.nome) + ' · RA ' + esc(S.ra) + '</span><span>' + c + ' de 6 etapas</span><span>' + S.acertos + ' acertos · melhor sequência ' + S.melhorSeq + '</span></div>';
    if (S.rodada) html += '<div class="aviso" style="border-color:var(--ouro);background:#fff9ec;margin-bottom:16px"><b style="color:var(--tinta)">Mesa em andamento:</b> ' + esc(porMesa[S.rodada.mesa].nome) + ', questão ' + (S.rodada.i + 1) + ' de ' + S.rodada.itens.length + '. <button class="btn" style="margin-left:8px;padding:6px 14px;font-size:14px" id="continuar">Continuar de onde parei</button></div>';
    html += '<div class="manchete" style="font-size:clamp(28px,4vw,40px)">A redação</div><div class="progresso"><i style="width:' + (c / 6 * 100) + '%"></i></div>' +
      '<div class="box" style="margin-top:16px">' + CASO.contexto.map(function (p) { return '<p style="margin:0 0 10px">' + esc(p) + '</p>'; }).join("") +
      '<p class="mini" style="margin:0">Os dois fundamentos de hoje: <b>' + FUNDAMENTOS.f1.n + '. ' + esc(FUNDAMENTOS.f1.nome) + '</b> (' + esc(FUNDAMENTOS.f1.texto) + ') e <b>' + FUNDAMENTOS.f7.n + '. ' + esc(FUNDAMENTOS.f7.nome) + '</b> (' + esc(FUNDAMENTOS.f7.texto) + ')</p></div>' +
      '<div class="grade">';
    ETAPAS.forEach(function (id) {
      var m = porMesa[id] || EXTRAS[id], ok = feita(id), ab = aberta(id);
      var st = porMesa[id] ? (S.mesas[id] ? 'Melhor rodada: ' + S.mesas[id].melhor + '/' + m.itens.length : m.itens.length + ' questões · corrigidas na hora') : m.st;
      html += '<button class="mesa' + (ab ? '' : ' trancada') + (id === "veredicto" ? ' especial' : '') + '" data-et="' + id + '" style="--c:' + m.cor + '"' + (ab ? '' : ' aria-disabled="true"') + '>' +
        '<span class="simb">' + m.simbolo + '</span><div class="num">Etapa ' + m.n + (porMesa[id] ? ' · treino' : ' · vai para a ficha') + '</div><div class="nome">' + esc(m.nome) + '</div>' +
        '<div class="st">' + (ab ? esc(st) : 'Abre depois da etapa ' + (m.n - 1)) + '</div>' + (ok ? '<span class="carimbo">FEITA</span>' : '') + '</button>';
    });
    html += '</div>';
    if (feita("depois")) html += '<div class="acoes"><button class="btn verm" id="irficha">Ver e entregar minha ficha</button></div>';
    app.innerHTML = html;
    if (S.rodada) document.getElementById("continuar").onclick = mostraItem;
    var bf = document.getElementById("irficha"); if (bf) bf.onclick = telaFicha;
    app.querySelectorAll("[data-et]").forEach(function (b) {
      b.onclick = function () {
        var id = b.dataset.et;
        if (!aberta(id)) { toast("Faça antes a etapa anterior."); return; }
        if (porMesa[id]) confirmaTroca(function () { novaRodada(id); });
        else if (id === "placar") telaPlacar(); else if (id === "veredicto") telaVeredicto(); else telaDepois();
      };
    });
  }
  function confirmaTroca(fn) {
    if (S.rodada) confirma("Você tem uma mesa em andamento. Começar outra e abandonar a atual?", function () { S.rodada = null; fn(); });
    else fn();
  }

  /* ---------------- mesas de treino ---------------- */
  function novaRodada(id) {
    var m = porMesa[id];
    S.rodada = { mesa: id, i: 0, res: [], itens: m.itens.map(function (it, k) { return { k: k, ordem: embaralha(idx(it.ops.length)) }; }) };
    if (id === "fvi") S.rodada.itens.forEach(function (it) { it.ordem = idx(3); });
    salvar(); mostraItem();
  }
  function recorte(r) { return '<div class="recorte"><span class="fonte real">Caso real · ' + esc(r.fonte) + '</span>' + esc(r.txt) + '</div>'; }
  function pontinhos(r) { return '<div class="pontos">' + r.itens.map(function (x, i) { var c = i < r.res.length ? (r.res[i] ? "ok" : "no") : (i === r.i ? "at" : ""); return '<span class="' + c + '"></span>'; }).join("") + '</div>'; }
  function mostraItem() {
    var r = S.rodada; if (!r) { telaRedacao(); return; }
    var m = porMesa[r.mesa];
    if (r.i >= r.itens.length) { fimRodada(); return; }
    desenhaBarra(); topo();
    var it = r.itens[r.i], q = m.itens[it.k];
    var html = '<div class="topo-rodada"><div><div class="tipo" style="--c:' + m.cor + '">Etapa ' + m.n + ' · ' + esc(m.nome) + '</div><div class="mini">' + esc(m.intro) + '</div></div>' + pontinhos(r) + '</div>' +
      '<div class="cartao" style="--c:' + m.cor + '"><div class="tipo">Questão ' + (r.i + 1) + ' de ' + r.itens.length + '</div>' +
      (q.recortes || []).map(recorte).join("") +
      '<div class="enun">' + esc(q.q) + '</div><div class="ops">' +
      it.ordem.map(function (o, i) { return '<button class="op" data-o="' + o + '"><span class="letra">' + "ABCD"[i] + '</span><span>' + esc(q.ops[o]) + '</span></button>'; }).join("") +
      '</div><div id="fb"></div></div><div class="acoes"><button class="btn sec" id="sair">Sair e continuar depois</button></div>';
    app.innerHTML = html;
    document.getElementById("sair").onclick = function () { salvar(); telaRedacao(); };
    var bts = app.querySelectorAll(".op");
    bts.forEach(function (b) {
      b.onclick = function () {
        var certaVal = String(q.c), certo = b.dataset.o === certaVal;
        bts.forEach(function (x) { x.disabled = true; if (x.dataset.o === certaVal) x.classList.add("certa"); });
        if (!certo) b.classList.add("errada");
        var pts = 0;
        if (certo) { S.acertos++; S.seq++; S.melhorSeq = Math.max(S.melhorSeq, S.seq); pts = 10; if (S.seq >= 3) pts += 5; }
        else { S.erros++; S.seq = 0; }
        ganha(pts, b); r.res.push(certo); r.i++; salvar(); desenhaBarra();
        document.getElementById("fb").innerHTML = '<div class="feedback ' + (certo ? 'ok' : 'no') + '"><b class="v">' + (certo ? (S.seq >= 3 ? 'Certo! Sequência de ' + S.seq + '.' : 'Certo!') : 'Não foi dessa vez.') + '</b>' + esc(q.exp) + '</div>' +
          '<div class="acoes"><button class="btn" id="prox">' + (r.i >= r.itens.length ? 'Ver resultado' : 'Próxima') + '</button></div>';
        var p = document.getElementById("prox"); p.focus(); p.onclick = mostraItem;
      };
    });
  }
  function fimRodada() {
    var r = S.rodada, m = porMesa[r.mesa], est = mesaEst(r.mesa);
    var certos = r.res.filter(Boolean).length, tot = r.itens.length;
    est.rodadas++; est.melhor = Math.max(est.melhor, certos);
    var fechou = !est.concluida;
    est.concluida = true; S.rodada = null;
    if (fechou) ganha(15);
    salvar(); desenhaBarra(); topo();
    var prox = ETAPAS[ETAPAS.indexOf(m.id) + 1];
    app.innerHTML = '<div class="placar"><div class="tipo" style="--c:' + m.cor + '">Etapa ' + m.n + ' · ' + esc(m.nome) + '</div>' +
      '<div class="grande">' + certos + '/' + tot + '</div>' +
      '<div class="carimbao' + (certos >= Math.ceil(tot / 2) ? '' : ' verm') + '">' + (certos === tot ? 'IMPECÁVEL' : 'MESA FEITA') + '</div>' +
      '<p>' + (certos === tot ? 'Leitura de editor de fechamento.' : 'Releia as explicações das questões que escaparam: elas são a régua das etapas escritas.') + '</p>' +
      '<div class="acoes" style="justify-content:center">' + (prox ? '<button class="btn verm" id="seg">Seguir para a etapa ' + (m.n + 1) + '</button>' : '') +
      '<button class="btn sec" id="denovo">Jogar esta mesa de novo</button><button class="btn sec" id="red">Redação</button></div></div>';
    var s = document.getElementById("seg");
    if (s) s.onclick = function () { if (porMesa[prox]) novaRodada(prox); else if (prox === "placar") telaPlacar(); };
    document.getElementById("denovo").onclick = function () { novaRodada(m.id); };
    document.getElementById("red").onclick = telaRedacao;
  }

  /* ---------------- caderno ---------------- */
  function cadernoHTML(compacto) {
    return JORNAIS.map(function (j) {
      return '<details' + (compacto ? '' : ' open') + ' class="box" style="margin:10px 0"><summary style="cursor:pointer;font-family:var(--titulo);font-weight:900;font-size:22px">' + esc(j.nome) + ' <span class="mini" style="font-family:var(--sans)">' + esc(j.data) + '</span></summary>' +
        j.trechos.map(function (t) { return '<div class="recorte" style="margin:10px 0"><span class="fonte">' + esc(t.onde) + '</span>' + esc(t.txt) + '</div>'; }).join("") + '</details>';
    }).join("");
  }
  function telaCaderno() {
    desenhaBarra(); topo();
    app.innerHTML = '<div class="dateline" style="margin-top:18px"><span>Caderno de trechos</span><span>Edições de 14/11/2026</span><span>5 jornais</span></div>' +
      '<div class="manchete" style="font-size:clamp(28px,4vw,40px)">O que cada jornal publicou</div>' +
      '<p class="linhafina">Trechos transcritos das páginas indicadas. Para citar na ficha, copie entre aspas e diga o jornal e a página.</p>' +
      cadernoHTML(false) + '<div class="acoes"><button class="btn sec" id="volta">Voltar</button></div>';
    document.getElementById("volta").onclick = function () { if (S.rodada) mostraItem(); else telaRedacao(); };
  }

  /* ---------------- etapa 4: placar ---------------- */
  function opcoes(lista, sel, vazio) { return '<option value="">' + esc(vazio) + '</option>' + lista.map(function (v, i) { var val = typeof v === "string" ? v : v.id, rot = typeof v === "string" ? v : v.nome; return '<option value="' + esc(val) + '"' + (sel === val ? ' selected' : '') + '>' + esc(rot) + '</option>'; }).join(""); }
  function blocoJornal(k, d) {
    d = d || {};
    return '<div class="box" style="margin-top:14px"><div class="tipo" style="--c:#8a6d3b">Jornal ' + "AB"[k] + '</div>' +
      '<label class="l">Jornal</label><select class="campo" data-k="' + k + '" data-c="jornal">' + opcoes(JORNAIS, d.jornal, "Escolha o jornal") + '</select>' +
      '<label class="l">Título ou linha fina sobre a causa (copie, entre aspas)</label><textarea class="curto" data-k="' + k + '" data-c="titulo">' + esc(d.titulo || "") + '</textarea>' +
      '<label class="l">O que o texto diz da causa (trecho entre aspas, com a página)</label><textarea class="curto" data-k="' + k + '" data-c="causa">' + esc(d.causa || "") + '</textarea>' +
      '<label class="l">De onde vem a certeza do título</label><select class="campo" data-k="' + k + '" data-c="origem">' + opcoes(ORIGENS, d.origem, "Escolha") + '</select>' +
      '<div class="duas"><div><label class="l">Fundamento 1: grau</label><select class="campo" data-k="' + k + '" data-c="g1">' + opcoes(GRAUS, d.g1, "Grau") + '</select>' +
      '<label class="l">Trecho que prova o grau no 1</label><textarea class="curto" data-k="' + k + '" data-c="t1">' + esc(d.t1 || "") + '</textarea></div>' +
      '<div><label class="l">Fundamento 7: grau</label><select class="campo" data-k="' + k + '" data-c="g7">' + opcoes(GRAUS, d.g7, "Grau") + '</select>' +
      '<label class="l">Trecho que prova o grau no 7</label><textarea class="curto" data-k="' + k + '" data-c="t7">' + esc(d.t7 || "") + '</textarea></div></div></div>';
  }
  function telaPlacar() {
    desenhaBarra(); topo();
    var rasc = S.placar || S.rascunhos.placar || [{}, {}];
    app.innerHTML = '<div class="topo-rodada"><div><div class="tipo" style="--c:#8a6d3b">Etapa 4 · vai para a ficha</div><div class="manchete" style="font-size:clamp(26px,4vw,38px);margin:4px 0">Placar da incerteza</div></div></div>' +
      '<p class="linhafina" style="font-size:18px">Escolha dois dos cinco jornais. Para cada um: o título, o que o texto diz da causa, de onde vem a certeza e o grau nos fundamentos 1 e 7, cada grau com o trecho que o prova. O caderno está logo abaixo.</p>' +
      '<div id="formplacar">' + blocoJornal(0, rasc[0]) + blocoJornal(1, rasc[1]) + '</div>' +
      '<div class="erro" id="erro"></div>' +
      '<div class="acoes"><button class="btn verm" id="entregar">' + (S.placar ? 'Salvar alterações' : 'Fechar o placar') + '</button><button class="btn sec" id="volta">Voltar à redação</button></div>' +
      '<h2 class="secao">Caderno de trechos</h2>' + cadernoHTML(true);
    function le() {
      var d = [{}, {}];
      document.querySelectorAll("#formplacar [data-k]").forEach(function (el) { d[+el.dataset.k][el.dataset.c] = el.value.trim(); });
      return d;
    }
    var tmr;
    document.getElementById("formplacar").addEventListener("input", function () { clearTimeout(tmr); tmr = setTimeout(function () { S.rascunhos.placar = le(); salvar(); }, 400); });
    document.getElementById("volta").onclick = function () { S.rascunhos.placar = le(); salvar(); telaRedacao(); };
    document.getElementById("entregar").onclick = function (ev) {
      var d = le(), er = document.getElementById("erro"), falta = [];
      if (!d[0].jornal || !d[1].jornal) falta.push("escolha os dois jornais");
      else if (d[0].jornal === d[1].jornal) falta.push("escolha dois jornais diferentes");
      ["titulo", "causa", "origem", "g1", "t1", "g7", "t7"].forEach(function (c) { if (!d[0][c] || !d[1][c]) falta.push("preencha todos os campos"); });
      if (falta.length) { er.textContent = "Falta: " + falta.filter(function (x, i, a) { return a.indexOf(x) === i; }).join("; ") + "."; return; }
      var semAspas = [0, 1].some(function (k) { return !temAspas(d[k].t1) || !temAspas(d[k].t7); });
      function fecha() {
        var primeira = !S.placar;
        S.placar = d; delete S.rascunhos.placar;
        if (primeira) ganha(30, ev.target);
        envia("placar", "Placar da incerteza", textoPlacar());
        salvar(); desenhaBarra(); toast("Placar fechado."); telaVeredicto();
      }
      if (semAspas) confirma("Algum trecho de grau está sem aspas. Pela régua, grau sem trecho citado não pontua. Fechar assim mesmo?", fecha); else fecha();
    };
  }
  function textoPlacar() {
    if (!S.placar) return "";
    return S.placar.map(function (d, k) {
      var j = porJornal[d.jornal];
      return "Jornal " + "AB"[k] + ": " + (j ? j.nome : d.jornal) +
        "\n  Título/linha fina: " + d.titulo + "\n  O que diz da causa: " + d.causa + "\n  De onde vem a certeza: " + d.origem +
        "\n  Fundamento 1: " + d.g1 + " · trecho: " + d.t1 + "\n  Fundamento 7: " + d.g7 + " · trecho: " + d.t7;
    }).join("\n\n");
  }

  /* ---------------- etapas 5 e 6: texto ---------------- */
  function resumoPlacar() {
    return '<div class="arquivo"><b class="sans" style="font-size:13px;letter-spacing:1px;text-transform:uppercase">Seu placar</b>' +
      S.placar.map(function (d) { var j = porJornal[d.jornal]; return '<div style="margin-top:6px"><b>' + esc(j ? j.curto : d.jornal) + '</b>: fundamento 1, ' + esc(d.g1) + '; fundamento 7, ' + esc(d.g7) + '.</div>'; }).join("") +
      '<div class="ref"><a href="#" id="editaplacar">Rever o placar</a></div></div>';
  }
  function telaTexto(cfg) {
    desenhaBarra(); topo();
    var chave = cfg.id, salvo = S[chave];
    app.innerHTML = '<div class="tipo" style="--c:' + cfg.cor + ';margin-top:18px">Etapa ' + cfg.n + ' · vai para a ficha</div>' +
      '<div class="manchete" style="font-size:clamp(26px,4vw,38px);margin:4px 0 10px">' + esc(cfg.titulo) + '</div>' +
      (cfg.antes || "") +
      '<div class="cartao" style="--c:' + cfg.cor + '"><div class="enun">' + esc(cfg.q) + '</div>' +
      '<textarea id="txt" placeholder="Escreva aqui. Pelo menos ' + cfg.min + ' palavras.">' + esc(salvo ? salvo.texto : (S.rascunhos[chave] || "")) + '</textarea><div class="contador" id="cont"></div>' +
      '<div class="acoes"><button class="btn verm" id="entregar" disabled>' + (salvo ? 'Salvar nova versão' : 'Entregar') + '</button><button class="btn sec" id="volta">Voltar à redação</button></div>' +
      '<p class="mini">O texto fica salvo enquanto você escreve.</p></div>' +
      '<h2 class="secao">Caderno de trechos</h2>' + cadernoHTML(true);
    var ta = document.getElementById("txt"), cont = document.getElementById("cont"), bt = document.getElementById("entregar");
    function atualiza() {
      var n = palavras(ta.value);
      cont.textContent = n + " palavra(s)" + (n < cfg.min ? " · faltam " + (cfg.min - n) + " para entregar" : " · pronto para entregar") + (temAspas(ta.value) ? "" : " · ainda sem trecho entre aspas");
      cont.className = "contador" + (n >= cfg.min ? " ok" : "");
      bt.disabled = n < cfg.min;
    }
    var tmr;
    ta.addEventListener("input", function () { atualiza(); clearTimeout(tmr); tmr = setTimeout(function () { S.rascunhos[chave] = ta.value; salvar(); }, 500); });
    atualiza();
    var ep = document.getElementById("editaplacar"); if (ep) ep.onclick = function (e) { e.preventDefault(); S.rascunhos[chave] = ta.value; salvar(); telaPlacar(); };
    document.getElementById("volta").onclick = function () { S.rascunhos[chave] = ta.value; salvar(); telaRedacao(); };
    bt.onclick = function () {
      function vai() {
        var primeira = !S[chave];
        S[chave] = { texto: ta.value.trim(), data: agora(), auto: S[chave] ? S[chave].auto : "" };
        delete S.rascunhos[chave];
        if (primeira) ganha(cfg.xp, bt);
        salvar(); desenhaBarra();
        autoavaliacao(cfg, function () { envia(chave, cfg.titulo, S[chave].texto + (S[chave].auto ? "\n(Autoavaliação: " + S[chave].auto + ")" : "")); salvar(); cfg.depois(); });
      }
      if (!temAspas(ta.value)) confirma("Seu texto não tem nenhum trecho entre aspas. Pela régua, sem trecho citado não pontua. Entregar assim mesmo?", vai); else vai();
    };
  }
  function autoavaliacao(cfg, depois) {
    topo();
    app.innerHTML = '<div class="cartao"><div class="carimbao">ENTREGUE</div><div class="tipo">Confira o que você escreveu</div>' +
      '<p>Marque o que o seu texto tem:</p><div class="checklist">' +
      cfg.guia.map(function (g, i) { return '<label><input type="checkbox" data-i="' + i + '"><span>' + esc(g) + '</span></label>'; }).join("") + '</div>' +
      '<details style="margin-top:12px"><summary class="mini" style="cursor:pointer">Ver o que eu escrevi</summary><div class="resp"><div class="t">' + esc(S[cfg.id].texto) + '</div></div></details>' +
      '<p class="mini">Se faltou algo, você pode voltar e salvar uma nova versão antes de entregar a ficha.</p>' +
      '<div class="acoes"><button class="btn" id="seg">Seguir</button></div></div>';
    document.getElementById("seg").onclick = function () {
      var marc = 0; app.querySelectorAll(".checklist input").forEach(function (c) { if (c.checked) marc++; });
      S[cfg.id].auto = marc + "/" + cfg.guia.length; salvar(); depois();
    };
  }
  function telaVeredicto() {
    if (!S.placar) { telaPlacar(); return; }
    telaTexto({ id: "veredicto", n: 5, titulo: "Veredicto", cor: "#1d1b18", q: VEREDICTO.q, min: VEREDICTO.min, guia: VEREDICTO.guia, xp: 40,
      antes: resumoPlacar(), depois: telaDepois });
  }
  function telaDepois() {
    if (!S.veredicto) { telaVeredicto(); return; }
    var antes = '<div class="box" style="border-left:6px solid var(--vermelho);margin-bottom:16px"><p style="margin-top:0"><b>' + esc(DEPOIS.intro) + '</b></p><ul class="lista">' +
      DEPOIS.itens.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("") + '</ul><p class="mini" style="margin-bottom:0">' + esc(DEPOIS.fontes) + '</p></div>';
    telaTexto({ id: "depois", n: 6, titulo: DEPOIS.titulo, cor: "#c0392b", q: DEPOIS.q, min: DEPOIS.min, guia: DEPOIS.guia, xp: 30,
      antes: antes, depois: telaFicha });
  }

  /* ---------------- envio e ficha ---------------- */
  function envia(tipo, etapa, texto) {
    var E = CONFIG.envio; if (!E || !E.acao) return;
    try {
      var c = E.campos, f = new URLSearchParams();
      f.append(c.email, S.email); f.append(c.nome, S.nome); f.append(c.ra, S.ra); f.append(c.tipo, tipo); f.append(c.etapa, etapa); f.append(c.resposta, texto);
      f.append(c.dados, JSON.stringify({ v: VERSAO, xp: S.xp, acertos: S.acertos, erros: S.erros, etapas: feitas(), data: agora() }));
      fetch(E.acao, { method: "POST", mode: "no-cors", body: f }).catch(function () {});
    } catch (e) {}
  }
  function textoFicha() {
    var l = ["A ESCALA DA INCERTEZA · ficha digital", "Fundamentos de Jornalismo · PUC-Campinas · Turma 0101 · 2026/2", "Caso: o apagão aéreo nos EUA nas edições de 14/11/2026",
      "Nome: " + S.nome, "RA: " + S.ra, "E-mail: " + S.email, "Gerada em: " + dataBR(agora()), "",
      "Treino (etapas 1 a 3): " + MESAS.map(function (m) { var e = S.mesas[m.id]; return m.nome + " " + (e ? e.melhor + "/" + m.itens.length : "não feita"); }).join(" · "),
      "XP: " + S.xp + " · acertos: " + S.acertos + " · erros: " + S.erros, "",
      "==== PLACAR DA INCERTEZA", S.placar ? textoPlacar() : "(não feito)", "",
      "==== VEREDICTO", S.veredicto ? S.veredicto.texto + (S.veredicto.auto ? "\n(Autoavaliação: " + S.veredicto.auto + ")" : "") : "(não feito)", "",
      "==== DEPOIS DO FECHAMENTO", "Pergunta: " + DEPOIS.q, "", S.depois ? S.depois.texto + (S.depois.auto ? "\n(Autoavaliação: " + S.depois.auto + ")" : "") : "(não feito)", ""];
    return l.join("\n");
  }
  function telaFicha() {
    desenhaBarra(); topo();
    var completa = !!(S.placar && S.veredicto && S.depois);
    var html = '<div class="dateline" style="margin-top:18px"><span>Minha ficha</span><span>' + feitas() + ' de 6 etapas</span><span>' + esc(S.email) + '</span></div>' +
      '<div class="manchete" style="font-size:clamp(28px,4vw,40px)">' + (completa ? 'Sua ficha está pronta' : 'Sua ficha, até aqui') + '</div>';
    if (!completa) html += '<div class="aviso"><b>Ainda falta:</b> ' + ["placar", "veredicto", "depois"].filter(function (x) { return !feita(x); }).map(function (x) { return EXTRAS[x].nome; }).join(", ") + '. A ficha só se entrega completa.</div>';
    else if (CONFIG.envio.acao) html += '<div class="aviso" style="border-color:var(--verde);background:#f1faf4"><b style="color:var(--verde)">Envio automático ligado.</b> Cada etapa escrita foi para o professor no momento em que você entregou. Os botões abaixo servem de cópia de segurança.</div>';
    else html += '<div class="aviso"><b>Como entregar:</b> clique em "Baixar ficha" e mande o arquivo ao professor do jeito indicado no Canvas, ou por e-mail para <b>' + esc(CONFIG.emailProfessor) + '</b>.</div>';
    html += '<div class="acoes"><button class="btn verm" id="baixar"' + (completa ? '' : ' disabled') + '>Baixar ficha</button><button class="btn" id="mail"' + (completa ? '' : ' disabled') + '>Abrir e-mail</button><button class="btn sec" id="copiar"' + (completa ? '' : ' disabled') + '>Copiar tudo</button></div>' +
      '<div class="resp"><div class="t">' + esc(textoFicha()) + '</div></div>' +
      '<div class="acoes"><button class="btn sec" id="volta">Voltar à redação</button></div>';
    app.innerHTML = html;
    document.getElementById("volta").onclick = telaRedacao;
    if (!completa) return;
    function marcaEntregue() { if (!S.entregue) { S.entregue = true; salvar(); desenhaBarra(); } }
    document.getElementById("baixar").onclick = function () {
      var blob = new Blob([textoFicha()], { type: "text/plain;charset=utf-8" });
      var a = document.createElement("a"); a.href = URL.createObjectURL(blob);
      a.download = "escala-da-incerteza-" + S.nome.split(/\s+/)[0].normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^\w-]/g, "") + "-" + S.ra + ".txt";
      document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
      marcaEntregue(); toast("Ficha baixada. Agora entregue o arquivo.");
    };
    document.getElementById("mail").onclick = function () {
      var corpo = textoFicha();
      if (corpo.length > 1700) corpo = "Professor, segue minha ficha da atividade A Escala da Incerteza em arquivo anexo (baixado na tela Minha ficha).\n\nNome: " + S.nome + "\nRA: " + S.ra;
      marcaEntregue();
      location.href = "mailto:" + CONFIG.emailProfessor + "?subject=" + encodeURIComponent("A Escala da Incerteza · ficha · " + S.nome + " · RA " + S.ra) + "&body=" + encodeURIComponent(corpo);
    };
    document.getElementById("copiar").onclick = function () {
      var t = textoFicha();
      (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(function () { toast("Copiado."); }, function () {
        var ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); toast("Copiado."); } catch (e) { toast("Não deu para copiar; use Baixar ficha."); } ta.remove();
      });
    };
  }

  /* ---------------- início ---------------- */
  telaCapa();
})();
