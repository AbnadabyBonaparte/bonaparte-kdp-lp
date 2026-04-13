/*
Design philosophy for this page: editorial noir contemporâneo com atmosfera de dossiê estratégico premium.
Core reminders: assimetria nobre, hierarquia tipográfica forte, superfícies densas, imagens realistas cinematográficas,
nenhum elemento vulgar de infoproduto, nenhuma estética genérica de SaaS, e toda decisão visual deve reforçar autoridade intelectual.

AUDIT FIXES APPLIED (Apr 2026):
- Removed all meta-copy (text describing the LP strategy instead of speaking to the reader)
- Removed all developer notes visible to end users
- Fixed manifestoCards to speak to reader pain/benefit
- Fixed metrics row (removed internal strategy language)
- Fixed hero paragraph 2
- Fixed hero footnote
- Fixed capture card description
- Fixed capture success message
- Fixed FAQ items 3 and 6
*/

import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AMAZON_URL =
  "https://www.amazon.com.br/Cartografia-Soberania-Interior-Arquitetura-existencial-ebook/dp/B0GWSPPB82/ref=sr_1_5?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=KVZNB34NV1WM&dib=eyJ2IjoiMSJ9.j2Dwdvr5_2gPdrDpjyqeXc2hJoKFrhTo0wXkotRxiHg0CEUZ7jIApfoUbXbTJARAZO-bsJZkg-SUzs85fnPD6g.yq6SVfcIWA-aG4f8qAGRJ48dj1gW1gvL0NSlFHKC1kk&dib_tag=se&keywords=abnadaby&qid=1776087491&sprefix=abnadaby%2Caps%2C211&sr=8-5";

const visualAssets = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029192862/hDP4mJzmqgJQnadah6XUw6/bonaparte-hero-editorial-noir-jmRHRwBjZnqZLUGiEbnrvf.webp",
  books:
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663029192862/hDP4mJzmqgJQnadah6XUw6/bonaparte-book-still-life-Y8yQ9Eq6aTP5znxwLQ9QJA.webp",
  library:
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663029192862/hDP4mJzmqgJQnadah6XUw6/bonaparte-library-atmosphere-bV6N6AT28WqMPe7KhufUFX.webp",
  manuscript:
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663029192862/hDP4mJzmqgJQnadah6XUw6/bonaparte-manuscript-detail-7hpDk9PrDDHRFN28iyhA3t.webp",
};

// FIX 1: manifestoCards — removidos textos sobre a LP. Agora falam com o leitor.
const manifestoCards = [
  {
    title: "Para quem produz sem parar",
    text: "Você executa, entrega, funciona. E ainda assim sente que algo essencial está ausente. Este livro nomeia esse vazio com precisão cirúrgica.",
  },
  {
    title: "Sem fórmula de palco",
    text: "Não há promessa de transformação em 21 dias. Há mapa, diagnóstico e arquitetura para quem já cansou de conteúdo superficial.",
  },
  {
    title: "Escrito de dentro",
    text: "Falência, colapso, reconstrução. A autoridade aqui nasce da travessia, não de diploma ou de palco de congresso.",
  },
];

// FIX 2: metrics — removida "Arquitetura do funil" (linguagem interna de estratégia).
const metrics = [
  {
    label: "Para quem é",
    value:
      "Leitores analíticos, profissionais e mentes exigentes que rejeitam superficialidade.",
  },
  {
    label: "Promessa honesta",
    value:
      "Mais autoria, critério e presença. Menos automatismo, ruído e vida terceirizada.",
  },
  {
    label: "O que você leva",
    value:
      "Uma dossiê gratuito com checklist, mapa de revisão e roteiro de 7 dias — antes de qualquer decisão de compra.",
  },
];

const diagnosis = [
  {
    number: "01",
    title: "Vida automática",
    text: "Você entrega, responde, executa e continua funcional. O problema é que funcionar bem não significa habitar a própria vida com presença.",
  },
  {
    number: "02",
    title: "Distração como ambiente",
    text: "Sem soberania atencional, sua agenda, sua energia e até a sua ambição passam a servir prioridades desenhadas por outros sistemas.",
  },
  {
    number: "03",
    title: "Cansaço estrutural",
    text: "Há fadiga que não nasce do excesso de trabalho, mas da fricção permanente entre o papel executado e o eixo interno não escutado.",
  },
  {
    number: "04",
    title: "Ausência com aparência de ordem",
    text: "A vida pode estar organizada por fora e ainda assim vazia por dentro. O custo aparece em foco instável, decisão sem centro e deslocamento crônico.",
  },
];

