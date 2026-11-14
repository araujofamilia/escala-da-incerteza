/* =====================================================================
   A ESCALA DA INCERTEZA: o plantão do apagão aéreo
   Conteúdo da atividade. Fundamentos de Jornalismo, PUC-Campinas, 2026/2.
   Todos os trechos são reais, transcritos das edições de 14/11/2026
   (Diário de Pernambuco e Estado de Minas: edição de fim de semana,
   14 e 15/11), com veículo e página. Uso didático.
   ===================================================================== */

var FUNDAMENTOS = {
  f1: { n: 1, nome: "Veracidade e Apuração dos Fatos", texto: "O compromisso com a verdade exige verificação rigorosa, consulta a múltiplas fontes e resistência a pressões externas." },
  f7: { n: 7, nome: "Transparência e Prestação de Contas", texto: "O jornalista deve admitir erros, esclarecer procedimentos e se responsabilizar pelas informações publicadas." }
};

var CASO = {
  titulo: "Os aviões pararam. A causa, ninguém sabia. E os jornais?",
  linhafina: "Na sexta-feira, 13 de novembro de 2026, a agência de aviação dos Estados Unidos mandou parar todas as decolagens do país. Os jornais brasileiros de sábado fecharam a edição com a causa em aberto. Sua tarefa: medir, jornal por jornal, como cada um tratou aquilo que ainda não sabia.",
  contexto: [
    "Pouco antes das 16h em Washington (18h em Brasília) de sexta-feira, 13/11, a FAA, agência federal de aviação dos Estados Unidos, suspendeu as decolagens em todos os aeroportos do país, alegando “circunstâncias extraordinárias” e razões de segurança. A ordem durou pouco mais de quatro horas e atrasou ou cancelou milhares de voos, com reflexo no Brasil.",
    "As autoridades falaram em falha nas telecomunicações e disseram não ter indícios de ataque, com ressalvas: “até o momento”, “por ora”, “relatórios preliminares”. A pergunta desta atividade é a mesma da oficina de 04/11: este jornal está à altura dos fundamentos 1 e 7 no modo como tratou aquilo que ainda não sabia?"
  ]
};

