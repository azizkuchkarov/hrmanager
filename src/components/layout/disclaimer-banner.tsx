import { Info } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <div className="bg-accent/60 border-b border-blue-200 text-accent-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-2 flex items-start gap-2 text-xs">
        <Info className="size-4 flex-shrink-0 mt-0.5" />
        <p>
          Portaldagi ma&apos;lumotlar yuridik maslahat emas. Muhim qarorlar oldidan amaldagi
          qonun hujjatlarini va yurist maslahatini tekshiring.
        </p>
      </div>
    </div>
  );
}
