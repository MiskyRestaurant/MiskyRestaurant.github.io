import type { MouseEvent } from "react";

/**
 * Navegación entre secciones de la misma página.
 *
 * Los enlaces de la barra y del pie son anclas (`#carta`, `#galeria`…). Si se
 * dejan al navegador, hay un caso que falla: cuando la URL ya termina en esa
 * misma ancla, un segundo clic no hace nada. Ocurre a menudo — pulsas «Carta»,
 * subes con la rueda y vuelves a pulsar «Carta» — y da la sensación de que el
 * botón está roto.
 *
 * Aquí hacemos el desplazamiento a mano, así que siempre baja, se pulse las
 * veces que se pulse.
 *
 * Detalles que se conservan:
 * - `scrollIntoView` respeta `scroll-padding-top` (globals.css), que reserva
 *   los 5rem de la barra fija para que no tape el título de la sección.
 * - Si el sistema pide movimiento reducido, se salta la animación.
 * - Ctrl/Cmd/clic central siguen abriendo en otra pestaña: no interceptamos.
 */
export function irASeccion(e: MouseEvent<HTMLAnchorElement>, href: string) {
  // Clic con modificador o que no sea el botón principal: que actúe el navegador.
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

  const destino = document.getElementById(href.slice(1));
  if (!destino) return; // Ancla inexistente: mejor el comportamiento por defecto.

  e.preventDefault();

  const movimientoReducido = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  destino.scrollIntoView({
    behavior: movimientoReducido ? "auto" : "smooth",
    block: "start",
  });

  // Refleja la sección en la URL sin llenar el historial de entradas, para que
  // el botón «atrás» salga de la web en vez de recorrer todas las anclas.
  history.replaceState(null, "", href);
}
