import "./globals.css";
import { ReactNode } from "react";
import ApolloProvider from "@/lib/ApolloProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <img
          src={"pokeball.png"}
          alt={"name"}
          className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 opacity-40 rotate-18 w-120 h-120 object-contain"
        />
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  );
}
