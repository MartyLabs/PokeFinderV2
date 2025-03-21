import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

export const withApolloProvider = (client: ApolloClient<InMemoryCache>) => {
  return (Story: () => ReactNode) => (
    <ApolloProvider client={client}>
      <Story />
    </ApolloProvider>
  );
};