var JORNAIS = [
  { id: "estadao", nome: "O Estado de S. Paulo", curto: "Estadão", data: "sábado, 14/11/2026", trechos: [
    { onde: "Capa, chamada", txt: "Apagão aéreo nos EUA deixa milhões no chão" },
    { onde: "A14, título", txt: "Apagão aéreo paralisa EUA, afeta 15 mil voos e milhões de passageiros" },
    { onde: "A14, linha fina", txt: "Autoridades americanas interrompem operações em todos os aeroportos do país por 4 horas, descartam ciberataque e atribuem problema a ‘equipamento sobrecarregado’" },
    { onde: "A14, abertura", txt: "A Administração Federal de Aviação dos EUA (FAA, na sigla em inglês) paralisou ontem por quatro horas todas as operações aéreas do país, provocando atraso ou cancelamento de mais de 15 mil voos e afetando a vida de milhões de passageiros." },
    { onde: "A14", txt: "Markwayne Mullin, secretário de Segurança Interna, atribuiu o apagão a uma “falha de telecomunicação”, mas não soube explicar o que era." },
    { onde: "A14", txt: "Sean Duffy, secretário de Transportes, confirmou a falha, mencionando “uma rede que saiu do ar” e um “equipamento velho que sobrecarregou”." },
    { onde: "A14", txt: "Questionado se ele tinha 100% de certeza que não seria um ataque hacker ou uma inteligência artificial fora de controle, Duffy foi vago. “Não há nada certo no momento.”" },
    { onde: "A14", txt: "Relatos operacionais apontaram que a pane teria começado no centro de controle de Kansas City e se espalhado pela rede nacional." },
    { onde: "A14", txt: "Por volta das 16h45, mais de 8 mil voos já estavam atrasados nos EUA e 1.000 haviam sido cancelados, segundo o FlightAware, site de rastreamento." },
    { onde: "A14, crédito do texto", txt: "NYT (texto do The New York Times)" }
  ]},
  { id: "globo", nome: "O Globo", curto: "O Globo", data: "sábado, 14/11/2026", trechos: [
    { onde: "Capa, título", txt: "Pane nos centros de controle de tráfego cancela decolagens e gera caos nos EUA" },
    { onde: "Capa, linha fina", txt: "Em quatro horas e meia, mais de 15 mil voos foram suspensos ou atrasados, com impacto global. Governo aponta falha na comunicação" },
    { onde: "Capa, texto", txt: "O secretário de Segurança Interna, Markwayne Mullin, afirmou que não há indícios de ataque criminoso ou terrorista: “Não é outro 11 de Setembro”." },
    { onde: "Página 17, título", txt: "Pane nas telecomunicações leva à suspensão geral de voos nos EUA, criando caos nos aeroportos" },
    { onde: "Página 17", txt: "A paralisação começou pouco antes das 16h (18h em Brasília)" },
    { onde: "Página 17", txt: "Por volta de 20h (22h em Brasília), dez mil voos já estavam atrasados e cinco mil haviam sido cancelados nos EUA" },
    { onde: "Página 17, sob o intertítulo “Causa desconhecida”", txt: "O problema foi causado por uma falha no sistema de controle de tráfego aéreo envolvendo roteadores de rede, segundo a CNN. Até a noite de ontem o problema não tinha causa conhecida, mas as autoridades descartaram que tenha sido uma ameaça contra o país ou algo relacionado à interrupção do serviço da Microsoft na véspera." },
    { onde: "Página 17, fala de Markwayne Mullin", txt: "“Não há indícios, até o momento, de que se trate de um ataque malicioso contra nós.” (...) “É apenas uma falha nas telecomunicações.”" },
    { onde: "Página 17", txt: "Ele acrescentou, porém, que ainda não se conhece a causa da falha e que “levará algum tempo” para retomar as operações aeroportuárias." },
    { onde: "Página 17", txt: "A FAA vem implementando um novo modelo de IA em seu sistema, mas ainda não está claro se isso contribui para o problema." },
    { onde: "Página 17, crédito", txt: "Com AFP e New York Times" }
  ]},
  { id: "cb", nome: "Correio Braziliense", curto: "Correio Braziliense", data: "sábado, 14/11/2026", trechos: [
    { onde: "Capa, manchete", txt: "Falha no sistema trava voos e provoca caos aéreo nos EUA" },
    { onde: "Capa, linha fina", txt: "Pane no controle de tráfego atingiu 13 mil aeronaves e causou a maior paralisação no transporte por aviões nos Estados Unidos desde o 11 de setembro de 2001. Autoridades negaram “ataque cibernético”" },
    { onde: "Capa, texto", txt: "As autoridades norte-americanas atribuíram o problema a falhas nos sistemas de comunicação e descartaram invasões cibernéticas e ameaças ao país, mas prometeram ampliar as investigações." },
    { onde: "Página 9", txt: "Mais de 13 mil voos foram cancelados ou adiados" },
    { onde: "Página 9", txt: "O secretário de Segurança Interna, Markwayne Mullin, informou que, segundo “relatórios preliminares”, o governo “não tinha indícios” de que a emergência tenha sido causada por um ataque cibernético." },
    { onde: "Página 9", txt: "Até o fechamento desta edição, a FAA não tinha previsão para a normalização do tráfego" },
    { onde: "Página 9, segundo fontes do setor de aviação ouvidas pela CNN", txt: "os problemas “teriam atingido os radares de controle de tráfego e a superposição de frequências de comunicação por rádio”" }
  ]},
  { id: "em", nome: "Estado de Minas", curto: "Estado de Minas", data: "fim de semana, 14 e 15/11/2026", trechos: [
    { onde: "Mundo, título", txt: "EUA suspendem voos por falhas na comunicação" },
    { onde: "Mundo, linha fina", txt: "Agência determinou que aviões que partiriam de aeroportos norte-americanos permanecessem em solo até segunda ordem. Onze mil voos foram afetados por cruzamento de frequências de rádio" },
    { onde: "Mundo", txt: "A imprensa norte-americana afirmou que não houve indícios de ataque cibernético e o problema seria cruzamento de frequências de rádio." },
    { onde: "Mundo", txt: "Segundo dados do site de monitoramento FlightAware, quase 11 mil voos nos EUA foram atrasados ou cancelados." },
    { onde: "Mundo", txt: "O secretário de Segurança Interna dos EUA, Markwayne Mullin, (...) descartou um possível ataque virtual ou terrorista." },
    { onde: "Mundo, fala de Markwayne Mullin", txt: "“Até agora, não há sinal de que se trate de um ataque contra nós. Trata-se, por ora, apenas de uma falha nas telecomunicações. Isso levará algum tempo para ser resolvido”" }
  ]},
  { id: "dp", nome: "Diário de Pernambuco", curto: "Diário de Pernambuco", data: "fim de semana, 14 e 15/11/2026", trechos: [
    { onde: "Capa, título", txt: "EUA suspendem voos por falha na comunicação" },
    { onde: "Capa, linha fina", txt: "Decisão paralisou todas as decolagens no país e gerou caos nos aeroportos. Governo nega ataque." },
    { onde: "Radar, página 20", txt: "(...) o Departamento de Segurança Interna descartou a possibilidade de se tratar de um “ataque malicioso” contra o país." },
    { onde: "Radar, página 20, fala de Markwayne Mullin", txt: "“Até o momento, não há indícios de que se trate de um ataque malicioso contra nós. É apenas uma falha nas telecomunicações, por enquanto”" },
    { onde: "Radar, página 20, crédito", txt: "(AFP)" }
  ]}
];

