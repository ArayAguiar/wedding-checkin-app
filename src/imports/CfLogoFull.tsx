// imports/CfLogoFull.tsx
import { cinzel, cinzelDecorative } from "../fonts/fonts"; 

interface CfLogoFullProps {
  className?: string;
}

export default function CfLogoFull({ className = "" }: CfLogoFullProps) {
  return (
    <div className={`text-[#111111] leading-none ${cinzelDecorative.className}`}>
      <p className="whitespace-pre leading-none">
        <span>{`Cindy `}</span>
        <span className={cinzel.className}>{`&`}</span>
        <span>{` Fausto`}</span>
      </p>
    </div>
  );
}
