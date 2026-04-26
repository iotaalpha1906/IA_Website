/**
 * Placeholder crest — replace the SVG with your chapter seal/crest asset
 * (`<Image src="/branding/crest.png" ... />` or inline SVG export).
 */
import Image from "next/image";

export function CrestMark({ className }: { className?: string }) {
  return (
    <div className={className} role="img" aria-label="Chapter crest">
      <Image
        src="/branding/APhiA_Crest.png"
        alt="Alpha Phi Alpha crest"
        width={256}
        height={256}
        className="h-full w-full object-contain"
        priority
      />
    </div>
  );
}
