/* =====================================================================
   Configuração da entrega da ficha.

   E-mail do professor: usado no botão "Abrir e-mail".

   Formulário Google: cada etapa escrita (placar, veredicto, depois do
   fechamento) e a ficha completa vão sozinhas para a planilha do
   professor assim que o aluno entrega; se a conexão falhar, a
   atividade tenta de novo até conseguir. Para gerar estes códigos, rode
   o script criar_formulario.gs (instruções no próprio arquivo) e cole
   aqui o bloco que ele imprimir. Enquanto "acao" estiver vazio, a
   atividade usa só o arquivo baixado e o e-mail.
   ===================================================================== */
var CONFIG = {
  emailProfessor: "artur.araujo@puc-campinas.edu.br",
  envio: {
    acao: "https://docs.google.com/forms/d/e/1FAIpQLSdEIljhgLLuzdTfGJIJ9pK9nmCJkCwNdzVC9cPgPaWFoplliQ/formResponse",
    campos: { email: "entry.1396551667", nome: "entry.288887352", tipo: "entry.3711487", resposta: "entry.689727586", dados: "entry.1285380116" }
  }
};
