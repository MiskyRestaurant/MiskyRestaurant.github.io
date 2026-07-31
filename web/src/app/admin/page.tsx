import { redirect } from "next/navigation";

/**
 * El panel solo gestiona la carta, así que /admin no tiene contenido propio:
 * redirige a /admin/menu (es también donde aterriza el login).
 */
export default function AdminIndex() {
  redirect("/admin/menu");
}
