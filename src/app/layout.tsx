import "./globals.css";
import { ReactNode } from "react";
import ApolloProvider from "@/lib/ApolloProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  );
}
