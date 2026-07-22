"use client";

import { LanguageProvider } from "@/lib/i18n";

/** Envoltura de proveedores de cliente para toda la app pública. */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
