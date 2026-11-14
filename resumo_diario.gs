/**
 * A Escala da Incerteza: resumo diário das fichas por e-mail.
 *
 * Fica ligado à planilha "A Escala da Incerteza · fichas dos alunos
 * (Fundamentos 2026/2)" (Extensões > Apps Script). Uma vez por dia, de madrugada
 * (entre 3h e 4h), manda numa só mensagem o que entrou desde o último resumo, agrupado por
 * aluno. Dia sem envio novo não gera e-mail. A planilha continua sendo o
 * backup completo, na conta araujofamilia@gmail.com.
 *
 * Para ligar: rode a função instalar() uma vez e autorize.
 * Para testar sem esperar o dia seguinte: rode resumoDiario() ou testeEnvio().
 */
var DESTINOS = "artur.araujo@puc-campinas.edu.br,artur.araujo@campinas.sp.gov.br";

function abaRespostas_() {
  var abas = SpreadsheetApp.getActive().getSheets();
  for (var i = 0; i < abas.length; i++) if (abas[i].getFormUrl()) return abas[i];
  return abas[0];
}

function instalar() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === "resumoDiario") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("resumoDiario").timeBased().everyDays(1).atHour(3).create();
  var p = PropertiesService.getScriptProperties();
  if (!p.getProperty("ultimaLinha")) p.setProperty("ultimaLinha", String(Math.max(1, abaRespostas_().getLastRow())));
  Logger.log("Resumo diário ligado para " + DESTINOS + " (todo dia entre 3h e 4h da madrugada).");
}

function resumoDiario() {
  var aba = abaRespostas_();
  var p = PropertiesService.getScriptProperties();
  var ultima = Number(p.getProperty("ultimaLinha") || 1);
  var total = aba.getLastRow();
  if (total <= ultima) { Logger.log("Nenhuma ficha nova."); return; }
  var ncol = aba.getLastColumn();
  var cab = aba.getRange(1, 1, 1, ncol).getValues()[0];
  var col = function (trecho) {
    for (var i = 0; i < cab.length; i++) if (String(cab[i]).toLowerCase().indexOf(trecho) >= 0) return i;
    return -1;
  };
  var cData = 0, cEmail = col("mail"), cNome = col("nome"), cTipo = col("tipo"),
      cResp = col("resposta"), cDados = col("dados");
  var tz = Session.getScriptTimeZone();
  var linhas = aba.getRange(ultima + 1, 1, total - ultima, ncol).getValues();
  var get = function (l, c) { return c >= 0 ? String(l[c] == null ? "" : l[c]).trim() : ""; };

  var porAluno = {}, nomes = {};
  linhas.forEach(function (l) {
    var em = get(l, cEmail).toLowerCase() || "(sem e-mail)";
    (porAluno[em] = porAluno[em] || []).push(l);
    if (get(l, cNome)) nomes[em] = get(l, cNome);
  });
  var alunos = Object.keys(porAluno).sort(function (a, b) {
    return (nomes[a] || a).localeCompare(nomes[b] || b);
  });
  var completas = 0;

  var hoje = Utilities.formatDate(new Date(), tz, "dd/MM/yyyy");
  var txt = ["A ESCALA DA INCERTEZA · resumo das fichas · " + hoje,
    linhas.length + " envio(s) novo(s) de " + alunos.length + " aluno(s), desde o último resumo.",
    "A planilha com tudo continua na conta araujofamilia@gmail.com: " + SpreadsheetApp.getActive().getUrl(), ""];
  alunos.forEach(function (em) {
    txt.push("################################################################");
    txt.push("ALUNO: " + (nomes[em] || "(sem nome)") + " · " + em + " · " + porAluno[em].length + " envio(s)");
    txt.push("");
    porAluno[em].forEach(function (l, i) {
      var quando = l[cData] instanceof Date ? Utilities.formatDate(l[cData], tz, "dd/MM HH:mm") : get(l, cData);
      var info = "", etapa = "";
      try {
        var d = JSON.parse(get(l, cDados) || "{}");
        etapa = d.etapa || "";
        info = "XP " + (d.xp || 0) + " · acertos " + (d.acertos || 0) + " · erros " + (d.erros || 0) +
          " · etapas feitas: " + ((d.etapas || []).join(", ") || "nenhuma") +
          (d.tentativa > 1 ? " · enviado na tentativa " + d.tentativa : "");
      } catch (e) { info = get(l, cDados); }
      if (get(l, cTipo).toLowerCase() === "ficha") completas++;
      txt.push("==== " + (i + 1) + ". " + get(l, cTipo).toUpperCase() + (etapa ? " · " + etapa : "") + " · " + quando);
      txt.push("");
      txt.push(get(l, cResp));
      txt.push("");
      if (info) txt.push("(" + info + ")");
      txt.push("");
    });
  });
  if (completas) txt.splice(2, 0, completas + " ficha(s) completa(s) neste resumo.");

  MailApp.sendEmail({
    to: DESTINOS,
    subject: "A Escala da Incerteza · " + linhas.length + " envio(s) novo(s) · " + hoje,
    body: txt.join("\n")
  });
  p.setProperty("ultimaLinha", String(total));
  Logger.log("Resumo enviado: " + linhas.length + " envio(s).");
}

function testeEnvio() {
  MailApp.sendEmail(DESTINOS, "A Escala da Incerteza · teste do resumo diário",
    "Teste do resumo diário da atividade A Escala da Incerteza (Fundamentos de Jornalismo).\n\n" +
    "Uma vez por dia, de madrugada (entre 3h e 4h, horário de Brasília), chega aqui um e-mail com as fichas e etapas novas dos alunos, " +
    "agrupadas por aluno. Dia sem envio novo não gera e-mail.\n\n" +
    "A planilha com tudo fica na conta araujofamilia@gmail.com: " + SpreadsheetApp.getActive().getUrl());
}