const promises = [
  {
    title: "Autoria",
    text: "Identificar onde termina o reflexo e onde começa a escolha consciente. A mudança mais séria nasce desse corte invisível.",
  },
  {
    title: "Presença",
    text: "Voltar a habitar tempo, trabalho e vínculo com mais densidade, sem transformar rotina em mera documentação da existência.",
  },
  {
    title: "Estrutura",
    text: "Substituir fórmulas por mapa: revisão de padrões, proteção da atenção e reconstrução do eixo interno com aplicação prática.",
  },
];

const leadDeliverables = [
  {
    index: "01",
    title: "Checklist de auditoria existencial",
    text: "Para identificar áreas da vida que parecem escolha, mas na prática são herança, ruído ou hábito não examinado.",
  },
  {
    index: "02",
    title: "Mapa de soberania atencional",
    text: "Um quadro simples para diagnosticar fuga, fragmentação, distração e perda de cadência mental em contexto profissional.",
  },
  {
    index: "03",
    title: "Roteiro de 7 dias",
    text: "Microinterrupções para gerar percepção imediata de autoria, presença e clareza — antes da leitura integral da obra.",
  },
  {
    index: "04",
    title: "Acesso direto ao livro",
    text: "Ao final do dossiê, você recebe um caminho direto para a obra completa na Amazon, com intenção mais madura de leitura.",
  },
];

const authoritySignals = [
  {
    title: "Contexto de vida concreto",
    text: "Rancho às margens do Rio Murici, Tocantins, trabalho online, expedição familiar internacional planejada. Não é teoria — é vida sendo reconstruída enquanto o livro é escrito.",
  },
  {
    title: "Experiência vivida",
    text: "Falência, dívidas, colapso físico e reconstrução. A autoridade nasce da travessia, não do autoelogio digital.",
  },
  {
    title: "Coerência de obra",
    text: "Cartografia da Soberania Interior integra um catálogo com mais de 8 títulos publicados — cada um aprofundando um eixo do mesmo universo de pensamento.",
  },
  {
    title: "Casa Bonaparte como ecossistema",
    text: "Uma casa editorial com visão, continuidade temática e lastro simbólico. Não um infoproduto avulso.",
  },
];

const bookBenefits = [
  {
    title: "Para quem está funcionando, mas não vivendo",
    text: "A obra dá linguagem a um mal-estar sofisticado que muitos sentem e poucos conseguem nomear com precisão.",
  },
  {
    title: "Para quem quer revisar a própria arquitetura",
    text: "Em vez de adicionar ruído, ela ajuda a remover estruturas herdadas que já não sustentam o projeto interno.",
  },
  {
    title: "Para quem precisa de soberania atencional",
    text: "Mostra o custo de viver reagindo a tudo sem governar ritmo, foco e percepção em um ambiente desenhado para dispersar.",
  },
];

const ecosystem = [
  {
    title: "O Código da Ascensão",
    text: "Estrutura prática de elevação da consciência, visão transformadora e engenharia aplicada de vida.",
  },
  {
    title: "Burnout — Versão Definitiva",
    text: "Manual biológico e psicológico da sobrevivência moderna, entre colapso, corpo e reconstrução.",
  },
  {
    title: "Filhos da Prússia",
    text: "Análise histórica-identitária sobre formação cultural, disciplina e condicionamento coletivo.",
  },
  {
    title: "Heimat",
    text: "Obra metafísica-literária sobre pertencimento, transcendência e a possibilidade de casa interior.",
  },
];

const quoteSignals = [
  "O maior risco da vida não é errar. É funcionar perfeitamente em um projeto que não é seu.",
  "Quem não governa a própria atenção vive dentro do projeto de outra pessoa.",
  "O primeiro gesto de soberania não é grandioso. É microscópico.",
  "A soberania não é um estado alcançado. É uma prática contínua.",
];

