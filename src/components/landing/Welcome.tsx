// src\components\landing\Welcome.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";

const WEDDING_DATE = "2025-10-18T10:30:00";

interface WelcomeProps {
  onNavigate?: (view: "guest-lookup" | "staff-login") => void;
}

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false,
  });

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        isExpired: false,
      });
    };
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function Welcome({ onNavigate }: WelcomeProps) {
  const { days, hours, minutes, isExpired } = useCountdown(WEDDING_DATE);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════
          HERO — Editorial, asymmetric
          ═══════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto w-full">
          {/* Top label */}
          <motion.div
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-16 md:mb-20"
          >
            <p className="label">
              18 de Outubro de 2025 &middot; Luanda, Angola
            </p>
          </motion.div>

          {/* Display names */}
          <motion.div
            custom={0.4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <h1 className="text-display">
              CINDY <span className="font-display">&</span> FAUSTO
            </h1>
          </motion.div>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-10 mb-10 h-px bg-border origin-left max-w-md"
          />

          {/* Bottom row: countdown + description + CTAs */}
          <div className="grid md:grid-cols-12 gap-8 items-end">
            {/* Countdown */}
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="md:col-span-4"
            >
              {isExpired ? (
                <p className="font-serif text-lg tracking-wider text-foreground">
                  É hoje
                </p>
              ) : (
                <div className="flex gap-6">
                  <div>
                    <span className="font-serif text-3xl md:text-4xl tracking-wider text-foreground">
                      {String(days).padStart(2, "0")}
                    </span>
                    <p className="label mt-1">Dias</p>
                  </div>
                  <div>
                    <span className="font-serif text-3xl md:text-4xl tracking-wider text-foreground">
                      {String(hours).padStart(2, "0")}
                    </span>
                    <p className="label mt-1">Horas</p>
                  </div>
                  <div>
                    <span className="font-serif text-3xl md:text-4xl tracking-wider text-foreground">
                      {String(minutes).padStart(2, "0")}
                    </span>
                    <p className="label mt-1">Min</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Description */}
            <motion.div
              custom={1.2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="md:col-span-5"
            >
              <p className="text-body max-w-sm">
                Com a bênção de Deus e seus pais, convidam-no a celebrar este dia único.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              custom={1.4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="md:col-span-3 flex flex-col gap-3"
            >
              <button
                onClick={() => onNavigate?.("guest-lookup")}
                className="btn btn-primary"
              >
                Ver a Minha Mesa
                <span>→</span>
              </button>
              <button
                onClick={() => scrollTo("schedule")}
                className="btn btn-outline"
              >
                Programação
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SCHEDULE — Editorial timeline
          ═══════════════════════════════════════════ */}
      <section id="schedule" className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-16 md:mb-20"
          >
            <p className="label mb-3">Cronograma</p>
            <h2 className="text-heading">O Nosso Dia</h2>
          </motion.div>

          {/* Events */}
          <div className="space-y-0">
            {/* Event 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid md:grid-cols-12 gap-4 md:gap-6 py-8 border-b border-border"
            >
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
            </motion.div>

            {/* Event 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid md:grid-cols-12 gap-4 md:gap-6 py-8 border-b border-border"
            >
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
            </motion.div>

            {/* Event 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid md:grid-cols-12 gap-4 md:gap-6 py-8 border-b border-border"
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          GUEST CTA — Info card style
          ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid md:grid-cols-2 gap-8"
          >
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
                  <button
                    onClick={() => onNavigate?.("guest-lookup")}
                    className="mt-4 btn btn-sm btn-primary"
                  >
                    Consultar
                  </button>
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
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER — Signature style
          ═══════════════════════════════════════════ */}
      <footer className="py-16 md:py-20 px-6 md:px-12 lg:px-20 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
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
              <button
                onClick={() => onNavigate?.("staff-login")}
                className="staff-link"
              >
                Acesso da Equipe
              </button>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}