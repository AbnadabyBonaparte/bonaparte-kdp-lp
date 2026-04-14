/*
VERSÃO FINAL — Casa Bonaparte KDP Landing Page
Síntese de todas as revisões. Estrutura preservada. Linguagem do livro injetada.
Sem meta-copy. Sem notas de dev. Sem cheiro de marketing.
*/

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

const AMAZON_URL =
  "https://www.amazon.com.br/Cartografia-Soberania-Interior-Arquitetura-existencial-ebook/dp/B0GWSPPB82/ref=sr_1_5?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=KVZNB34NV1WM&dib=eyJ2IjoiMSJ9.j2Dwdvr5_2gPdrDpjyqeXc2hJoKFrhTo0wXkotRxiHg0CEUZ7jIApfoUbXbTJARAZO-bsJZkg-SUzs85fnPD6g.yq6SVfcIWA-aG4f8qAGRJ48dj1gW1gvL0NSlFHKC1kk&dib_tag=se&keywords=abnadaby&qid=1776087491&sprefix=abnadaby%2Caps%2C211&sr=8-5";

const visualAssets = {
  hero: "/images/bonaparte-hero-desk-editorial.jpg",
  books: "/images/books.jpg",
  library: "/images/library.jpg",
  manuscript: "/images/bonaparte-manuscript-square.jpg",
  cover: "/images/cartografia-capa.jpg",
};

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

