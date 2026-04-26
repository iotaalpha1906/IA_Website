"use client";

import { InquiryModalProvider } from "@/components/InquiryModal";

export function Providers({ children }: { children: React.ReactNode }) {
  return <InquiryModalProvider>{children}</InquiryModalProvider>;
}
