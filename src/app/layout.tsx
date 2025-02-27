"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import {
  matchQuery,
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          staleTime: 2 * 1000 * 60,
        },
      },
      mutationCache: new MutationCache({
        onSuccess: (_data, _variables, _context, mutation) => {
          queryClient.refetchQueries({
            predicate: (query) =>
              mutation.meta?.refetches?.some((queryKey) =>
                matchQuery({ queryKey }, query)
              ) ?? false,
          });
        },
      }),
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="pt-BR">
        <body className={inter.className}>
          <SidebarProvider>
            <AppSidebar />
            <main>{children}</main>
            <Toaster position="top-center" />
          </SidebarProvider>
        </body>
      </html>
    </QueryClientProvider>
  );
}
