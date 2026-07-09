import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"

// Custom SVG botanical — sage green, minimal, matches design system
function BotanicalAccent({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M100 180C100 180 100 140 100 120C100 100 80 80 60 70C40 60 30 50 30 50"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M100 120C100 120 120 100 140 90C160 80 170 70 170 70"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M100 140C100 140 85 125 75 115C65 105 60 95 60 95"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M100 100C100 100 115 85 125 75C135 65 145 60 145 60"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Leaves */}
      <ellipse cx="55" cy="65" rx="8" ry="4" transform="rotate(-30 55 65)" fill="currentColor" opacity="0.3" />
      <ellipse cx="145" cy="85" rx="8" ry="4" transform="rotate(30 145 85)" fill="currentColor" opacity="0.3" />
      <ellipse cx="70" cy="110" rx="6" ry="3" transform="rotate(-20 70 110)" fill="currentColor" opacity="0.25" />
      <ellipse cx="130" cy="70" rx="6" ry="3" transform="rotate(20 130 70)" fill="currentColor" opacity="0.25" />
    </svg>
  )
}

export function Welcome() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Subtle botanical accent — top right, low opacity */}
      <BotanicalAccent className="absolute -top-10 -right-10 w-48 h-48 sm:w-64 sm:h-64 text-accent/10 pointer-events-none" />
      
      {/* Subtle botanical accent — bottom left, low opacity */}
      <BotanicalAccent className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-48 sm:h-48 text-accent/10 pointer-events-none rotate-180" />

      {/* ═══════════════════════════════════════════
          HERO — Names, date, invitation
          ═══════════════════════════════════════════ */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-16 sm:py-20 text-center relative">
        {/* Date — label style */}
        <p className="label mb-6 sm:mb-8">
          18 de Outubro de 2025 · Luanda, Angola
        </p>

        {/* Names — font-serif (Cinzel), ampersand — font-display (Cinzel Decorative) */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.08em] text-foreground leading-[0.9]">
          CINDY
          <span className="block font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl my-2 sm:my-3 text-accent">
            &
          </span>
          FAUSTO
        </h1>

        {/* Divider */}
        <div className="w-12 h-px bg-border mx-auto my-8 sm:my-10" />

        {/* Invitation */}
        <p className="text-body max-w-sm mx-auto mb-10 sm:mb-12 text-sm sm:text-base">
          Com a bênção de Deus e das nossas famílias, convidamo-lo a celebrar connosco.
        </p>

        {/* CTA */}
        <Link
          href="#schedule"
          className="inline-flex items-center gap-2 h-11 sm:h-12 px-6 sm:px-8 rounded-full bg-foreground text-background font-serif text-[0.625rem] sm:text-[0.6875rem] tracking-[0.15em] uppercase hover:bg-foreground/90 transition-colors duration-150"
        >
          Programação
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* ═══════════════════════════════════════════
          STORY — One paragraph, human
          ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 md:py-24 px-6 bg-secondary/30 relative">
        <div className="max-w-xl mx-auto text-center px-2 sm:px-0">
          <p className="label mb-6 sm:mb-8">A Nossa História</p>
          <p className="font-serif text-base sm:text-lg md:text-xl text-foreground leading-relaxed tracking-wide">
            Conhecemo-nos em Luanda, numa tarde de chuva que nenhum de nós esperava. 
            Desde então, cada dia tem sido uma aventura que queremos continuar a partilhar. 
            Agora, queremos que seja testemunha do nosso próximo capítulo.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SCHEDULE — Simple list
          ═══════════════════════════════════════════ */}
      <section id="schedule" className="py-16 sm:py-20 md:py-24 px-6 relative">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <p className="label mb-3">Cronograma</p>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.08em] text-foreground uppercase">
              O Nosso Dia
            </h2>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {/* Event 1 */}
            <div className="flex gap-3 sm:gap-4 items-start">
              <span className="font-serif text-lg sm:text-xl tracking-wider text-foreground w-14 sm:w-16 shrink-0 text-right">
                10:30
              </span>
              <div className="h-px w-4 sm:w-6 bg-border mt-2.5 sm:mt-3 shrink-0" />
              <div className="min-w-0">
                <h3 className="font-serif text-sm sm:text-base tracking-wide text-foreground mb-1">
                  Cerimónia Civil
                </h3>
                <p className="text-body text-xs sm:text-sm mb-2">
                  Celebração oficial do matrimónio perante as leis da República de Angola.
                </p>
                <a
                  href="https://www.google.com/maps/place/Sal%C3%A3o+de+Festas+Pingo+Douro/@-8.9802384,13.1939844,17z/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 label text-muted-foreground hover:text-accent transition-colors duration-150"
                >
                  <MapPin className="w-3 h-3" />
                  Salão Pingo D\'Ouro
                </a>
              </div>
            </div>

            {/* Event 2 */}
            <div className="flex gap-3 sm:gap-4 items-start">
              <span className="font-serif text-lg sm:text-xl tracking-wider text-foreground w-14 sm:w-16 shrink-0 text-right">
                16:00
              </span>
              <div className="h-px w-4 sm:w-6 bg-border mt-2.5 sm:mt-3 shrink-0" />
              <div className="min-w-0">
                <h3 className="font-serif text-sm sm:text-base tracking-wide text-foreground mb-1">
                  Cerimónia Religiosa
                </h3>
                <p className="text-body text-xs sm:text-sm mb-2">
                  A bênção de Deus sobre a nossa união, perante a família e amigos.
                </p>
                <a
                  href="https://www.google.com/maps/place/Igreja+Metodista+Unida+John+Wesley/@-8.9408388,13.1987105,21z/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 label text-muted-foreground hover:text-accent transition-colors duration-150"
                >
                  <MapPin className="w-3 h-3" />
                  Igreja John Wesley
                </a>
              </div>
            </div>

            {/* Event 3 */}
            <div className="flex gap-3 sm:gap-4 items-start">
              <span className="font-serif text-lg sm:text-xl tracking-wider text-foreground w-14 sm:w-16 shrink-0 text-right">
                19:30
              </span>
              <div className="h-px w-4 sm:w-6 bg-border mt-2.5 sm:mt-3 shrink-0" />
              <div className="min-w-0">
                <h3 className="font-serif text-sm sm:text-base tracking-wide text-foreground mb-1">
                  Recepção
                </h3>
                <p className="text-body text-xs sm:text-sm mb-2">
                  Jantar, dança e celebração com todos os nossos entes queridos.
                </p>
                <a
                  href="https://www.google.com/maps/place/Sal%C3%A3o+de+Festas+Pingo+Douro/@-8.9802384,13.1939844,17z/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 label text-muted-foreground hover:text-accent transition-colors duration-150"
                >
                  <MapPin className="w-3 h-3" />
                  Salão Pingo D\'Ouro
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          RSVP — Direct
          ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 md:py-24 px-6 bg-secondary/30">
        <div className="max-w-xl mx-auto text-center px-2 sm:px-0">
          <p className="label mb-4">Convidados</p>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.08em] text-foreground uppercase mb-6">
            Consulte o Seu Convite
          </h2>
          <p className="text-body max-w-md mx-auto mb-8 text-sm sm:text-base">
            Introduza o código de acesso do seu convite para consultar os detalhes da sua reserva e gerar o seu código QR.
          </p>
          <Link
            href="/guest"
            className="inline-flex items-center gap-2 h-11 sm:h-12 px-6 sm:px-8 rounded-full bg-foreground text-background font-serif text-[0.625rem] sm:text-[0.6875rem] tracking-[0.15em] uppercase hover:bg-foreground/90 transition-colors duration-150"
          >
            Consultar Código
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER — Minimal
          ═══════════════════════════════════════════ */}
      <footer className="py-12 sm:py-16 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-serif text-lg sm:text-xl tracking-[0.15em] text-foreground">
            CINDY <span className="font-display text-accent">&</span> FAUSTO
          </p>
          <p className="label mt-3 mb-6 sm:mb-8">
            18 de Outubro de 2025
          </p>

          <Link
            href="/staff"
            className="staff-link"
          >
            Acesso da Equipe
          </Link>
        </div>
      </footer>
    </div>
  )
}