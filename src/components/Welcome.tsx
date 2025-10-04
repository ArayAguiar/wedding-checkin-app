import { cinzel, cinzelDecorative } from "../fonts/fonts";
import imgLogo from "../../public/assets/CF_Logo_convite.svg";
import imgCalendar from "../../public/assets/calendar_icon.png";
import imgChurch from "../../public/assets/church_icon.png";
import imgParty from "../../public/assets/party_icon.png";

function CoupleInitials() {
  return (
    <div className="w-20 sm:w-28 aspect-[101/117] mx-auto">
      <img
        src={imgLogo.src}
        alt="Logo do Casamento"
        className="w-full h-full object-contain"
      />
    </div>
  );
}

function LocationInfo({
  icon,
  title,
  subtitle,
  link,
}: {
  icon: string;
  title: string;
  subtitle: string;
  link?: string;
}) {
  const content = (
    <div className="flex flex-col items-center gap-1 text-center">
      <img src={icon} alt={title} className="w-8 h-8 sm:w-10 sm:h-10" />
      <span className={`${cinzelDecorative.className} text-xs sm:text-sm`}>{title}</span>
      <span className={`${cinzelDecorative.className} text-xs sm:text-sm font-bold`}>
        {subtitle}
      </span>
    </div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
}

function EventInfo({ event, time, location }: { event: string; time: string; location: string }) {
  return (
    <div className="flex flex-col gap-1 text-center">
      <span className={`${cinzel.className} font-bold text-sm sm:text-base`}>
        {event} | {time}
      </span>
      <span className={`${cinzelDecorative.className} text-sm sm:text-base opacity-80`}>
        {location}
      </span>
    </div>
  );
}

export function Welcome() {
  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col items-center gap-6 sm:gap-8">
      {/* Logo */}
      <CoupleInitials />

      {/* Header */}
      <div className="text-center flex flex-col gap-2">
        <h1 className={`${cinzelDecorative.className} text-2xl sm:text-3xl`}>
          o nosso dia
        </h1>
        <h2
          className={`${cinzel.className} text-sm sm:text-base opacity-80 border-b border-gray-300 pb-1`}
        >
          Cronograma do Dia
        </h2>
      </div>

      {/* Date & Calendar */}
      <div className="flex flex-col items-center gap-2 text-center">
        <p className={`${cinzel.className} font-bold text-base sm:text-lg`}>
          18 de Outubro de 2025
        </p>
        <div className="flex items-center gap-2">
          <a href={imgCalendar.src} target="_blank">
            <img
              src={imgCalendar.src}
              alt="Salvar no Calendário"
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
          </a>
          <a
            href="https://casamento-cindy-fausto.netlify.app/casamento_cindy_fausto.ics"
            download
            className={`${cinzel.className} text-[10px] sm:text-xs border border-gray-300 px-2 py-1 rounded`}
          >
            Salvar no Calendário (Offline)
          </a>
        </div>
      </div>

      {/* Info Wrapper */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 w-full justify-center items-center">
        {/* Locations */}
        <div className="flex flex-col gap-4 max-w-[280px] w-full md:border-r md:pr-4 items-center md:items-start">
          <p className={`${cinzel.className} text-xs md:text-sm opacity-70 text-center md:text-left`}>
            Clique em cada ícone para saber a localização
          </p>
          <LocationInfo
            icon={imgChurch.src}
            title="Igreja Metodista Unida"
            subtitle="John Wesley"
            link="https://www.google.com/maps/place/Igreja+Metodista+Unida+John+Wesley/@-8.9408388,13.1987105,21z/"
          />
          <LocationInfo
            icon={imgParty.src}
            title="Salão de Festas"
            subtitle="Pingo D’Ouro"
            link="https://www.google.com/maps/place/Sal%C3%A3o+de+Festas+Pingo+Douro/@-8.9802384,13.1939844,17z/"
          />
        </div>

        {/* Schedule */}
        <div className="flex flex-col gap-4 md:gap-6 max-w-[280px] w-full items-center">
          <EventInfo event="Cerimónia Civil" time="10:30" location="Salão de Festas Pingo D’Ouro" />
          <EventInfo event="Religioso" time="16:00" location="Igreja Metodista Unida - John Wesley" />
          <EventInfo event="Recepção" time="19:30" location="Salão de Festas Pingo D’Ouro" />
        </div>
      </div>

      {/* Footer */}
      <div className={`${cinzel.className} text-center mt-4 text-xs sm:text-sm opacity-80`}>
        Agradecemos a sua presença neste dia tão especial!
      </div>
    </div>
  );
}
