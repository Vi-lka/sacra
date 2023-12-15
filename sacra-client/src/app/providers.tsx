'use client'

import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </ReactQueryProvider>
  )
}