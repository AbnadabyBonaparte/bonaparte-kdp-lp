/*
Design philosophy for this page: editorial noir contemporâneo com atmosfera de dossiê estratégico premium.
Core reminders: assimetria nobre, hierarquia tipográfica forte, superfícies densas, imagens realistas cinematográficas,
nenhum elemento vulgar de infoproduto, nenhuma estética genérica de SaaS, e toda decisão visual deve reforçar autoridade intelectual.
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

const manifestoCards = [
  {
    title: "Antes da leitura, clareza",
    text: "Você não precisa de mais conteúdo. Precisa enxergar o que já está operando sem consciência.",
  },
  {
    title: "Um material que se sustenta",
    text: "O dossiê introdutório não funciona como promessa vazia. Ele entrega utilidade real antes de qualquer decisão.",
  },
  {
    title: "Decisão com contexto",
    text: "A obra deixa de ser descoberta aleatória e passa a ser escolha consciente, com mais densidade e compatibilidade.",
  },
];

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
    label: "Jornada editorial",
    value:
      "Material introdutório primeiro, obra principal depois — com contexto, aquecimento e construção de base própria.",
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
    title: "Auditoria silenciosa",
    text: "Identifique padrões que parecem escolha, mas são apenas continuidade, ruído ou herança não examinada.",
  },
  {
    index: "02",
    title: "Mapa de atenção",
    text: "Entenda onde sua energia está sendo drenada sem percepção e por que seu foco já não responde ao que importa.",
  },
  {
    index: "03",
    title: "Interrupções práticas",
    text: "Pequenos deslocamentos que devolvem autoria imediatamente, antes mesmo da leitura integral da obra.",
  },
  {
    index: "04",
    title: "Continuidade natural",
    text: "A obra principal surge como extensão lógica da leitura introdutória, não como imposição comercial.",
  },
];

const authoritySignals = [
  {
    title: "Contexto de vida concreto",
    text: "Rancho às margens do Rio Murici, Tocantins, trabalho online com sistemas de IA e busca radical por liberdade financeira, geográfica e intelectual.",
  },
  {
    title: "Experiência vivida",
    text: "Autoridade construída fora do ambiente digital, a partir de experiências reais de reconstrução, risco e autonomia.",
  },
  {
    title: "Coerência de obra",
    text: "O Código da Ascensão atua como contraponto prático; Cartografia da Soberania Interior aprofunda o eixo do ser, da presença e da soberania.",
  },
  {
    title: "Casa Bonaparte como ecossistema",
    text: "A página posiciona o livro como parte de uma casa editorial com visão, continuidade temática, catálogo e lastro simbólico.",
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
      "Depois do envio, o leitor acessa o material introdutório e pode seguir para a obra principal com mais contexto e compatibilidade. A integração final pode conectar essa etapa ao seu provedor de e-mail.",
  },
  {
    question: "Por que não mandar direto para a Amazon?",
    answer:
      "Porque compreensão precede decisão. E decisão consciente converte melhor do que impulso.",
  },
  {
    question: "Preciso ler outros títulos antes?",
    answer:
      "Não. Cartografia da Soberania Interior se sustenta sozinha. Mas a página já insere a obra dentro do ecossistema Casa Bonaparte para abrir caminho a remarketing editorial e catálogo futuro.",
  },
  {
    question: "Ela está pronta para campanhas?",
    answer:
      "Sim. A estrutura foi montada para tráfego frio, narrativa de autoridade, CTA claros, seções de aquecimento, responsividade e espaço natural para instrumentação analítica.",
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
      title: "Antes da obra completa, um ponto de ruptura.",
      subtitle:
        "Um material curto, direto e estrutural para identificar onde sua vida está operando por reflexo, distração ou ausência de eixo.",
    }),
    []
  );

  function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error(
        "Preencha nome e e-mail para liberar o material introdutório."
      );
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

    toast.success(
      "Acesso preparado. Agora você já pode avançar para a obra principal."
    );

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
            <a href="#dossie">Dossiê</a>
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
              <p className="hero-lead hero-lead-strong">
                <strong>Cartografia da Soberania Interior</strong> é um ensaio
                de alta densidade para profissionais, líderes, empreendedores e
                leitores exigentes que já dominam a execução, mas se recusam a
                viver no automático.
              </p>
              <p className="hero-lead">
                Este não é um livro para motivar. É um mapa para interromper uma
                vida funcional que nunca foi revisada com lucidez.
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
                  Ver a obra
                </Button>
              </div>

              <p className="hero-footnote">
                Sem pop-up vulgar, sem gatilho barato e sem estética de guru. A
                proposta é editorial, sóbria e desenhada para leitores frios de
                alta exigência.
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
              Você continua funcionando. Mas já percebeu que funcionar bem não
              significa viver com autoria.
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
                Não é sobre mudar sua vida. É sobre perceber que ela nunca foi
                realmente sua.
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
                  Acesso imediato • leitura introdutória
                </span>
                <h3>Acesse o material introdutório</h3>
                <p>
                  Leitura imediata após envio. Sem ruído. Sem excesso. Apenas o
                  necessário para discernir antes de avançar.
                </p>
              </div>

              <form className="capture-form" onSubmit={handleLeadSubmit}>
                <label>
                  <span>Nome</span>
                  <input
                    value={name}
                    onChange={event => setName(event.target.value)}
                    type="text"
                    placeholder="Seu nome"
                    autoComplete="name"
                  />
                </label>
                <label>
                  <span>E-mail</span>
                  <input
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    type="email"
                    placeholder="Seu melhor e-mail"
                    autoComplete="email"
                  />
                </label>
                <Button
                  type="submit"
                  className="bonaparte-button-primary bonaparte-button-block"
                >
                  Acessar o dossiê agora
                </Button>
              </form>

              <div className="capture-proof bonaparte-panel-soft">
                <h4>Por que esta sequência funciona melhor</h4>
                <p>
                  Porque ela não pede confiança no vazio. Primeiro oferece
                  clareza, utilidade e repertório. Depois convida o leitor a
                  aprofundar a jornada no livro com muito mais maturidade de
                  decisão.
                </p>
              </div>

              {submitted ? (
                <div className="capture-success">
                  <strong>Acesso preparado com sucesso.</strong>
                  <p>
                    Seus dados foram preservados nesta experiência e a jornada
                    já abre a obra principal em nova aba. Na integração final,
                    basta conectar o formulário ao seu provedor de e-mail para
                    ativar a entrega real do material.
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
                A página apresenta o autor de forma sóbria: não como celebridade
                digital, mas como alguém cuja autoridade foi construída fora do
                palco e testada na realidade.
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
                <span className="section-label">Vitrine premium</span>
                <h3>Um livro para quem já percebeu — mas ainda não nomeou.</h3>
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
                    Baixar a amostra primeiro
                  </Button>
                </div>
              </div>
            </article>

            <aside className="ecosystem-shell">
              <div className="ecosystem-heading">
                <span className="section-label">Ecossistema editorial</span>
                <h3>O livro principal dentro de um catálogo maior.</h3>
                <p>
                  Para ampliar autoridade percebida, a página apresenta
                  Cartografia da Soberania Interior como parte de um corpo
                  editorial mais amplo, coerente e estrategicamente alinhado.
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
                Sinais de credibilidade
              </span>
              <h2>
                Profundidade se percebe no corte do argumento e na coragem de
                não simplificar o que é sério.
              </h2>
            </div>
            <p>
              Em tráfego frio, credibilidade não depende de números inflados ou
              depoimentos artificiais. Ela pode ser construída com formulações
              fortes, princípios claros e trechos que revelam a natureza da
              leitura oferecida.
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
              <span className="section-label">FAQ estratégico</span>
              <h2>Objeções reais merecem respostas sóbrias.</h2>
            </div>
            <p>
              A página não força urgência artificial. Ela resolve dúvidas
              típicas de quem chega frio, precisa de clareza e não compra por
              impulso ou pressão estética.
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
              <span className="section-label">Fechamento</span>
              <h2>
                Se o tema ressoar, não comece comprando. Comece discernindo.
              </h2>
              <p>
                Acesse o material introdutório, leia o dossiê e avalie a voz do
                autor com calma. A Casa Bonaparte não precisa empurrar uma
                decisão. Precisa construir um encontro de alta compatibilidade
                entre obra e leitor.
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
                  Acessar o dossiê agora
                </Button>
                <Button
                  className="bonaparte-button-secondary"
                  onClick={openAmazon}
                >
                  Ver a obra na Amazon
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
