import type { ReactNode } from "react";
interface Props { sidebar: ReactNode; children: ReactNode; }
export function MainLayout({ sidebar, children }: Props) {
  return <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[320px_1fr] lg:px-6">{sidebar}<main className="min-w-0 space-y-6">{children}</main></div>;
}
