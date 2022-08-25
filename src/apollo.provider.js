import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: "https://api-eu-central-1.graphcms.com/v2/cl1ujnwlbb6e001xj9oog3qbe/master",
});

export const provider = createApolloProvider({
  defaultClient: client,
});
