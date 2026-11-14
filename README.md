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

## Como as fichas chegam ao professor

Enquanto o bloco `envio` do `config.js` estiver com `acao` vazio, o aluno baixa a ficha (arquivo .txt) e entrega como o professor indicar, ou manda por e-mail. Para ligar o envio automático, rode `criar_formulario.gs` em script.google.com e cole no `config.js` o bloco que ele imprime.

## Publicar no GitHub Pages

Settings > Pages > Source: "Deploy from a branch", branch `main`, pasta `/ (root)`.

Endereço: https://araujofamilia.github.io/escala-da-incerteza/
