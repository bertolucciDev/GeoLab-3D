import type { ReactNode } from "react";

interface Props {
  sidebar: ReactNode;

  children: ReactNode;
}

export function MainLayout({
  sidebar,
  children,
}: Props) {
  return (
    <div className="h-screen">
      <div className="grid h-full grid-cols-[250px_1fr]">
        {sidebar}

        <main className="overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}