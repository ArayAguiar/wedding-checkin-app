// src/components/landing/Welcome.tsx
import Link from "next/link"
import { MapPin, Calendar, ArrowRight } from "lucide-react"

export function Welcome() {
  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════
          HERO — Full viewport, centered, no photo
          ═══════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent/5 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Eyebrow — single, restrained */}
          <p className="label mb-8 tracking-[0.2em]">
            18 de Outubro de 2025 &middot; Luanda, Angola
          </p>

          {/* Names — display typography */}
          <h1 className="text-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] mb-8">
            CINDY
            <span className="block font-display text-4xl sm:text-5xl md:text-6xl my-2 text-accent-gold">
              &
            </span>
            FAUSTO
          </h1>

          {/* Divider */}
          <div className="w-16 h-px bg-border mx-auto mb-8" />

          {/* Subtext — concise, ≤20 words */}
          <p className="text-body text-base sm:text-lg max-w-md mx-auto mb-12">
            Com a bênção de Deus e de suas famílias, convidam-no a celebrar este dia único.
          </p>

          {/* Single CTA */}
          <a
            href="#schedule"
            className="btn btn-primary inline-flex items-center gap-2 group"
          >
            Programação
            <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Scroll indicator — subtle, functional */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-8 bg-border animate-pulse" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SCHEDULE — Editorial timeline
          ═══════════════════════════════════════════ */}
      <section id="schedule" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-accent/5">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="mb-16 md:mb-20 text-center">
            <p className="label mb-3">Cronograma</p>
            <h2 className="text-heading text-3xl sm:text-4xl">O Nosso Dia</h2>
          </div>

          {/* Events — vertical timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border" />

            {/* Event 1 */}
            <div className="relative mb-12 md:mb-16">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                {/* Time + dot */}
                <div className="flex items-center gap-4 md:w-1/2 md:justify-end md:pr-8">
                  <div className="w-8 h-8 rounded-full bg-background border-2 border-accent-gold flex items-center justify-center shrink-0 relative z-10">
                    <span className="w-2 h-2 rounded-full bg-accent-gold" />
                  </div>
                  <span className="font-serif text-2xl tracking-wider text-foreground md:text-right">
                    10:30
                  </span>
                </div>

                {/* Content */}
                <div className="md:w-1/2 md:pl-8">
                  <h3 className="font-serif text-lg tracking-wide text-foreground mb-2">
                    Cerimónia Civil
                  </h3>
                  <p className="text-body text-sm mb-3">
                    Celebração oficial do matrimónio perante as leis da República de Angola.
                  </p>
                  <a
                    href="https://www.google.com/maps/place/Sal%C3%A3o+de+Festas+Pingo+Douro/@-8.9802384,13.1939844,17z/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-sans text-xs font-light tracking-wider text-muted-foreground hover:text-accent-gold"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Salão Pingo D'Ouro
                  </a>
                </div>
              </div>
            </div>

            {/* Event 2 */}
            <div className="relative mb-12 md:mb-16">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <div className="flex items-center gap-4 md:w-1/2 md:justify-end md:pr-8">
                  <div className="w-8 h-8 rounded-full bg-background border-2 border-accent-gold flex items-center justify-center shrink-0 relative z-10">
                    <span className="w-2 h-2 rounded-full bg-accent-gold" />
                  </div>
                  <span className="font-serif text-2xl tracking-wider text-foreground md:text-right">
                    16:00
                  </span>
                </div>

                <div className="md:w-1/2 md:pl-8">
                  <h3 className="font-serif text-lg tracking-wide text-foreground mb-2">
                    Cerimónia Religiosa
                  </h3>
                  <p className="text-body text-sm mb-3">
                    A bênção de Deus sobre a nossa união, perante a família e amigos.
                  </p>
                  <a
                    href="https://www.google.com/maps/place/Igreja+Metodista+Unida+John+Wesley/@-8.9408388,13.1987105,21z/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-sans text-xs font-light tracking-wider text-muted-foreground hover:text-accent-gold"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Igreja John Wesley
                  </a>
                </div>
              </div>
            </div>

            {/* Event 3 */}
            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <div className="flex items-center gap-4 md:w-1/2 md:justify-end md:pr-8">
                  <div className="w-8 h-8 rounded-full bg-background border-2 border-accent-gold flex items-center justify-center shrink-0 relative z-10">
                    <span className="w-2 h-2 rounded-full bg-accent-gold" />
                  </div>
                  <span className="font-serif text-2xl tracking-wider text-foreground md:text-right">
                    19:30
                  </span>
                </div>

                <div className="md:w-1/2 md:pl-8">
                  <h3 className="font-serif text-lg tracking-wide text-foreground mb-2">
                    Recepção
                  </h3>
                  <p className="text-body text-sm mb-3">
                    Jantar, dança e celebração com todos os nossos entes queridos.
                  </p>
                  <a
                    href="https://www.google.com/maps/place/Sal%C3%A3o+de+Festas+Pingo+Douro/@-8.9802384,13.1939844,17z/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-sans text-xs font-light tracking-wider text-muted-foreground hover:text-accent-gold"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Salão Pingo D'Ouro
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          GUEST ACCESS — Simple, no cards
          ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="label mb-4">Convidados</p>
          <h2 className="text-heading text-2xl sm:text-3xl mb-6">
            Consulte o Seu Código
          </h2>
          <p className="text-body mb-8 max-w-md mx-auto">
            Introduza o código de acesso do seu convite para consultar os detalhes da sua reserva e gerar o seu código QR.
          </p>
          <Link
            href="/guest"
            className="btn btn-primary inline-flex items-center gap-2 group"
          >
            <Calendar className="w-4 h-4" />
            Consultar Código
            <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER — Minimal, elegant
          ═══════════════════════════════════════════ */}
      <footer className="py-16 md:py-20 px-6 md:px-12 lg:px-20 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-display text-3xl text-foreground/10 mb-6">
            &
          </p>
          <p className="font-serif text-xl tracking-[0.15em] text-foreground">
            CINDY <span className="font-display">&</span> FAUSTO
          </p>
          <p className="label mt-3 mb-8">
            18 de Outubro de 2025
          </p>

          <Link
            href="/staff"
            className="staff-link text-xs"
          >
            Acesso da Equipe
          </Link>
        </div>
      </footer>
    </div>
  )
}