/* ---------- mesas de escolha (corrigidas na hora) ---------- */
var OPS_FVI = ["Fato verificado", "Versão (de envolvido ou de fonte)", "Interpretação do jornal"];

var MESAS = [
  { id: "fato", n: 1, nome: "O fato e os números", cor: "#5b7c99", simbolo: "◷",
    intro: "Antes de julgar a dúvida, separe o que estava firme do que ainda se mexia.",
    itens: [
      { q: "Qual destes dados os cinco jornais tratam do mesmo jeito, sem divergência, e pode entrar na ficha como fato verificado?",
        ops: ["A causa da pane.", "Que a FAA suspendeu as decolagens em todo o país na tarde de 13/11, alegando circunstâncias extraordinárias e razões de segurança.", "O número exato de voos afetados.", "Que foi a maior paralisação desde 11 de setembro de 2001."], c: 1,
        exp: "A ordem da FAA tem documento (o comunicado) e aparece igual em todos os jornais: é fato. A causa estava em aberto, os números mudavam com a hora, e “a maior paralisação desde 2001” é comparação do Correio Braziliense, que pede conferência." },
      { q: "Os jornais dão números diferentes de voos afetados. O que mais explica a diferença?",
        recortes: [
          { fonte: "Estadão, A14, título", txt: "Apagão aéreo paralisa EUA, afeta 15 mil voos e milhões de passageiros" },
          { fonte: "Correio Braziliense, capa", txt: "Pane no controle de tráfego atingiu 13 mil aeronaves (...)" },
          { fonte: "Estado de Minas, Mundo", txt: "Segundo dados do site de monitoramento FlightAware, quase 11 mil voos nos EUA foram atrasados ou cancelados." },
          { fonte: "O Globo, página 17", txt: "Por volta de 20h (22h em Brasília), dez mil voos já estavam atrasados e cinco mil haviam sido cancelados nos EUA" }
        ],
        ops: ["Algum jornal inventou o número.", "A contagem mudava ao longo da noite, e cada jornal fotografou um momento e uma fonte diferentes.", "Os jornais brasileiros traduziram mal os números americanos.", "A FAA divulgou um número oficial diferente para cada jornal."], c: 1,
        exp: "Número de evento em andamento é a fotografia de um momento. Repare em quem diz a hora e a fonte: O Globo dá a hora (“por volta de 20h”), o Estado de Minas cita o FlightAware. O Estadão põe 15 mil no título sem fonte nem hora; no texto, registra 8 mil atrasos e mil cancelamentos às 16h45, segundo o FlightAware. Dizer de onde e de quando é o número é fundamento 7." },
      { q: "Para que serve esta frase do Correio Braziliense?",
        recortes: [ { fonte: "Correio Braziliense, página 9", txt: "Até o fechamento desta edição, a FAA não tinha previsão para a normalização do tráfego" } ],
        ops: ["Para justificar um erro do jornal.", "Para dizer ao leitor até que hora vai o que o jornal sabe: o limite da apuração.", "Para criticar a FAA.", "Para preencher espaço na página."], c: 1,
        exp: "“Até o fechamento desta edição” marca o limite do que o jornal sabia quando a página foi para a gráfica. A suspensão caiu por volta das 20h15 em Washington (22h15 em Brasília); a frase impede o leitor de tomar por definitivo o que era provisório. É o fundamento 7 em uma linha: esclarecer o procedimento." }
    ] },
  { id: "titulo", n: 2, nome: "A fonte e o título", cor: "#b5523b", simbolo: "❝",
    intro: "A fonte falou com ressalvas: “até o momento”, “por ora”, “relatórios preliminares”. A pergunta desta mesa: o título guardou a ressalva?",
    itens: [
      { q: "No Estadão, a linha fina diz mais, o mesmo ou menos do que o texto da mesma página sustenta?",
        recortes: [
          { fonte: "Estadão, A14, linha fina", txt: "Autoridades americanas interrompem operações em todos os aeroportos do país por 4 horas, descartam ciberataque e atribuem problema a ‘equipamento sobrecarregado’" },
          { fonte: "Estadão, A14, texto", txt: "Questionado se ele tinha 100% de certeza que não seria um ataque hacker ou uma inteligência artificial fora de controle, Duffy foi vago. “Não há nada certo no momento.”" }
        ],
        ops: ["O mesmo: o texto confirma que o ciberataque foi descartado.", "Mais: o texto registra que a autoridade disse que nada era certo, e a linha fina transformou isso em “descartam”.", "Menos: a linha fina foi cautelosa demais."], c: 1,
        exp: "“Descartar” fecha a questão; o texto mostra que ela estava aberta. Quem lê só a linha fina sai com uma certeza que a apuração não tinha: problema de fundamento 1. O texto, que conta a resposta vaga do secretário, cumpre o 7." },
      { q: "Que palavra da página interna do Correio Braziliense sumiu na capa e mudou o grau de certeza?",
        recortes: [
          { fonte: "Correio Braziliense, capa", txt: "Autoridades negaram “ataque cibernético”" },
          { fonte: "Correio Braziliense, página 9", txt: "O secretário de Segurança Interna, Markwayne Mullin, informou que, segundo “relatórios preliminares”, o governo “não tinha indícios” de que a emergência tenha sido causada por um ataque cibernético." }
        ],
        ops: ["“Preliminares”, e com ela a ideia de que a conclusão era provisória.", "“Secretário”, porque a capa não diz quem falou.", "“Emergência”.", "Nenhuma: a capa resume com fidelidade."], c: 0,
        exp: "Não ter indícios, segundo relatórios preliminares, é diferente de negar. Negar é afirmar que não houve; não ter indício é dizer que, até ali, nada apareceu. A página interna guardou a ressalva entre aspas; a capa a perdeu." },
      { q: "O que aconteceu entre o texto e a linha fina do Estado de Minas?",
        recortes: [
          { fonte: "Estado de Minas, Mundo, linha fina", txt: "Onze mil voos foram afetados por cruzamento de frequências de rádio" },
          { fonte: "Estado de Minas, Mundo, texto", txt: "A imprensa norte-americana afirmou que não houve indícios de ataque cibernético e o problema seria cruzamento de frequências de rádio." }
        ],
        ops: ["O “seria” sumiu, e uma hipótese atribuída à imprensa americana virou causa afirmada.", "A linha fina corrigiu o texto com informação nova.", "Nada: “seria” e “foram afetados por” dizem a mesma coisa."], c: 0,
        exp: "O futuro do pretérito (“seria”) é o jornal avisando que a informação vem de terceiros e não está confirmada. Na linha fina, a hipótese virou causa. Até a manhã de sábado, a causa não estava confirmada pelas autoridades." },
      { q: "Como ler estas duas frases de O Globo, uma logo depois da outra, sob o intertítulo “Causa desconhecida”?",
        recortes: [ { fonte: "O Globo, página 17", txt: "O problema foi causado por uma falha no sistema de controle de tráfego aéreo envolvendo roteadores de rede, segundo a CNN. Até a noite de ontem o problema não tinha causa conhecida (...)" } ],
        ops: ["Contradição sem saída: o jornal errou.", "O jornal separa a versão da CNN, com a fonte dita, do que as autoridades tinham confirmado (nada). Mas o verbo no indicativo (“foi causado”) dá à versão cara de fato logo antes de o jornal dizer que a causa era desconhecida.", "A CNN é fonte oficial do governo americano, então a primeira frase vale como confirmação."], c: 1,
        exp: "Atribuir (“segundo a CNN”) é fundamento 7: o leitor sabe de onde veio. O tropeço é o modo verbal: “teria sido causado” guardaria a coerência com o intertítulo. Repare que o próprio jornal escolheu destacar “Causa desconhecida”: no conjunto, O Globo foi dos mais claros sobre o limite do que se sabia." }
    ] },
  { id: "fvi", n: 3, nome: "Fato, versão ou interpretação", cor: "#6b8f4e", simbolo: "▤",
    intro: "A mesma divisão da ficha de papel. Para cada trecho, decida o que ele é.",
    itens: [
      { q: "O que é este trecho?", recortes: [ { fonte: "O Globo, página 17", txt: "A paralisação começou pouco antes das 16h (18h em Brasília)" } ], ops: OPS_FVI, c: 0,
        exp: "Fato verificado: hora registrada pela própria FAA e pelos sites de rastreamento, igual em todos os jornais." },
      { q: "O que é este trecho?", recortes: [ { fonte: "O Globo, página 17, fala de Markwayne Mullin", txt: "“Não há indícios, até o momento, de que se trate de um ataque malicioso contra nós.”" } ], ops: OPS_FVI, c: 1,
        exp: "Versão de envolvido: é o que a autoridade diz, com a ressalva de tempo (“até o momento”). Que ele disse isso é fato; que não houve ataque, ainda não era." },
      { q: "O que é este trecho?", recortes: [ { fonte: "Diário de Pernambuco, capa", txt: "Governo nega ataque." } ], ops: OPS_FVI, c: 2,
        exp: "Interpretação do jornal: resume a fala da autoridade com um verbo mais forte que o dela. Mullin disse que não havia indícios “até o momento”; “nega” transforma a ressalva em afirmação." },
      { q: "O que é este trecho?", recortes: [ { fonte: "Estadão, A14", txt: "Relatos operacionais apontaram que a pane teria começado no centro de controle de Kansas City e se espalhado pela rede nacional." } ], ops: OPS_FVI, c: 1,
        exp: "Versão de fontes não nomeadas (“relatos operacionais”), sinalizada pelo condicional “teria começado”. O jornal registra sem afirmar: é o uso certo do futuro do pretérito." },
      { q: "O que é este trecho?", recortes: [ { fonte: "O Globo, página 17", txt: "A FAA vem implementando um novo modelo de IA em seu sistema, mas ainda não está claro se isso contribui para o problema." } ], ops: OPS_FVI, c: 0,
        exp: "Fato verificado (a FAA está implantando um sistema novo), com o limite do que se sabe declarado na mesma frase. É o melhor dos mundos: informa e diz onde a informação acaba." },
      { q: "O que é este trecho?", recortes: [ { fonte: "Correio Braziliense, capa", txt: "(...) causou a maior paralisação no transporte por aviões nos Estados Unidos desde o 11 de setembro de 2001." } ], ops: OPS_FVI, c: 2,
        exp: "Interpretação do jornal: uma comparação histórica. Na página 9, o Correio dá o número de 2023 (mais de 10 mil voos afetados) para sustentar a comparação, mas o critério de “maior” (voos? horas? passageiros?) é escolha do jornal. Pode estar certa; ainda assim é juízo, e pede conferência antes de virar fato." }
    ] }
];