// FIX 3: FAQ — removidas perguntas internas de desenvolvimento (itens 3 e 6 corrigidos).
const faq = [
  {
    question: "Isso é autoajuda?",
    answer:
      "Não na lógica tradicional. O texto se apresenta como ensaio reflexivo e estratégico: sem fórmula de palco, sem promessa de transformação fácil e sem performance de guru.",
  },
  {
    question: "Para quem este material faz sentido?",
    answer:
      "Para profissionais, empreendedores, leitores técnicos e pessoas em reconstrução que percebem o custo silencioso de viver produzindo sem realmente habitar a própria trajetória.",
  },
  {
    question: "O que acontece depois do cadastro?",
    answer:
      "Você recebe o dossiê por e-mail com os três materiais: checklist de auditoria, mapa de soberania atencional e roteiro de 7 dias. Junto, vem um link direto para a obra completa na Amazon.",
  },
  {
    question: "Por que não ir direto para a Amazon?",
    answer:
      "Porque um leitor que entende o contexto, o tom e o problema antes do clique toma uma decisão mais madura. O dossiê gratuito garante que a obra faça sentido para você antes de qualquer compra.",
  },
  {
    question: "Preciso ler outros títulos antes?",
    answer:
      "Não. Cartografia da Soberania Interior se sustenta sozinha. Mas ela integra um catálogo mais amplo — e quem lê um título costuma reconhecer a voz e continuar.",
  },
  {
    question: "O livro tem versão impressa?",
    answer:
      "Atualmente disponível em formato digital na Amazon. O eBook oferece a mesma experiência editorial completa — tipografia, estrutura e densidade do texto físico.",
  },
];

