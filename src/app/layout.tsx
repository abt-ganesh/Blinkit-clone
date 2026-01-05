import "../styles/root-layout.css";

import CartDrawer from "@/components/cart_drawer";
import Header from "@/components/Header";
import AppProviders from "@/providers/app_providers";

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
