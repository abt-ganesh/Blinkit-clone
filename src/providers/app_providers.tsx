"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

import QueryProvider from "@/providers/query_provider";
import { store } from "@/store";

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
