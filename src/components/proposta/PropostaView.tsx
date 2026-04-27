import type { Proposta } from "@/lib/types";
import { PropostaScripts } from "./PropostaScripts";

const HERO_BG_URL = "/hero_final.gif";

interface BridgeProps {
  variant: "to-light" | "to-dark";
  bridge?: { palavra: string; caption: string; index: string; numero: string };
}

function Bridge({ variant, bridge }: BridgeProps) {
  if (!bridge) return null;
  return (
    <div className={`bridge bridge--${variant}`} aria-hidden="true">
      <div className="stage">
        <span className="bridge-caption">{bridge.caption}</span>
        <div className="big-word">
          <span className="ghost">{bridge.palavra}</span>
          <span className="fill">{bridge.palavra}</span>
        </div>
        <div className="bridge-index">
          {bridge.index}
          <span className="num">{bridge.numero}</span>
        </div>
      </div>
    </div>
  );
}

export function PropostaView({ data: p }: { data: Proposta }) {
  return (
    <>
      <nav>
        <a className="brand" href="https://matilha.digital/" target="_blank" rel="noopener noreferrer">
          <span style={{ color: "var(--accent)", fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.02em", fontSize: "1.1rem" }}>
            Matilha
          </span>
        </a>
        <div className="nav-links">
          <a href="#solucao">Solução</a>
          <a href="#objetivo">Objetivo</a>
          <a href="#imersao">Imersão</a>
          <a href="#cronograma">Cronograma</a>
          <a href="#equipe">Equipe</a>
          <a href="#historico">Histórico</a>
          <a href="#investimento">Investimento</a>
          <a href="#proximos">Próximos passos</a>
        </div>
      </nav>

      <section className="hero">
        <div
          className="hero-bg"
          id="hero-bg"
          aria-hidden="true"
          style={{ backgroundImage: `url('${HERO_BG_URL}')` }}
        />
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="triangle-accent" />
          <span className="section-label">{p.proposta.label}</span>
          <h1>
            {p.hero.titulo}
            {p.hero.tituloAccent && (
              <>
                {" "}
                <span className="accent">{p.hero.tituloAccent}</span>
              </>
            )}
          </h1>
          <p className="subtitle">{p.hero.subtitulo}</p>

          <div className="client-header">
            <div className="client-info">
              <div>
                <span className="field-label">Cliente</span>
                <span className="field-value client-name">
                  {p.cliente.nome}
                </span>
              </div>
              <div>
                <span className="field-label">Contato</span>
                <span className="field-value">{p.cliente.contato}</span>
              </div>
              <div>
                <span className="field-label">Proposta nº</span>
                <span className="field-value">{p.proposta.numero}</span>
              </div>
              <div>
                <span className="field-label">Projeto</span>
                <span className="field-value">{p.proposta.projeto}</span>
              </div>
            </div>
            {p.cliente.logoUrl && (
              <div
                className="client-logo-wrap"
                style={
                  p.cliente.logoBg
                    ? { background: p.cliente.logoBg }
                    : undefined
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.cliente.logoUrl} alt={p.cliente.nome} />
              </div>
            )}
          </div>

          <p className="meta">
            Matilha Estúdio &nbsp;·&nbsp; {p.proposta.cidade} &nbsp;·&nbsp;{" "}
            {p.proposta.data}
          </p>

          {p.aspects.length > 0 && (
            <div className="aspects-box">
              {p.aspects.map((a, i) => (
                <div className="aspect-item" key={i}>
                  <div className="aspect-val">{a.valor}</div>
                  <div className="aspect-label">{a.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <hr className="divider" />

      <section id="solucao" className="fade-in">
        <span className="section-label">{p.solucao.sectionLabel}</span>
        <h2>{p.solucao.heading}</h2>
        <p className="lead" style={{ marginBottom: "1.5rem" }}>
          {p.solucao.lead}
        </p>
        <div className="cards-2">
          {p.solucao.cards.map((c, i) => (
            <div className="card" key={i}>
              <div className="card-label">{c.label}</div>
              <h3>{c.titulo}</h3>
              {c.descricao && <p>{c.descricao}</p>}
              {c.itens.length > 0 && (
                <ul>
                  {c.itens.map((it, j) => (
                    <li key={j}>{it}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <Bridge variant="to-light" bridge={p.bridges.objetivo} />

      <section id="objetivo" className="fade-in inverted">
        <span className="section-label">{p.objetivo.sectionLabel}</span>
        <h2>{p.objetivo.heading}</h2>
        <p className="lead" style={{ marginBottom: "0.5rem" }}>
          {p.objetivo.lead}
        </p>
        <div
          className="pilares-grid"
          style={{
            gridTemplateColumns:
              p.objetivo.pilares.length % 2 === 0
                ? "repeat(2, 1fr)"
                : "repeat(3, 1fr)",
          }}
        >
          {p.objetivo.pilares.map((pi, i) => (
            <div className="pilar" key={i}>
              <div className="pilar-name">{pi.label}</div>
              <h3>{pi.titulo}</h3>
              <p>{pi.descricao}</p>
            </div>
          ))}
        </div>

        {p.objetivo.headingConexao && (
          <h2 style={{ marginTop: "4rem" }}>{p.objetivo.headingConexao}</h2>
        )}
        {p.objetivo.leadConexao && (
          <p className="lead" style={{ marginBottom: "1rem" }}>
            {p.objetivo.leadConexao}
          </p>
        )}
        {p.objetivo.callout && (
          <p className="result-callout">{p.objetivo.callout}</p>
        )}
      </section>

      <Bridge variant="to-dark" bridge={p.bridges.imersao} />

      <section id="imersao" className="fade-in">
        <span className="section-label">{p.imersao.sectionLabel}</span>
        <h2>{p.imersao.heading}</h2>
        <p className="lead" style={{ marginBottom: "1.5rem" }}>
          {p.imersao.lead}
        </p>
        {p.imersao.callout && (
          <p className="result-callout">{p.imersao.callout}</p>
        )}
        {p.imersao.steps.length > 0 && (
          <div className="steps" style={{ marginTop: "2.5rem" }}>
            {p.imersao.steps.map((s, i) => (
              <div className="step" key={i}>
                <span className="step-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="step-title">{s.titulo}</span>
                <span className="step-desc">{s.descricao}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <Bridge variant="to-light" bridge={p.bridges.cronograma} />

      <section id="cronograma" className="fade-in inverted">
        <span className="section-label">{p.cronograma.sectionLabel}</span>
        <h2>{p.cronograma.heading}</h2>
        <p className="lead" style={{ marginBottom: "1.5rem" }}>
          {p.cronograma.lead}
        </p>
        <table className="crono-table">
          <thead>
            <tr>
              <th>Etapa · Entregas-chave</th>
              {p.cronograma.columns.map((c, i) => (
                <th key={i}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {p.cronograma.phases.map((phase, pi) => (
              <Phase
                key={pi}
                phase={phase}
                colsCount={p.cronograma.columns.length}
              />
            ))}
          </tbody>
        </table>
        {p.cronograma.nota && <p className="nota">{p.cronograma.nota}</p>}
      </section>

      <Bridge variant="to-dark" bridge={p.bridges.equipe} />

      <section id="equipe" className="fade-in">
        <span className="section-label">{p.equipe.sectionLabel}</span>
        <h2>{p.equipe.heading}</h2>
        <p className="lead" style={{ marginBottom: "0.5rem" }}>
          {p.equipe.lead}
        </p>
        <div className="cards-3">
          {p.equipe.membros.map((m, i) => (
            <div className="card" key={i}>
              <div className="card-label">{m.label}</div>
              <h3>{m.titulo}</h3>
              <p>{m.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      <Bridge variant="to-light" bridge={p.bridges.historico} />

      <section id="historico" className="fade-in inverted">
        <span className="section-label">{p.historico.sectionLabel}</span>
        <h2>{p.historico.heading}</h2>
        <p className="lead" style={{ marginBottom: "0.5rem" }}>
          {p.historico.lead}
        </p>
        <div
          className="stats-grid"
          style={{
            gridTemplateColumns: `repeat(${Math.min(p.historico.stats.length, 5)}, 1fr)`,
          }}
        >
          {p.historico.stats.map((s, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.valor}</div>
            </div>
          ))}
        </div>
      </section>

      <Bridge variant="to-dark" bridge={p.bridges.investimento} />

      <section id="investimento" className="fade-in">
        <span className="section-label">{p.investimento.sectionLabel}</span>
        <h2>{p.investimento.heading}</h2>
        <p className="lead" style={{ marginBottom: "1.25rem" }}>
          {p.investimento.lead}
        </p>
        <div className="invest-cards">
          {p.investimento.blocos.map((b, i) => (
            <div className="invest-card" key={i}>
              <div className="card-label">{b.label}</div>
              <h3>{b.titulo}</h3>
              <div className="price">
                {b.preco}
                {b.sufixoPreco && (
                  <span
                    style={{
                      fontSize: "1rem",
                      color: "var(--text-muted)",
                      fontWeight: 400,
                    }}
                  >
                    {b.sufixoPreco}
                  </span>
                )}
              </div>
              <p className="payment">{b.pagamento}</p>
            </div>
          ))}
        </div>

        <div className="invest-total">
          <span className="total-label">{p.investimento.totalLabel}</span>
          <span className="total-price">{p.investimento.totalPreco}</span>
        </div>

        <div className="obs-block">
          <h3>{p.investimento.observacoes.titulo}</h3>
          {p.investimento.observacoes.texto && (
            <p>{p.investimento.observacoes.texto}</p>
          )}
          {p.investimento.observacoes.itens.length > 0 && (
            <ul>
              {p.investimento.observacoes.itens.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Bridge variant="to-light" bridge={p.bridges.proximos} />

      <section id="proximos" className="fade-in inverted">
        <span className="section-label">{p.proximos.sectionLabel}</span>
        <h2>{p.proximos.heading}</h2>
        <div className="steps">
          {p.proximos.steps.map((s, i) => (
            <div className="step" key={i}>
              <span className="step-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="step-title">{s.titulo}</span>
              <span className="step-desc">{s.descricao}</span>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p className="contact-row">
          <a href="mailto:talk@matilha.digital">talk@matilha.digital</a>
        </p>
        <p
          className="contact-row"
          style={{ fontSize: "0.95rem", color: "var(--text-soft)" }}
        >
          +55 41 99737-6060
        </p>
        <p className="meta-footer">
          Brasil · Curitiba, PR — Rua Emiliano Perneta, 680 ·{" "}
          <a
            href="https://matilha.digital/"
            target="_blank"
            rel="noopener noreferrer"
          >
            matilha.digital
          </a>
        </p>
        <p className="meta-footer">
          © 2012–2026 Matilha Estúdio de Design Ltda. · Proposta{" "}
          {p.proposta.numero} ·{" "}
          <span className="client-name">{p.cliente.nome}</span> ·{" "}
          {p.proposta.projeto}
        </p>
      </footer>

      <PropostaScripts />
    </>
  );
}

function Phase({
  phase,
  colsCount,
}: {
  phase: Proposta["cronograma"]["phases"][number];
  colsCount: number;
}) {
  return (
    <>
      <tr className="phase-row">
        <td colSpan={colsCount + 1}>{phase.nome}</td>
      </tr>
      {phase.rows.map((row, ri) => (
        <tr key={ri}>
          <td>{row.label}</td>
          {Array.from({ length: colsCount }).map((_, ci) => (
            <td key={ci}>
              {row.star === ci ? (
                <span className="crono-star">★</span>
              ) : row.marks[ci] ? (
                "●"
              ) : (
                ""
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
