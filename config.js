/* =====================================================================
   Configuração da entrega da ficha.

   E-mail do professor: usado no botão "Abrir e-mail".

   Formulário Google (opcional): se preenchido, cada etapa escrita
   (placar, veredicto, depois do fechamento) vai sozinha para uma
   planilha assim que o aluno entrega. Para gerar estes códigos, rode
   o script criar_formulario.gs (instruções no próprio arquivo) e cole
   aqui o bloco que ele imprimir. Enquanto "acao" estiver vazio, a
   atividade usa só o arquivo baixado e o e-mail.
   ===================================================================== */
var CONFIG = {
  emailProfessor: "artur.araujo@puc-campinas.edu.br",
  envio: {
    acao: "",
    campos: { email: "", nome: "", ra: "", tipo: "", etapa: "", resposta: "", dados: "" }
  }
};
