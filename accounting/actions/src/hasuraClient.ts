const ApolloClient = require("apollo-client").ApolloClient;
const fetch = require("node-fetch");
const createHttpLink = require("apollo-link-http").createHttpLink;
const InMemoryCache = require("apollo-cache-inmemory").InMemoryCache;
import {config} from "./config";

const httpLink = createHttpLink({
    uri: config.hasuraUrl,
    fetch: fetch
});

export const hasuraClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});
