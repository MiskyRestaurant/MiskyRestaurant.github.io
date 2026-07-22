import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
  light?: boolean;
};

/** Encabezado de sección consistente con la identidad de marca. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
  light = false,
}: Props) {
  return (
    <Reveal
      className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}
    >
      <p
        className={`eyebrow mb-3 ${
          light ? "text-misky-yellow" : "text-misky-gold"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-display text-4xl sm:text-5xl font-extrabold leading-tight ${
          light ? "text-misky-cream" : "text-misky-ink"
        }`}
      >
        {title}
      </h2>
      <div
        className={`mt-4 h-1.5 w-20 rounded-full andean-border ${
          center ? "mx-auto" : ""
        }`}
      />
      {description && (
        <p
          className={`mt-5 text-base sm:text-lg leading-relaxed ${
            light ? "text-misky-cream/80" : "text-misky-ink-soft"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
