import { MarketingFooter } from "@/modules/marketing/MarketingFooter";
import { MarketingNav } from "@/modules/marketing/MarketingNav";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingNav />
      {children}
      <MarketingFooter />
    </div>
  );
}
