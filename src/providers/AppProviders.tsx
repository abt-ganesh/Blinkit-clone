"use client";

// biome-ignore assist/source/organizeImports: <explanation>
import { Provider } from "react-redux";
import { store } from "@/store";
import QueryProvider from "@/providers/QueryProvider";
import { SessionProvider } from "next-auth/react";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <QueryProvider>{children}</QueryProvider>
      </Provider>
    </SessionProvider>
  );
}