/* ---------- etapas escritas (vão para o professor) ---------- */
var ORIGENS = [
  "Fonte oficial, com a ressalva dela (“até o momento”, “preliminares”)",
  "Fonte oficial, sem a ressalva",
  "Imprensa americana ou fontes não nomeadas",
  "O próprio jornal, sem fonte dita"
];
var GRAUS = ["Cumpre", "Parcial", "Não cumpre"];

var VEREDICTO = {
  q: "Veredicto, de 2 a 4 linhas: cada um dos dois jornais do seu placar está à altura dos fundamentos 1 e 7 no modo como tratou o que ainda não sabia? Os graus têm de ser os mesmos do placar. Veredicto sem trecho citado não pontua.",
  min: 40,
  guia: ["Dei um grau para o fundamento 1 e outro para o 7, em cada jornal, iguais aos do placar.",
         "Citei pelo menos um trecho entre aspas, dizendo de qual jornal.",
         "Comparei o título ou a capa com o texto da página interna.",
         "Separei o que a fonte disse do que o jornal escreveu."]
};

var DEPOIS = {
  titulo: "Depois do fechamento",
  intro: "O que se sabia na manhã de sábado, 14/11, quando os jornais já estavam nas bancas:",
  itens: [
    "A causa ainda não estava confirmada. A FAA falava em “interrupção temporária das telecomunicações” e dizia que seus técnicos investigavam.",
    "Autoridades ouvidas pela NBC disseram não ver sinal de atividade maliciosa, mas avisaram que a investigação estava no começo e que as conclusões podiam mudar.",
    "O secretário de Transportes, Sean Duffy, disse que switches e roteadores “ficaram sobrecarregados de dados”. Investigadores examinavam se uma atualização de software poderia ter sido a responsável (Al Jazeera, citando a Bloomberg).",
    "A suspensão foi das 15h54 às 20h15, horário de Washington: 4 horas e 21 minutos. Segundo o FlightAware, mais de 10 mil voos atrasaram e pelo menos 4 mil foram cancelados."
  ],
  fontes: "Fontes: comunicado da FAA (13/11/2026), NBC Chicago (13/11/2026) e Al Jazeera (atualizada em 14/11/2026).",
  q: "Nenhum dos cinco jornais errou a direção: até a manhã de sábado, nada indicava ataque. Mesmo assim, “descartam”, “negaram” e “Governo nega ataque” disseram mais do que as autoridades disseram. Acertar a direção basta para cumprir o fundamento 1? Responda com um trecho do caderno. (Na oficina de 04/11, sobre a saída de Flávio Bolsonaro, quem cravou a rota errou; aqui, a aposta deu certo. O grau muda por isso?)",
  min: 30,
  guia: ["Respondi sim ou não, com a razão.",
         "Usei um trecho do caderno, com o jornal.",
         "Separei acertar o resultado de ter apuração para afirmar."]
};

var NIVEIS = [
  { xp: 0, nome: "Foca" }, { xp: 60, nome: "Repórter" }, { xp: 130, nome: "Subeditor" },
  { xp: 200, nome: "Editor de fechamento" }, { xp: 270, nome: "Ombudsman" }
];
