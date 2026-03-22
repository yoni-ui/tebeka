import { ProductShell } from "@/modules/app/ProductShell";

export default function AppSectionLayout({ children }: { children: React.ReactNode }) {
  return <ProductShell>{children}</ProductShell>;
}
