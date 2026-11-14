# A Escala da Incerteza

Atividade digital de **Fundamentos de Jornalismo** (PUC-Campinas, Turma 0101, 2026/2), no mesmo desenho de O Fechamento. A entrega conta como ficha de oficina.

Caso: o apagão aéreo nos Estados Unidos de 13/11/2026 nas edições de 14/11 de cinco jornais (Estadão, O Globo, Correio Braziliense, Estado de Minas e Diário de Pernambuco). A pergunta é a da oficina de 04/11: o jornal está à altura dos fundamentos 1 (Veracidade e Apuração dos Fatos) e 7 (Transparência e Prestação de Contas) no modo como tratou aquilo que ainda não sabia?

- **Etapas 1 a 3, treino corrigido na hora:** o fato e os números; a fonte e o título; fato, versão ou interpretação.
- **Etapas 4 a 6, vão para a ficha:** placar da incerteza de dois jornais, veredicto com trecho e, depois do fechamento, a pergunta final.
- **Caderno de trechos** sempre à mão, com veículo e página.
- O progresso fica salvo no navegador do aluno, pelo e-mail.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | página e visual |
| `jogo.js` | lógica da atividade |
| `dados.js` | todo o conteúdo: trechos, questões, etapas escritas |
| `config.js` | e-mail do professor e envio automático (opcional) |
| `criar_formulario.gs` | script para criar o Formulário Google que recebe as fichas |
| `resumo_diario.gs` | script da planilha de respostas que manda o resumo diário por e-mail |

## Como as fichas chegam ao professor

O envio automático está ligado. Cada etapa escrita (placar, veredicto, depois do fechamento) e a ficha completa vão, no momento da entrega, para o Formulário Google "A Escala da Incerteza · fichas (Fundamentos 2026/2)", na conta do professor. O aluno não precisa mandar nada. Os envios ficam numa fila salva no navegador: se a conexão falhar, a atividade tenta de novo ao abrir a página, ao voltar a conexão e a cada minuto, e a tela "Minha ficha" mostra se há envio pendente. O botão de baixar cópia continua como segurança.

O formulário grava tudo na planilha "A Escala da Incerteza · fichas dos alunos (Fundamentos 2026/2)", na conta araujofamilia@gmail.com, que é o backup completo. O script `resumo_diario.gs`, ligado a essa planilha (Extensões > Apps Script), manda uma vez por dia, de madrugada (entre 3h e 4h), um e-mail com os envios novos agrupados por aluno para os endereços da PUC e da Prefeitura do professor. Dia sem envio novo não gera e-mail.

Para trocar de formulário, rode `criar_formulario.gs` em script.google.com e cole no `config.js` o bloco que ele imprime. Se o bloco `envio` ficar com `acao` vazio, a atividade volta a usar só o arquivo baixado e o e-mail.

## Publicar no GitHub Pages

Settings > Pages > Source: "Deploy from a branch", branch `main`, pasta `/ (root)`.

Endereço: https://araujofamilia.github.io/escala-da-incerteza/
