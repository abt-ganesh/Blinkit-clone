// biome-ignore assist/source/organizeImports: <explanation>
import "../styles/root-layout.css";

import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import AppProviders from "@/providers/AppProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AppProviders>
          <Header />
          <CartDrawer />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
