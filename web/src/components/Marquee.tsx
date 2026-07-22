// Platos reales de la carta (nombres propios: se mantienen en español en ES y EN).
const WORDS = [
  "Pollo a la Brasa",
  "Ceviche",
  "Lomo Saltado",
  "Ají de Gallina",
  "Tallarines a la Huancaína",
  "Causa Limeña",
  "Chicha Morada",
  "Mostrito",
  "Carapulcra",
  "Inca Kola",
];

export default function Marquee() {
  return (
    <div className="bg-misky-red py-4 overflow-hidden">
      <div className="flex w-max animate-[marquee_28s_linear_infinite]">
        {[0, 1].map((dup) => (
          <ul
            key={dup}
            aria-hidden={dup === 1}
            className="flex items-center gap-8 pr-8"
          >
            {WORDS.map((w) => (
              <li
                key={w}
                className="flex items-center gap-8 font-display text-xl font-bold text-misky-cream whitespace-nowrap"
              >
                {w}
                <span className="text-misky-yellow text-2xl">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