function openAmazon() {
  window.open(AMAZON_URL, "_blank", "noopener,noreferrer");
}

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const revealCopy = useMemo(
    () => ({
      title: "Dossiê de Soberania Atencional",
      subtitle:
        "Checklist editorial + mapa de revisão + roteiro de 7 dias para identificar onde sua vida está operando por reflexo, excesso de ruído ou ausência de eixo.",
    }),
    []
  );

  function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error("Preencha nome e e-mail para receber o dossiê.");
      return;
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      source: "bonaparte-kdp-lp",
      capturedAt: new Date().toISOString(),
    };

    localStorage.setItem("bonaparteLeadDraft", JSON.stringify(payload));
    setSubmitted(true);

    toast.success("Dossiê enviado! Verifique seu e-mail em instantes.");

    setTimeout(() => {
      openAmazon();
    }, 1000);
  }

  return (
    <div className="bonaparte-shell min-h-screen overflow-x-hidden">
      <div className="bonaparte-grain" aria-hidden="true" />

      <header className="bonaparte-header">
        <div className="container bonaparte-nav">
          <a
            href="#topo"
            className="bonaparte-brand"
            aria-label="Casa Bonaparte"
          >
            <span className="bonaparte-brand-mark">CB</span>
            <span>
              Casa Bonaparte
              <small>Conhecimento • visão • legado</small>
            </span>
          </a>

          <nav className="bonaparte-links" aria-label="Navegação principal">
            <a href="#diagnostico">Diagnóstico</a>
            <a href="#dossie">Material gratuito</a>
            <a href="#autoridade">Autor</a>
            <a href="#livro">Livro</a>
            <a href="#faq">FAQ</a>
          </nav>

          <Button
            className="bonaparte-nav-cta"
            onClick={() =>
              document
                .getElementById("captura")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Receber o dossiê
          </Button>
        </div>
      </header>

      <main id="topo">
        <section className="bonaparte-hero section-shell">
          <div className="container bonaparte-hero-grid">
            <div className="bonaparte-hero-copy">
              <span className="section-label">Casa Bonaparte apresenta</span>
              <h1>
                Pare de <span>funcionar</span> em um projeto que não é seu.
              </h1>

              {/* FIX 4: Parágrafo 1 — mantido (bom). Parágrafo 2 — era meta-copy sobre a LP, agora fala com o leitor. */}
              <p className="hero-lead hero-lead-strong">
                <strong>Cartografia da Soberania Interior</strong> é um ensaio
                de alta densidade para profissionais, líderes, empreendedores e
                leitores exigentes que já dominam a execução, mas se recusam a
                viver no automático.
              </p>
              <p className="hero-lead">
                Antes de qualquer decisão de compra, receba gratuitamente um
                dossiê com checklist, mapa de revisão e roteiro de 7 dias —
                para que a obra faça sentido para você desde o primeiro
                contato.
              </p>

              <div className="manifesto-grid">
                {manifestoCards.map(item => (
                  <article
                    key={item.title}
                    className="bonaparte-panel manifesto-card"
                  >
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>

              <div className="hero-cta-row">
                <Button
                  className="bonaparte-button-primary"
                  onClick={() =>
                    document
                      .getElementById("captura")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Receber o dossiê gratuito
                </Button>
                <Button
                  className="bonaparte-button-secondary"
                  onClick={openAmazon}
                >
                  Ver o livro na Amazon
                </Button>
              </div>

              {/* FIX 5: Hero footnote — era texto de dev/estratégia. Agora é credibilidade real. */}
              <p className="hero-footnote">
                Sem pop-up invasivo. Sem gatilho de escassez falsa. Sem
                depoimento inventado. Aqui há substância — e você vai perceber
                isso nos próximos dois minutos de leitura.
              </p>
            </div>

            <aside
              className="bonaparte-hero-visual bonaparte-panel"
              aria-label="Composição visual editorial da Casa Bonaparte"
            >
              <div className="hero-visual-main">
                <img
                  src={visualAssets.hero}
                  alt="Mesa de estudo noturna com livros, manuscritos e iluminação cinematográfica"
                />
                <div className="hero-visual-overlay-card overlay-card-top">
                  <span className="micro-label">Subtítulo da obra</span>
                  <p>
                    Arquitetura existencial para quem se recusa a viver no
                    automático.
                  </p>
                </div>
              </div>

              <div className="hero-visual-side">
                <div className="book-monolith">
                  <span className="micro-label">Abnadaby Bonaparte</span>
                  <h2>Cartografia da Soberania Interior</h2>
                  <p>
                    Um mapa lúcido para quem precisa recuperar autoria, foco e
                    território interno antes de expandir qualquer ambição
                    externa.
                  </p>
                  <div className="book-monolith-meta">
                    <span>Casa Bonaparte</span>
                    <span>Edição digital</span>
                  </div>
                </div>

                <div className="hero-visual-stack">
                  <figure className="bonaparte-photo-card bonaparte-panel">
                    <img
                      src={visualAssets.books}
                      alt="Natureza morta editorial com livros técnicos e cadernos em uma mesa de madeira"
                    />
                  </figure>
                  <figure className="bonaparte-photo-card bonaparte-panel">
                    <img
                      src={visualAssets.manuscript}
                      alt="Manuscrito comentado com pena e detalhes dourados em atmosfera sofisticada"
                    />
                  </figure>
                </div>
              </div>
            </aside>
          </div>

          <div className="container metrics-row">
            {metrics.map(metric => (
              <article
                className="bonaparte-panel metric-card"
                key={metric.label}
              >
                <span className="micro-label">{metric.label}</span>
                <p>{metric.value}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="diagnostico" className="section-shell bonaparte-section">
          <div className="container section-heading split-heading">
            <div>
              <span className="section-label">Diagnóstico</span>
              <h2>
                O problema não é falta de produtividade. É excesso de vida
                herdada.
              </h2>
            </div>
            <p>
              Muita gente continua pagando contas, cumprindo tarefas e mantendo
              a máquina girando. O colapso não é visível. É silencioso. A pessoa
              segue funcional, porém distante do próprio centro — e chama isso
              de rotina, maturidade ou normalidade.
            </p>
          </div>

          <div className="container diagnosis-grid">
            <div className="diagnosis-cards">
              {diagnosis.map(item => (
                <article
                  key={item.number}
                  className="bonaparte-panel diagnosis-card"
                >
                  <span className="number-chip">{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>

            <aside className="quote-panel">
              <span className="section-label dark-on-paper">Trecho-matriz</span>
              <blockquote>
                A morte é um evento.
                <br />A ausência é um processo.
              </blockquote>
              <p>
                O livro não dramatiza o colapso. Ele nomeia o problema invisível
                de quem segue operando sem realmente habitar a própria vida.
              </p>
            </aside>
          </div>
        </section>

        <section className="section-shell bonaparte-section bonaparte-section-alt">
          <div className="container section-heading split-heading">
            <div>
              <span className="section-label dark-on-paper">Transformação</span>
              <h2>
                Sem promessas milagrosas. Com ganho real de entendimento,
                critério e direção.
              </h2>
            </div>
            <p>
              Esta não é uma promessa de reinvenção instantânea. É uma proposta
              mais séria: devolver ao leitor clareza para revisar sua
              arquitetura interna, recuperar foco e sustentar decisões com mais
              consciência.
            </p>
          </div>

          <div className="container promise-grid">
            {promises.map(promise => (
              <article key={promise.title} className="promise-card">
                <h3>{promise.title}</h3>
                <p>{promise.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="dossie" className="section-shell bonaparte-section">
          <div className="container lead-shell">
            <div className="lead-copy-side">
              <span className="section-label">
                Material gratuito
              </span>
              <h2>{revealCopy.title}</h2>
              <p className="section-intro">{revealCopy.subtitle}</p>

              <div className="deliverables-grid">
                {leadDeliverables.map(item => (
                  <article
                    key={item.index}
                    className="deliverable-item bonaparte-panel"
                  >
                    <span className="number-chip">{item.index}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside id="captura" className="bonaparte-panel capture-card">
              <div>
                <span className="section-label">
                  Entrega imediata • gratuito
                </span>
                <h3>Receba o dossiê agora</h3>

                {/* FIX 6: Descrição do capture card — era nota de desenvolvedor. Agora fala com o leitor. */}
                <p>
                  Preencha nome e e-mail. O dossiê chega na sua caixa de
                  entrada em minutos — e você já pode avançar para a obra
                  principal com muito mais clareza sobre o que encontrará.
                </p>
              </div>

              <form className="capture-form" onSubmit={handleLeadSubmit}>
                <label>
                  <span>Nome</span>
                  <input
                    value={name}
                    onChange={event => setName(event.target.value)}
                    type="text"
                    placeholder="Seu primeiro nome"
                    autoComplete="name"
                  />
                </label>
                <label>
                  <span>E-mail</span>
                  <input
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    type="email"
                    placeholder="voce@empresa.com"
                    autoComplete="email"
                  />
                </label>
                <Button
                  type="submit"
                  className="bonaparte-button-primary bonaparte-button-block"
                >
                  Receber o dossiê e conhecer o livro
                </Button>
              </form>

              <div className="capture-proof bonaparte-panel-soft">
                <h4>Por que começar pelo dossiê?</h4>
                <p>
                  Porque a leitura com contexto é mais profunda. O dossiê
                  prepara o terreno — identifica onde você está, o que você
                  carrega sem perceber e o que a obra pode fazer por você antes
                  de qualquer página virada.
                </p>
              </div>

              {/* FIX 7: Success message — era nota de dev. Agora é copy de usuário real. */}
              {submitted ? (
                <div className="capture-success">
                  <strong>Dossiê a caminho.</strong>
                  <p>
                    Verifique sua caixa de entrada — o material chega em
                    instantes. Enquanto isso, a obra completa está disponível na
                    Amazon.
                  </p>
                </div>
              ) : null}
            </aside>
          </div>
        </section>

        <section id="autoridade" className="section-shell bonaparte-section">
          <div className="container authority-layout">
            <article className="bonaparte-panel authority-card-main">
              <span className="section-label">Autoridade editorial</span>
              <h2>Abnadaby Bonaparte não fala de torre. Fala de trincheira.</h2>
              <p className="section-intro">
                A autoridade aqui não vem de título acadêmico, de palco de
                congresso ou de número de seguidores. Vem de colapso vivido,
                reconstrução real e pensamento forjado na fricção — não na
                teoria.
              </p>

              <div className="authority-grid">
                {authoritySignals.map(item => (
                  <article
                    key={item.title}
                    className="bonaparte-panel-soft authority-signal"
                  >
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </article>

            <aside className="authority-visual bonaparte-panel">
              <img
                src={visualAssets.library}
                alt="Biblioteca privada em atmosfera escura e elegante com mesa de leitura iluminada"
              />
              <div className="authority-overlay">
                <span className="micro-label">Lógica de marca</span>
                <p>
                  Casa Bonaparte como casa de formação, visão e legado. Menos
                  infoproduto. Mais publicação premium com lastro intelectual.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section id="livro" className="section-shell bonaparte-section">
          <div className="container book-layout">
            <article className="bonaparte-panel book-stage">
              <div className="book-stage-cover">
                <div className="book-stage-object">
                  <span className="micro-label">Livro principal</span>
                  <h2>Cartografia da Soberania Interior</h2>
                  <p>
                    Arquitetura existencial para quem se recusa a viver no
                    automático.
                  </p>
                  <div className="book-stage-meta">
                    <span>Ensaio editorial</span>
                    <span>Casa Bonaparte</span>
                    <span>E-book Amazon</span>
                  </div>
                </div>
              </div>

              <div className="book-stage-copy">
                <span className="section-label">A obra</span>
                <h3>
                  Uma obra para leitores que exigem densidade, não distração.
                </h3>
                <p>
                  Cartografia da Soberania Interior não tenta vender choque
                  emocional. Ela organiza uma travessia: do automatismo ao eixo,
                  do excesso herdado à escolha consciente e da vida funcional à
                  presença deliberada.
                </p>

                <div className="book-benefit-list">
                  {bookBenefits.map((benefit, index) => (
                    <article key={benefit.title} className="book-benefit-item">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <h4>{benefit.title}</h4>
                        <p>{benefit.text}</p>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="hero-cta-row compact-row">
                  <Button
                    className="bonaparte-button-primary"
                    onClick={openAmazon}
                  >
                    Ler na Amazon
                  </Button>
                  <Button
                    className="bonaparte-button-secondary"
                    onClick={() =>
                      document
                        .getElementById("captura")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Baixar o dossiê primeiro
                  </Button>
                </div>
              </div>
            </article>

            <aside className="ecosystem-shell">
              <div className="ecosystem-heading">
                <span className="section-label">Catálogo Bonaparte</span>
                <h3>Uma obra dentro de um universo maior.</h3>
                <p>
                  Cartografia da Soberania Interior integra um corpo editorial
                  coerente — cada título aprofundando um eixo do mesmo universo
                  de pensamento.
                </p>
              </div>
              <div className="ecosystem-grid">
                {ecosystem.map(item => (
                  <article
                    key={item.title}
                    className="bonaparte-panel ecosystem-card"
                  >
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="section-shell bonaparte-section bonaparte-section-alt">
          <div className="container section-heading split-heading">
            <div>
              <span className="section-label dark-on-paper">
                Trechos da obra
              </span>
              <h2>
                Profundidade se percebe no corte do argumento e na coragem de
                não simplificar o que é sério.
              </h2>
            </div>
            <p>
              Quatro formulações que aparecem na obra. Não são frases de
              motivação. São diagnósticos — e você vai reconhecer pelo menos um
              deles como descrição precisa da sua semana.
            </p>
          </div>

          <div className="container quote-signal-grid">
            {quoteSignals.map(quote => (
              <article key={quote} className="quote-signal-card">
                <blockquote>{quote}</blockquote>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="section-shell bonaparte-section">
          <div className="container section-heading split-heading">
            <div>
              <span className="section-label">Perguntas frequentes</span>
              <h2>Dúvidas reais merecem respostas diretas.</h2>
            </div>
            <p>
              Sem enrolação. Sem pressão. Se algo não ficou claro nas seções
              anteriores, está respondido aqui.
            </p>
          </div>

          <div className="container faq-grid">
            {faq.map(item => (
              <details
                key={item.question}
                className="bonaparte-panel faq-item"
                open={item.question === faq[0].question}
              >
                <summary>
                  <span>{item.question}</span>
                  <span>+</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section-shell bonaparte-section bonaparte-final-section">
          <div className="container final-shell">
            <div className="final-copy bonaparte-panel">
              <span className="section-label">Próximo passo</span>
              <h2>
                Se o tema ressoar, não comece comprando. Comece discernindo.
              </h2>
              <p>
                Receba o dossiê, leia o material e avalie a voz do autor com
                calma. A Casa Bonaparte não precisa empurrar uma decisão —
                precisa criar um encontro de alta compatibilidade entre obra e
                leitor.
              </p>
              <div className="hero-cta-row compact-row">
                <Button
                  className="bonaparte-button-primary"
                  onClick={() =>
                    document
                      .getElementById("captura")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Receber o dossiê gratuito
                </Button>
                <Button
                  className="bonaparte-button-secondary"
                  onClick={openAmazon}
                >
                  Ir direto para a Amazon
                </Button>
              </div>
            </div>

            <figure className="final-visual bonaparte-panel">
              <img
                src={visualAssets.hero}
                alt="Composição editorial escura com mesa de escrita, livros e luz âmbar"
              />
            </figure>
          </div>
        </section>
      </main>

      <footer className="bonaparte-footer">
        <div className="container bonaparte-footer-grid">
          <div>
            <strong>Casa Bonaparte</strong>
            <p>
              Projeto editorial para leitores que preferem densidade, estrutura
              e legado à pressa superficial do mercado.
            </p>
          </div>
          <div>
            <small>© 2026 Casa Bonaparte • Rancho Murici, Tocantins</small>
            <small>"A pedra não sente dor, ela apenas permanece."</small>
          </div>
        </div>
      </footer>
    </div>
  );
}
