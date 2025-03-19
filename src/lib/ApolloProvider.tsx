"use client";

import { ReactNode } from "react";
import { ApolloProvider as Provider } from "@apollo/client";
import client from "../../lib/apolloClient";

export default function ApolloProvider({ children }: { children: ReactNode }) {
  return <Provider client={client}>{children}</Provider>;
}
