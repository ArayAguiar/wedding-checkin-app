// src/components/landing/Welcome.tsx
import Link from "next/link"
import { MapPin, Calendar } from "lucide-react"

export function Welcome() {
  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════
          HERO — Editorial, asymmetric
          ═══════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto w-full">
          {/* Top label */}
          <div className="mb-16 md:mb-20">
            <p className="label">
              18 de Outubro de 2025 &middot; Luanda, Angola
            </p>
          </div>

          {/* Display names */}
          <div>
            <h1 className="text-display">
              CINDY <span className="font-display">&</span> FAUSTO
            </h1>
          </div>

          {/* Divider line */}
          <div className="mt-10 mb-10 h-px bg-border origin-left max-w-md" />

          {/* Bottom row: date + description + CTAs */}
          <div className="grid md:grid-cols-12 gap-8 items-end">
            {/* Date */}
            <div className="md:col-span-4">
              <p className="font-serif text-lg tracking-wider text-foreground">
                18 de Outubro de 2025
              </p>
              <p className="label mt-1">Luanda, Angola</p>
            </div>

            {/* Description */}
            <div className="md:col-span-5">
              <p className="text-body max-w-sm">
                Com a bênção de Deus e seus pais, convidam-no a celebrar este dia único.
              </p>
            </div>

            {/* CTAs */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <Link
                href="/guest"
                className="btn btn-primary inline-flex items-center justify-center gap-2"
              >
                Ver a Minha Mesa
                <span>→</span>
              </Link>
              <a
                href="#schedule"
                className="btn btn-outline inline-flex items-center justify-center"
              >
                Programação
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SCHEDULE — Editorial timeline
          ═══════════════════════════════════════════ */}
      <section id="schedule" className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="mb-16 md:mb-20">
            <p className="label mb-3">Cronograma</p>
            <h2 className="text-heading">O Nosso Dia</h2>
          </div>

          {/* Events */}
          <div className="space-y-0">
            {/* Event 1 */}
            <div className="grid md:grid-cols-12 gap-4 md:gap-6 py-8 border-b border-border">
              <div className="md:col-span-2">
                <span className="font-serif text-2xl tracking-wider text-foreground">10:30</span>
              </div>
              <div className="md:col-span-6">
                <h3 className="font-serif text-base tracking-wide text-foreground mb-1">
                  Cerimónia Civil
                </h3>
                <p className="text-body text-sm">
                  Celebração oficial do matrimónio perante as leis da República de Angola.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <a
                  href="https://www.google.com/maps/place/Sal%C3%A3o+de+Festas+Pingo+Douro/@-8.9802384,13.1939844,17z/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-sans text-xs font-light tracking-wider text-muted-foreground hover:text-accent transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Salão Pingo D'Ouro
                </a>
              </div>
            </div>

            {/* Event 2 */}
            <div className="grid md:grid-cols-12 gap-4 md:gap-6 py-8 border-b border-border">
              <div className="md:col-span-2">
                <span className="font-serif text-2xl tracking-wider text-foreground">16:00</span>
              </div>
              <div className="md:col-span-6">
                <h3 className="font-serif text-base tracking-wide text-foreground mb-1">
                  Cerimónia Religiosa
                </h3>
                <p className="text-body text-sm">
                  A bênção de Deus sobre a nossa união, perante a família e amigos.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <a
                  href="https://www.google.com/maps/place/Igreja+Metodista+Unida+John+Wesley/@-8.9408388,13.1987105,21z/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-sans text-xs font-light tracking-wider text-muted-foreground hover:text-accent transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Igreja John Wesley
                </a>
              </div>
            </div>

            {/* Event 3 */}
            <div className="grid md:grid-cols-12 gap-4 md:gap-6 py-8 border-b border-border">
              <div className="md:col-span-2">
                <span className="font-serif text-2xl tracking-wider text-foreground">19:30</span>
              </div>
              <div className="md:col-span-6">
                <h3 className="font-serif text-base tracking-wide text-foreground mb-1">
                  Recepção
                </h3>
                <p className="text-body text-sm">
                  Jantar, dança e celebração com todos os nossos entes queridos.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <a
                  href="https://www.google.com/maps/place/Sal%C3%A3o+de+Festas+Pingo+Douro/@-8.9802384,13.1939844,17z/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-sans text-xs font-light tracking-wider text-muted-foreground hover:text-accent transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Salão Pingo D'Ouro
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          GUEST CTA — Info card style
          ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Info card 1 */}
            <div className="info-card">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-sm tracking-wide text-foreground mb-1">
                    Ver a Minha Mesa
                  </h3>
                  <p className="text-body text-sm">
                    Introduza o código de acesso do seu convite para consultar a mesa atribuída.
                  </p>
                  <Link
                    href="/guest"
                    className="mt-4 btn btn-sm btn-primary inline-flex"
                  >
                    Consultar
                  </Link>
                </div>
              </div>
            </div>

            {/* Info card 2 */}
            <div className="info-card">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-sm tracking-wide text-foreground mb-1">
                    Como Chegar
                  </h3>
                  <p className="text-body text-sm">
                    Consulte a localização do salão de festas e da igreja no Google Maps.
                  </p>
                  <a
                    href="https://www.google.com/maps/place/Sal%C3%A3o+de+Festas+Pingo+Douro/@-8.9802384,13.1939844,17z/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 btn btn-sm btn-outline inline-flex"
                  >
                    Ver Mapa
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER — Signature style
          ═══════════════════════════════════════════ */}
      <footer className="py-16 md:py-20 px-6 md:px-12 lg:px-20 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-display text-2xl text-foreground/20 mb-6">
            &
          </p>
          <p className="font-serif text-lg tracking-[0.15em] text-foreground">
            CINDY <span className="font-display">&</span> FAUSTO
          </p>
          <p className="label mt-3">
            18 de Outubro de 2025
          </p>
          <div className="mt-8">
            <Link
              href="/staff"
              className="staff-link"
            >
              Acesso da Equipe
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}