const metrics = [
  {
    label: "Para quem é",
    value:
      "Profissionais, líderes e leitores exigentes que dominam a execução — mas se recusam a viver no automático.",
  },
  {
    label: "Promessa honesta",
    value:
      "Mais autoria, critério e presença. Menos automatismo, ruído e vida conduzida por padrão.",
  },
  {
    label: "O que você leva",
    value:
      "Um dossiê introdutório com três ferramentas de reconhecimento — antes de qualquer decisão de compra.",
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
    title: "Padrões invisíveis",
    text: "Identifique comportamentos que parecem decisão, mas são apenas continuidade de um projeto não examinado.",
  },
  {
    index: "02",
    title: "Atenção sequestrada",
    text: "Perceba onde sua energia está sendo consumida sem consciência — e sem retorno real.",
  },
  {
    index: "03",
    title: "Pontos de ruptura",
    text: "Pequenos deslocamentos que devolvem autoria de forma imediata, sem precisar reconstruir tudo.",
  },
  {
    index: "04",
    title: "Acesso direto à obra",
    text: "Ao final do dossiê, o caminho para a obra completa na Amazon — com intenção de leitura já formada.",
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

function publicImageFile(name: string) {
  return `/images/${encodeURIComponent(name)}`;
}

const ecosystem = [
  {
    title: "O Código da Ascensão",
    text: "Manifesto de Engenharia Existencial e Soberania Digital",
    cover: publicImageFile("o codigo da ascençao.jpg"),
    amazonUrl:
      "https://www.amazon.com.br/C%C3%B3digo-Ascens%C3%A3o-Manifesto-Engenharia-Existencial-ebook/dp/B0GWW2HGSV",
  },
  {
    title: "Cura Natural para Burnout, Estresse e Exaustão",
    text: "Guia Prático para Recuperar Sua Energia, Clareza Mental e Estabilidade Emocional",
    cover: "/images/burnout.png",
    amazonUrl:
      "https://www.amazon.com.br/Cura-Natural-Burnout-Estresse-Exaust%C3%A3o-ebook/dp/B0GWSCKZCC",
  },
  {
    title: "Filhos da Prússia",
    text: "Você foi construído. Não educado.",
    cover: "/images/filho_da_prussia.jpg",
    amazonUrl:
      "https://www.amazon.com.br/FILHOS-PR%C3%9ASSIA-Voc%C3%AA-constru%C3%ADdo-educado-ebook/dp/B0GWSKJK92",
  },
  {
    title: "Heimat",
    text: "O Animal Ancestral e o Humano Opcional",
    cover: "/images/heimat.jpg",
    amazonUrl:
      "https://www.amazon.com.br/HEIMAT-Animal-Ancestral-Humano-Opcional-ebook/dp/B0GWWS17TF",
  },
];

const quoteSignals = [
  "O maior risco da vida não é errar. É funcionar perfeitamente em um projeto que não é seu.",
  "Quem não governa a própria atenção vive dentro do projeto de outra pessoa.",
  "O primeiro gesto de soberania não é grandioso. É microscópico.",
  "A soberania não é um estado alcançado. É uma prática contínua.",
];

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
      "Você recebe o dossiê por e-mail com os três materiais: padrões invisíveis, mapa de atenção sequestrada e pontos de ruptura. Junto, vem o link direto para a obra completa na Amazon.",
  },
  {
    question: "Por que começar pelo dossiê e não ir direto à Amazon?",
    answer:
      "Porque a leitura com contexto é mais profunda. O dossiê prepara o terreno — identifica onde você está, o que carrega sem perceber, e o que a obra pode fazer por você antes de qualquer página virada.",
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
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const revealCopy = useMemo(
    () => ({
      title: "Dossiê Introdutório",
      subtitle:
        "Três ferramentas de reconhecimento para identificar onde sua vida está operando por inércia — mesmo quando parece escolha.",
    }),
    []
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !whatsapp.trim()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/send-dossie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          whatsapp: whatsapp.trim(),
        }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        setName("");
        setWhatsapp("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
            <a href="#dossie">Dossiê</a>
            <a href="#autoridade">Autor</a>
            <a href="#livro">Obra</a>
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
            Acessar o dossiê
          </Button>
        </div>
      </header>

      <main id="topo">
        {/* ── HERO ─────────────────────────────────── */}
        <section className="bonaparte-hero section-shell fade-in">
          <div className="container bonaparte-hero-grid">
            <div className="bonaparte-hero-copy">
              <span className="section-label">Casa Bonaparte apresenta</span>

              {/* HEADLINE FINAL — linguagem do livro, clara e forte */}
              <h1>
                Você funciona bem.{" "}
                <span>Mas já percebeu que não está vivendo?</span>
              </h1>

              <p className="hero-lead hero-lead-strong">
                <strong>Cartografia da Soberania Interior</strong> não é um
                livro sobre fazer mais.
              </p>
              <p className="hero-lead">
                É sobre perceber que sua vida pode estar funcionando —
                sem realmente ser habitada.
              </p>
              <p className="hero-lead">
                Antes de decidir qualquer coisa, existe algo que você precisa
                enxergar.
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
                  Acessar o dossiê introdutório
                </Button>
                <Button
                  className="bonaparte-button-secondary"
                  onClick={openAmazon}
                >
                  Ver o livro na Amazon
                </Button>
              </div>

              <p className="hero-footnote">
                Sem pop-up invasivo. Sem escassez artificial. Sem linguagem de
                vendedor. Se isso não fizer sentido para você, tudo bem — não
                é o momento ainda. Se fizer, você já percebeu.
              </p>
            </div>

            <aside
              className="bonaparte-hero-visual bonaparte-panel"
              aria-label="Composição visual editorial da Casa Bonaparte"
            >
              <div className="hero-visual-main">
                <img
                  className="bonaparte-img-cover"
                  src={visualAssets.hero}
                  alt="Escrivaninha editorial com cartas manuscritas, caneta e luz quente"
                  width={1600}
                  height={1200}
                  decoding="async"
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
                      className="bonaparte-img-stack"
                      src={visualAssets.manuscript}
                      alt="Manuscrito aberto com selos de cera e caneta-tinteiro"
                      width={800}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                  <figure className="bonaparte-photo-card bonaparte-panel">
                    <img
                      className="bonaparte-img-stack"
                      src={visualAssets.books}
                      alt="Natureza morta editorial com livros técnicos"
                      width={800}
                      height={1000}
                      loading="lazy"
                      decoding="async"
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

        {/* ── DIAGNÓSTICO ──────────────────────────── */}
        <section
          id="diagnostico"
          className="section-shell bonaparte-section fade-in"
        >
          <div className="container section-heading split-heading">
            <div>
              <span className="section-label">Diagnóstico</span>
              <h2>
                A maioria das pessoas não está perdida.
                Está funcional.
              </h2>
            </div>
            <p>
              Cumpre tarefas. Mantém a rotina. Resolve o que precisa ser
              resolvido. Mas vive uma forma silenciosa de ausência. Tudo opera.
              Mas nem tudo pertence.
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
              <span className="section-label dark-on-paper">Ruptura</span>
              <blockquote>
                O problema não é<br />falta de esforço.
                <br />É mais profundo.
              </blockquote>
              <p>
                Você pode estar vivendo um projeto que nunca foi realmente seu.
                E isso não aparece como crise — aparece como rotina.
              </p>
            </aside>
          </div>
        </section>

        {/* ── TRANSFORMAÇÃO ────────────────────────── */}
        <section className="section-shell bonaparte-section bonaparte-section-alt fade-in">
          <div className="container section-heading split-heading">
            <div>
              <span className="section-label dark-on-paper">Transformação</span>
              <h2>
                Sem promessas milagrosas. Com ganho real de autoria, critério e
                presença.
              </h2>
            </div>
            <p>
              Esta não é uma promessa de reinvenção instantânea. É uma proposta
              mais séria: devolver ao leitor clareza para revisar sua arquitetura
              interna e sustentar decisões com mais consciência.
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

        {/* ── DOSSIÊ / CAPTURA ─────────────────────── */}
        <section id="dossie" className="section-shell bonaparte-section fade-in">
          <div className="container lead-shell">
            <div className="lead-copy-side">
              <span className="section-label">Dossiê introdutório</span>
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
                  Acesso imediato · gratuito
                </span>
                <h3>Antes da obra completa,<br />um ponto de clareza.</h3>
                <p>
                  Preencha nome, e-mail e WhatsApp. O dossiê chega na sua caixa
                  em minutos — e você acessa a obra principal com muito mais
                  nitidez sobre o que encontrará.
                </p>
              </div>

              <form className="capture-form" onSubmit={handleSubmit}>
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
                <label>
                  <span>WhatsApp</span>
                  <input
                    value={whatsapp}
                    onChange={event => setWhatsapp(event.target.value)}
                    type="tel"
                    placeholder="+55 11 99999-9999"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </label>
                <Button
                  type="submit"
                  className="bonaparte-button-primary bonaparte-button-block"
                >
                  Acessar o dossiê
                </Button>
                {status === "success" && (
                  <p className="text-sm text-green-400 mt-2">
                    Dossiê enviado. Verifique seu email.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-400 mt-2">
                    Erro ao enviar. Tente novamente.
                  </p>
                )}
                <p style={{ textAlign: "center", fontSize: "0.82rem", color: "var(--ink-muted)", margin: "0.4rem 0 0" }}>
                  ↓ Leitura em menos de 5 minutos
                </p>
              </form>

              <div className="capture-proof bonaparte-panel-soft">
                <h4>Por que começar pelo dossiê?</h4>
                <p>
                  Porque a leitura com contexto é mais profunda. O dossiê
                  prepara o terreno — e garante que você saiba exatamente o que
                  encontrará antes de virar a primeira página.
                </p>
              </div>

            </aside>
          </div>
        </section>

        {/* ── AUTORIDADE ───────────────────────────── */}
        <section
          id="autoridade"
          className="section-shell bonaparte-section fade-in"
        >
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
                className="bonaparte-img-cover"
                src={visualAssets.library}
                alt="Biblioteca privada em atmosfera escura e elegante"
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
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

        {/* ── LIVRO ────────────────────────────────── */}
        <section id="livro" className="section-shell bonaparte-section fade-in">
          <div className="container book-layout">
            <article className="bonaparte-panel book-stage">
              <div className="book-stage-cover">
                <img
                  className="bonaparte-img-cover book-cover-main"
                  src={visualAssets.cover}
                  alt="Capa do livro Cartografia da Soberania Interior"
                  width={800}
                  height={1280}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="book-stage-copy">
                <span className="section-label">A obra</span>
                <h3>
                  Para leitores que exigem densidade — não distração.
                </h3>
                <p>
                  Esta obra não tenta vender choque emocional. Ela organiza uma
                  travessia: do automatismo ao eixo, do excesso herdado à escolha
                  consciente, da vida funcional à presença deliberada.
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
                    Acessar na Amazon
                  </Button>
                  <Button
                    className="bonaparte-button-secondary"
                    onClick={() =>
                      document
                        .getElementById("captura")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Começar pelo dossiê
                  </Button>
                </div>
              </div>
            </article>

            <aside className="ecosystem-shell">
              <div className="ecosystem-heading">
                <span className="section-label">Catálogo Bonaparte</span>
                <h3>Uma obra dentro de um universo maior.</h3>
                <p>
                  Cada título aprofunda um eixo do mesmo universo de
                  pensamento. Quem lê um costuma reconhecer a voz — e
                  continuar.
                </p>
              </div>
              <div className="ecosystem-grid">
                {ecosystem.map(item => (
                  <article
                    key={item.title}
                    className="bonaparte-panel ecosystem-card"
                  >
                    <a
                      href={item.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ecosystem-card-cover"
                    >
                      <img
                        src={item.cover}
                        alt={`Capa do e-book ${item.title}`}
                        width={400}
                        height={600}
                        loading="lazy"
                        decoding="async"
                      />
                    </a>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                    <a
                      href={item.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ecosystem-card-cta"
                    >
                      Ver na Amazon
                    </a>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>

        {/* ── TRECHOS ──────────────────────────────── */}
        <section className="section-shell bonaparte-section bonaparte-section-alt fade-in">
          <div className="container section-heading split-heading">
            <div>
              <span className="section-label dark-on-paper">
                Trechos da obra
              </span>
              <h2>
                Profundidade se percebe no corte do argumento.
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

        {/* ── FAQ ──────────────────────────────────── */}
        <section id="faq" className="section-shell bonaparte-section fade-in">
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

        {/* ── FECHAMENTO ───────────────────────────── */}
        <section className="section-shell bonaparte-section bonaparte-final-section fade-in">
          <div className="container final-shell">
            <div className="final-copy bonaparte-panel">
              <h2 className="final-heading">
                O maior risco da vida não é errar.
              </h2>
              <p>
                Se você chegou até aqui,
                <br />
                não foi por curiosidade.
              </p>
              <p>Foi reconhecimento.</p>
              <p className="highlight">
                E depois disso,
                <br />
                não dá mais para não ver.
              </p>
              <div className="hero-cta-row compact-row final-cta-single">
                <Button
                  className="bonaparte-button-primary"
                  onClick={() =>
                    document
                      .getElementById("captura")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Acessar o dossiê agora
                </Button>
              </div>
              <p className="microcopy">
                Leitura imediata.
                <br />
                Sem distração.
                <br />
                Sem excesso.
              </p>
            </div>

            <figure className="final-visual bonaparte-panel">
              <img
                className="bonaparte-img-cover"
                src={visualAssets.hero}
                alt="Composição editorial escura com mesa de escrita, livros e luz âmbar"
                width={1600}
                height={1200}
                loading="lazy"
                decoding="async"
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
