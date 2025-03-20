"use client";

import { ReactNode } from "react";
import Image from "next/image";
import "./globals.css";
import ApolloProvider from "@/lib/ApolloProvider";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Pokémon App - Explore and search for Pokémon easily!"
        />
        <title>PokeFinder</title>
      </head>
      <body className="relative min-h-screen bg-[#f7f8fc]">
        <Image
          src="/pokeball.png"
          alt="Pokeball background"
          width={480}
          height={480}
          className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 opacity-40 rotate-18"
          priority
        />

        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  );
}
